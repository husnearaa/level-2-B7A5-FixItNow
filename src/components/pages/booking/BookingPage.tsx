"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

interface BookingFormData {
  date: string;
  time: string;
  address: string;
  notes: string;
}

const timeSlots: string[] = [
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
  price: 1500,
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
  const [formData, setFormData] = useState<BookingFormData>({
    date: "",
    time: "",
    address: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (
    field: keyof BookingFormData,
    value: string,
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    setIsSubmitted(true);

    // Later connect your API here:
    //
    // await axios.post("/api/bookings", {
    //   serviceId,
    //   date: formData.date,
    //   time: formData.time,
    //   address: formData.address,
    //   notes: formData.notes,
    // });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white px-4 py-8 sm:py-10">
        <div className="mx-auto w-full max-w-[1440px]">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#EC620B]"
          >
            <ArrowLeft size={17} />

            Back to Services
          </Link>

          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />

            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B] sm:text-sm">
              Book Your Service
            </span>
          </div>

          <h1 className="text-3xl font-semibold leading-[1.2] tracking-tight text-[#00224A] sm:text-4xl lg:text-[44px]">
            Schedule Your Service
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Choose a convenient date and time, provide your location, and
            confirm your service booking.
          </p>
        </div>
      </section>

      {/* =====================================================
          BOOKING SECTION
      ====================================================== */}
      <section className="px-4 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[1fr_400px]">
          {/* =================================================
              LEFT SIDE - FORM
          ================================================== */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* DATE & TIME */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="mb-7">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />

                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B]">
                    Schedule
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-[#00224A] sm:text-2xl">
                  Choose Date & Time
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Select when you would like the professional to visit
                  your home.
                </p>
              </div>

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
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(event) =>
                      handleChange("date", event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10"
                  />
                </div>
              </div>

              {/* TIME */}
              <div className="mt-6">
                <label className="mb-3 block text-sm font-medium text-[#00224A]">
                  Preferred Time
                </label>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {timeSlots.map((time) => {
                    const selected = formData.time === time;

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() =>
                          handleChange("time", time)
                        }
                        className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                          selected
                            ? "border-[#EC620B] bg-[#EC620B]/5 text-[#EC620B]"
                            : "border-slate-200 bg-white text-slate-600 hover:border-[#EC620B]/40 hover:text-[#EC620B]"
                        }`}
                      >
                        <Clock3 size={16} />

                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SERVICE LOCATION */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="mb-7">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />

                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B]">
                    Service Location
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-[#00224A] sm:text-2xl">
                  Where Do You Need the Service?
                </h2>
              </div>

              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-[#00224A]"
              >
                Full Address
              </label>

              <div className="relative">
                <MapPin
                  size={19}
                  className="absolute left-4 top-4 text-slate-400"
                />

                <textarea
                  id="address"
                  required
                  rows={4}
                  value={formData.address}
                  onChange={(event) =>
                    handleChange("address", event.target.value)
                  }
                  placeholder="Enter your complete service address..."
                  className="w-full resize-none rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10"
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Please provide an accurate address so your technician can
                easily find your location.
              </p>
            </div>

            {/* ADDITIONAL NOTES */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#00224A] sm:text-2xl">
                  Additional Information
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Have any special instructions? Let your professional know.
                </p>
              </div>

              <textarea
                rows={5}
                value={formData.notes}
                onChange={(event) =>
                  handleChange("notes", event.target.value)
                }
                placeholder="Example: Please bring cleaning supplies..."
                className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={
                !formData.date ||
                !formData.time ||
                !formData.address
              }
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#EC620B] px-6 py-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#d95608] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              Continue to Payment

              <ArrowUpRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </button>
          </form>

          {/* =================================================
              RIGHT SIDE - SERVICE SUMMARY
          ================================================== */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* SERVICE IMAGE */}
              <div className="relative h-56">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#00224A]/60 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#00224A]">
                    {service.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                {/* TITLE */}
                <h2 className="text-xl font-semibold leading-snug text-[#00224A]">
                  {service.title}
                </h2>

                {/* RATING */}
                <div className="mt-3 flex items-center gap-2">
                  <Star
                    size={16}
                    fill="#EC620B"
                    className="text-[#EC620B]"
                  />

                  <span className="text-sm font-semibold text-[#00224A]">
                    {service.rating}
                  </span>

                  <span className="text-sm text-slate-400">
                    ({service.reviews} reviews)
                  </span>
                </div>

                {/* TECHNICIAN */}
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-50 p-4">
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

                    <div className="mt-1 flex items-center gap-1">
                      <Star
                        size={13}
                        fill="#EC620B"
                        className="text-[#EC620B]"
                      />

                      <span className="text-xs text-slate-500">
                        {service.technician.rating} ·{" "}
                        {service.technician.experience}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SUMMARY */}
                <div className="my-6 h-px bg-slate-200" />

                <h3 className="text-sm font-semibold text-[#00224A]">
                  Booking Summary
                </h3>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-500">
                      Date
                    </span>

                    <span className="font-medium text-[#00224A]">
                      {formData.date || "Not selected"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-500">
                      Time
                    </span>

                    <span className="font-medium text-[#00224A]">
                      {formData.time || "Not selected"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-500">
                      Duration
                    </span>

                    <span className="font-medium text-[#00224A]">
                      {service.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-500">
                      Location
                    </span>

                    <span className="font-medium text-[#00224A]">
                      {service.location}
                    </span>
                  </div>
                </div>

                {/* PRICE */}
                <div className="my-6 h-px bg-slate-200" />

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-400">
                      Starting from
                    </p>

                    <p className="mt-1 text-3xl font-bold text-[#00224A]">
                      ৳{service.price.toLocaleString()}
                    </p>
                  </div>

                  <span className="mb-1 text-xs text-slate-400">
                    / service
                  </span>
                </div>

                {/* SECURITY */}
                <div className="mt-6 flex gap-3 rounded-xl bg-[#00224A]/5 p-4">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-[#EC620B]"
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    Your booking is protected with verified professionals
                    and secure payment.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          SUCCESS MESSAGE
      ====================================================== */}
      {isSubmitted && (
        <div className="fixed inset-x-4 bottom-5 z-50 mx-auto max-w-md">
          <div className="flex gap-3 rounded-2xl border border-green-200 bg-white p-5 shadow-2xl">
            <CheckCircle2
              size={22}
              className="mt-0.5 shrink-0 text-green-600"
            />

            <div>
              <h3 className="font-semibold text-[#00224A]">
                Booking details ready
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your booking information has been collected successfully.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BookingPage;