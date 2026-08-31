/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";

import { useGetServiceByIdQuery } from "@/redux/api/serviceApi";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useGetTechnicianAvailabilityQuery } from "@/redux/api/availabilityApi";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";


interface BookingFormData {
  date: string;
  availabilityId: string;
  address: string;
  notes: string;
}

interface Availability {
  id: string;
  technicianId: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const SERVICE_IMAGE =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=900&auto=format&fit=crop";

const TECHNICIAN_IMAGE =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop";

// Get YYYY-MM-DD from an ISO date
const getDateFromISO = (dateString: string) => {
  return dateString.split("T")[0];
};

// Format date for displaying in the dropdown
const formatDate = (date: string) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format time without timezone conversion
const formatTime = (dateString: string) => {
  const time = dateString.split("T")[1]?.substring(0, 5);

  if (!time) return "";

  const [hoursString, minutes] = time.split(":");

  let hours = Number(hoursString);

  const modifier = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours || 12;

  return `${String(hours).padStart(2, "0")}:${minutes} ${modifier}`;
};

const BookingPage = () => {
  const searchParams = useSearchParams();

  const serviceId = searchParams.get("serviceId");

  // ============================================================
  // GET SERVICE
  // ============================================================

  const {
    data: serviceResponse,
    isLoading: isServiceLoading,
    isError: isServiceError,
  } = useGetServiceByIdQuery(serviceId!, {
    skip: !serviceId,
  });

  const service = serviceResponse?.data;

  // Technician ID comes from the service
  const technicianId = service?.technicianId || service?.technician?.id;

  // ============================================================
  // GET TECHNICIAN AVAILABILITY
  // ============================================================

  const {
    data: availabilityResponse,
    isLoading: isAvailabilityLoading,
    isError: isAvailabilityError,
  } = useGetTechnicianAvailabilityQuery(
    {
      id: technicianId!,
    },
    {
      skip: !technicianId,
    }
  );

  const availabilityData: Availability[] =
    availabilityResponse?.data || [];

  // Only show slots that haven't been booked
  const availableSlots = availabilityData.filter(
    (slot) => !slot.isBooked
  );

  // ============================================================
  // CREATE BOOKING
  // ============================================================

  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();

  // ============================================================
  // CREATE PAYMENT SESSION
  // ============================================================

  const [
    createPaymentSession,
    { isLoading: isPaymentLoading },
  ] = useCreatePaymentMutation();

  // ============================================================
  // FORM
  // ============================================================

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      date: "",
      availabilityId: "",
      address: "",
      notes: "",
    },
  });

  const selectedDate = watch("date");
  const selectedAvailabilityId = watch("availabilityId");

  // ============================================================
  // AVAILABLE DATES
  // ============================================================

  const availableDates = Array.from(
    new Set(
      availableSlots.map((slot) =>
        getDateFromISO(slot.startTime)
      )
    )
  ).sort();

  // ============================================================
  // AVAILABLE TIMES FOR SELECTED DATE
  // ============================================================

  const availableTimeSlots = selectedDate
    ? availableSlots.filter(
        (slot) =>
          getDateFromISO(slot.startTime) === selectedDate
      )
    : [];

  // Find selected availability object
  const selectedSlot = availableSlots.find(
    (slot) => slot.id === selectedAvailabilityId
  );

  // ============================================================
  // SUBMIT BOOKING + STRIPE PAYMENT
  // ============================================================

  const onSubmit = async (data: BookingFormData) => {
    if (!service) return;

    if (!technicianId) {
      toast.error("Technician information is not available.");
      return;
    }

    const selectedAvailability = availableSlots.find(
      (slot) => slot.id === data.availabilityId
    );

    if (!selectedAvailability) {
      toast.error("Please select an available time slot.");
      return;
    }

    try {
      // ========================================================
      // STEP 1: CREATE BOOKING
      // ========================================================

      const bookingPayload = {
        technicianId,
        serviceId: service.id,
        availabilityId: selectedAvailability.id,
        scheduledAt: selectedAvailability.startTime,
        customerNote: data.notes || "",
      };

      console.log("Creating booking:", bookingPayload);

      const bookingResponse = await createBooking(
        bookingPayload
      ).unwrap();

      console.log("Booking created:", bookingResponse);

      // Get booking ID
      const bookingId = bookingResponse?.data?.id;

      if (!bookingId) {
        toast.error(
          "Booking was created but booking ID was not found."
        );
        return;
      }

      // ========================================================
      // STEP 2: CREATE STRIPE PAYMENT SESSION
      // ========================================================

      toast.success(
        "Booking created! Redirecting to secure payment..."
      );

      console.log(
        "Creating payment session for booking:",
        bookingId
      );

      const paymentResponse = await createPaymentSession({
        bookingId,
      }).unwrap();

      console.log(
        "Payment session created:",
        paymentResponse
      );

      // ========================================================
      // STEP 3: GET STRIPE CHECKOUT URL
      // ========================================================

      const checkoutUrl =
        paymentResponse?.data?.checkoutUrl;

      if (!checkoutUrl) {
        toast.error(
          "Payment checkout URL was not returned."
        );
        return;
      }

      // ========================================================
      // STEP 4: REDIRECT DIRECTLY TO STRIPE
      // ========================================================

      window.location.href = checkoutUrl;
    } catch (error: any) {
      console.error(
        "Booking/payment failed:",
        error
      );

      const errorMessage =
        error?.data?.message ||
        error?.error?.data?.message ||
        error?.message ||
        "Something went wrong while creating your booking.";

      toast.error(errorMessage);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (isServiceLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#EC620B]" />

          <p className="mt-4 text-sm text-slate-500">
            Loading service...
          </p>
        </div>
      </main>
    );
  }

  // ============================================================
  // NO SERVICE ID
  // ============================================================

  if (!serviceId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#00224A]">
            Service not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            No service ID was provided.
          </p>

          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#EC620B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d95608]"
          >
            <ArrowLeft size={17} />
            Back to Services
          </Link>
        </div>
      </main>
    );
  }

  // ============================================================
  // SERVICE ERROR
  // ============================================================

  if (isServiceError || !service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#00224A]">
            Service not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            We could not find the requested service.
          </p>

          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#EC620B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d95608]"
          >
            <ArrowLeft size={17} />
            Back to Services
          </Link>
        </div>
      </main>
    );
  }

  // ============================================================
  // SERVICE DATA
  // ============================================================

  const serviceName = service.name;

  const categoryName =
    service.category?.name || "Service";

  const servicePrice = Number(service.price);

  const serviceLocation =
    service.location || "Dhaka";

  const technicianName =
    service.technician?.user?.name ||
    "Professional Technician";

  const technicianImage =
    service.technician?.user?.image ||
    TECHNICIAN_IMAGE;

  const technicianExperience =
    service.technician?.experience
      ? `${service.technician.experience}+ years experience`
      : "Experienced professional";

  const technicianRating =
    Number(service.technician?.averageRating) || 0;

  const totalReviews =
    service.technician?.totalReviews || 0;

  const technicianLocation =
    service.technician?.location ||
    serviceLocation;

  // ============================================================
  // UI
  // ============================================================

  return (
    <main className="min-h-screen bg-gray-100 py-16">
      <section className="px-4 py-10 sm:py-12 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">

          {/* BACK */}

          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#EC620B]"
          >
            <ArrowLeft size={17} />
            Back to Services
          </Link>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">

            {/* =====================================================
                BOOKING FORM
            ====================================================== */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
            >

              <div className="border-b border-slate-100 pb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-[#00224A] sm:text-3xl">
                  Schedule Your Service
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Select an available date and time provided by the
                  technician.
                </p>
              </div>

              {/* =====================================================
                  DATE & TIME
              ====================================================== */}

              <div className="border-b border-slate-100 py-6">
                <h2 className="mb-5 text-lg font-semibold text-[#00224A]">
                  Date & Time
                </h2>

                {isAvailabilityLoading && (
                  <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#EC620B]" />
                    Loading available dates...
                  </div>
                )}

                {isAvailabilityError && (
                  <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    Unable to load technician availability.
                    Please try again.
                  </div>
                )}

                {!isAvailabilityLoading &&
                  !isAvailabilityError &&
                  availableDates.length === 0 && (
                    <div className="mb-5 rounded-lg bg-orange-50 p-4 text-sm text-orange-700">
                      This technician currently has no
                      available time slots.
                    </div>
                  )}

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* DATE */}

                  <div>
                    <label
                      htmlFor="date"
                      className="mb-2 block text-sm font-medium text-[#00224A]"
                    >
                      Available Date
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        id="date"
                        {...register("date", {
                          required:
                            "Please select an available date",

                          onChange: () => {
                            setValue(
                              "availabilityId",
                              ""
                            );
                          },
                        })}
                        disabled={
                          isAvailabilityLoading ||
                          availableDates.length === 0
                        }
                        className={`w-full rounded-lg border bg-white py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10 disabled:cursor-not-allowed disabled:bg-slate-100 ${
                          errors.date
                            ? "border-red-400"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="">
                          Select an available date
                        </option>

                        {availableDates.map((date) => (
                          <option
                            key={date}
                            value={date}
                          >
                            {formatDate(date)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {errors.date && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  {/* TIME */}

                  <div>
                    <label
                      htmlFor="availabilityId"
                      className="mb-2 block text-sm font-medium text-[#00224A]"
                    >
                      Available Time
                    </label>

                    <div className="relative">
                      <Clock3
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        id="availabilityId"
                        {...register(
                          "availabilityId",
                          {
                            required:
                              "Please select an available time",
                          }
                        )}
                        disabled={
                          !selectedDate ||
                          availableTimeSlots.length === 0
                        }
                        className={`w-full rounded-lg border bg-white py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10 disabled:cursor-not-allowed disabled:bg-slate-100 ${
                          errors.availabilityId
                            ? "border-red-400"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="">
                          {!selectedDate
                            ? "Select a date first"
                            : "Select an available time"}
                        </option>

                        {availableTimeSlots.map(
                          (slot) => (
                            <option
                              key={slot.id}
                              value={slot.id}
                            >
                              {formatTime(
                                slot.startTime
                              )}{" "}
                              -{" "}
                              {formatTime(
                                slot.endTime
                              )}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {errors.availabilityId && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {
                          errors.availabilityId
                            .message
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* =====================================================
                  SERVICE LOCATION
              ====================================================== */}

              <div className="border-b border-slate-100 py-6">
                <h2 className="text-lg font-semibold text-[#00224A]">
                  Service Location
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-[#00224A]"
                  >
                    Full Address
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400"
                    />

                    <textarea
                      id="address"
                      rows={2}
                      placeholder="Enter your complete service address"
                      {...register("address", {
                        required:
                          "Please enter your service address",
                      })}
                      className={`w-full resize-none rounded-lg border py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10 ${
                        errors.address
                          ? "border-red-400"
                          : "border-slate-200"
                      }`}
                    />
                  </div>

                  {errors.address && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              {/* =====================================================
                  NOTES
              ====================================================== */}

              <div className="border-b border-slate-100 py-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-[#00224A]"
                >
                  Additional Information{" "}
                  <span className="font-normal text-slate-400">
                    (Optional)
                  </span>
                </label>

                <textarea
                  id="notes"
                  rows={2}
                  placeholder="Any special instructions?"
                  {...register("notes")}
                  className="mt-3 w-full resize-none rounded-lg border border-slate-200 px-3.5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10"
                />
              </div>

              {/* =====================================================
                  SUBMIT
              ====================================================== */}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={
                    isBookingLoading ||
                    isPaymentLoading ||
                    availableDates.length === 0
                  }
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#d95608] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isBookingLoading ||
                  isPaymentLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                      {isBookingLoading
                        ? "Creating Booking..."
                        : "Redirecting to Payment..."}
                    </>
                  ) : (
                    <>
                      Request Booking & Pay

                      <ArrowUpRight
                        size={18}
                        strokeWidth={2.5}
                        className="transition-transform duration-300 group-hover:rotate-45"
                      />
                    </>
                  )}
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck
                    size={15}
                    className="text-[#EC620B]"
                  />

                  Secure payment powered by Stripe
                </div>
              </div>
            </form>

            {/* =====================================================
                SERVICE SUMMARY
            ====================================================== */}

            <aside className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="relative h-52">
                  <Image
                    src={SERVICE_IMAGE}
                    alt={serviceName}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#00224A]/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#00224A]">
                      {categoryName}
                    </span>
                  </div>
                </div>

                <div className="p-6">

                  <h2 className="text-xl font-semibold leading-snug text-[#00224A]">
                    {serviceName}
                  </h2>

                  {/* RATING */}

                  <div className="mt-3 flex items-center gap-2">
                    <Star
                      size={16}
                      fill="#EC620B"
                      className="text-[#EC620B]"
                    />

                    <span className="text-sm font-semibold text-[#00224A]">
                      {technicianRating || "New"}
                    </span>

                    <span className="text-sm text-slate-400">
                      ({totalReviews} reviews)
                    </span>
                  </div>

                  {/* TECHNICIAN */}

                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3.5">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={technicianImage}
                        alt={technicianName}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Your professional
                      </p>

                      <p className="mt-0.5 text-sm font-semibold text-[#00224A]">
                        {technicianName}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {technicianExperience}
                      </p>
                    </div>
                  </div>

                  {/* BOOKING SUMMARY */}

                  <div className="my-5 border-t border-slate-200 pt-5">
                    <h3 className="text-sm font-semibold text-[#00224A]">
                      Booking Summary
                    </h3>

                    <div className="mt-4 space-y-3.5">

                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-slate-500">
                          Date
                        </span>

                        <span className="font-medium text-[#00224A]">
                          {selectedDate
                            ? formatDate(selectedDate)
                            : "Not selected"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-slate-500">
                          Time
                        </span>

                        <span className="font-medium text-[#00224A]">
                          {selectedSlot
                            ? `${formatTime(
                                selectedSlot.startTime
                              )} - ${formatTime(
                                selectedSlot.endTime
                              )}`
                            : "Not selected"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-slate-500">
                          Service area
                        </span>

                        <span className="max-w-[180px] text-right font-medium text-[#00224A]">
                          {technicianLocation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PRICE */}

                  <div className="border-t border-slate-200 pt-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-400">
                          Service price
                        </p>

                        <p className="mt-1 text-3xl font-bold text-[#00224A]">
                          ৳{servicePrice.toLocaleString()}
                        </p>
                      </div>

                      <span className="mb-1 text-xs text-slate-400">
                        / service
                      </span>
                    </div>
                  </div>

                  {/* PAYMENT INFO */}

                  <div className="mt-5 flex gap-3 rounded-xl bg-[#00224A]/5 p-3.5">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[#EC620B]"
                    />

                    <p className="text-xs leading-5 text-slate-500">
                      After requesting your booking,
                      you will be redirected to secure
                      Stripe Checkout to complete your
                      payment.
                    </p>
                  </div>

                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookingPage;