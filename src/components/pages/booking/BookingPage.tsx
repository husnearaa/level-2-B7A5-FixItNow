"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";

interface BookingFormData {
  date: string;
  time: string;
  address: string;
  notes: string;
}

const timeSlots = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

const service = {
  title: "Professional Home Cleaning",
  category: "Cleaning",
  image:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=900&auto=format&fit=crop",
  price: 150,
  duration: "2–3 hours",
  rating: 4.9,
  reviews: 128,
  location: "Dhaka",
  technician: {
    name: "Sarah Ahmed",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    rating: 4.9,
    experience: "5+ years experience",
  },
};

const BookingPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      date: "",
      time: "",
      address: "",
      notes: "",
    },
  });

  const selectedTime = watch("time");
  const selectedDate = watch("date");

  const onSubmit = (data: BookingFormData) => {
    console.log("Booking Data:", {
      ...data,
      serviceId: "service-id",
      serviceName: service.title,
      price: service.price,
    });

    // Later:
    // router.push("/payment");
    //
    // You can pass/store:
    // serviceId
    // date
    // time
    // address
    // notes
    // price
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="px-4 py-10 sm:py-12 lg:py-14">
        <div className="mx-auto w-6xl">
          {/* Back */}
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#EC620B]"
          >
            <ArrowLeft size={17} />
            Back to Services
          </Link>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* =====================================================
                LEFT — BOOKING FORM
            ====================================================== */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
            >
              {/* FORM TITLE */}
              <div className="border-b border-slate-100 pb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-[#00224A] sm:text-3xl">
                  Schedule Your Service
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Select your preferred date, time, and service location.
                </p>
              </div>

              {/* DATE & TIME */}
              <div className="border-b border-slate-100 py-6">
                <h2 className="mb-5 text-lg font-semibold text-[#00224A]">
                  Date & Time
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* DATE */}
                  <div>
                    <label
                      htmlFor="date"
                      className="mb-2 block text-sm font-medium text-[#00224A]"
                    >
                      Service Date
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="date"
                        type="date"
                        {...register("date", {
                          required: "Please select a service date",
                        })}
                        className={`w-full rounded-lg border bg-white py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10 ${
                          errors.date ? "border-red-400" : "border-slate-200"
                        }`}
                      />
                    </div>

                    {errors.date && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  {/* TIME */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#00224A]">
                      Preferred Time
                    </label>

                    <select
                      {...register("time", {
                        required: "Please select a time",
                      })}
                      className={`w-full rounded-lg border bg-white px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10 ${
                        errors.time ? "border-red-400" : "border-slate-200"
                      }`}
                    >
                      <option value="">Select a time</option>

                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>

                    {errors.time && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.time.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SERVICE LOCATION */}
              <div className="border-t border-slate-100 pt-6">
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
                        required: "Please enter your service address",
                      })}
                      className={`w-full resize-none rounded-lg border py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10 ${
                        errors.address ? "border-red-400" : "border-slate-200"
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

              {/* ADDITIONAL INFORMATION */}
              <div className="border-t border-slate-100 pt-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-[#00224A]"
                >
                  Additional Information{" "}
                  <span className="font-normal text-slate-400">(Optional)</span>
                </label>

                <textarea
                  id="notes"
                  rows={2}
                  placeholder="Any special instructions?"
                  {...register("notes")}
                  className="mt-3 w-full resize-none rounded-lg border border-slate-200 px-3.5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10"
                />
              </div>

              {/* SUBMIT */}
              <div className="border-t border-slate-100 pt-6">
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#d95608] hover:shadow-md active:scale-[0.98]"
                >
                  Continue to Payment
                  <ArrowUpRight
                    size={18}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={15} className="text-[#EC620B]" />
                  Secure booking and payment
                </div>
              </div>
            </form>

            {/* =====================================================
                RIGHT — SERVICE SUMMARY
            ====================================================== */}
            <aside className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* IMAGE */}
                <div className="relative h-52">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#00224A]/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#00224A]">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold leading-snug text-[#00224A]">
                    {service.title}
                  </h2>

                  {/* RATING */}
                  <div className="mt-3 flex items-center gap-2">
                    <Star size={16} fill="#EC620B" className="text-[#EC620B]" />

                    <span className="text-sm font-semibold text-[#00224A]">
                      {service.rating}
                    </span>

                    <span className="text-sm text-slate-400">
                      ({service.reviews} reviews)
                    </span>
                  </div>

                  {/* TECHNICIAN */}
                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3.5">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={service.technician.image}
                        alt={service.technician.name}
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
                        {service.technician.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {service.technician.experience}
                      </p>
                    </div>
                  </div>

                  {/* SUMMARY */}
                  <div className="my-5 border-t border-slate-200 pt-5">
                    <h3 className="text-sm font-semibold text-[#00224A]">
                      Booking Summary
                    </h3>

                    <div className="mt-4 space-y-3.5">
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-slate-500">Date</span>

                        <span className="font-medium text-[#00224A]">
                          {selectedDate || "Not selected"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-slate-500">Time</span>

                        <span className="font-medium text-[#00224A]">
                          {selectedTime || "Not selected"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-slate-500">Duration</span>

                        <span className="font-medium text-[#00224A]">
                          {service.duration}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-slate-500">Location</span>

                        <span className="font-medium text-[#00224A]">
                          {service.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="border-t border-slate-200 pt-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-400">Service price</p>

                        <p className="mt-1 text-3xl font-bold text-[#00224A]">
                          ${service.price.toLocaleString()}
                        </p>
                      </div>

                      <span className="mb-1 text-xs text-slate-400">
                        / service
                      </span>
                    </div>
                  </div>

                  {/* SECURITY */}
                  <div className="mt-5 flex gap-3 rounded-xl bg-[#00224A]/5 p-3.5">
                    <ShieldCheck
                      size={18}
                      className="mt-0.5 shrink-0 text-[#EC620B]"
                    />

                    <p className="text-xs leading-5 text-slate-500">
                      Your booking is protected with verified professionals and
                      secure payment.
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
