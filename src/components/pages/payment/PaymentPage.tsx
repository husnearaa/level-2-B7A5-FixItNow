"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const PaymentPage = () => {
  const searchParams = useSearchParams();

  const service = searchParams.get("service") || "Service";
  const serviceId = searchParams.get("serviceId") || "";
  const price = Number(searchParams.get("price")) || 0;
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const address = searchParams.get("address") || "";
  const notes = searchParams.get("notes") || "";

  const handlePayment = () => {
    // Later connect Stripe here.
    console.log({
      serviceId,
      service,
      amount: price,
      date,
      time,
      address,
      notes,
    });

    // Example later:
    // router.push("/payment/success");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="px-4 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-[1100px]">
          {/* Back */}
          <Link
            href="/services"
            className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#EC620B]"
          >
            <ArrowLeft size={17} />
            Back to Services
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* LEFT */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
              {/* Header */}
              <div className="border-b border-slate-100 pb-6">
                <h1 className="text-3xl font-semibold tracking-tight text-[#00224A] sm:text-4xl">
                  Complete Your Payment
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Review your booking details and complete the payment to
                  confirm your service.
                </p>
              </div>

              {/* Payment method */}
              <div className="mt-7">
                <h2 className="text-lg font-semibold text-[#00224A]">
                  Payment Method
                </h2>

                <div className="mt-4 rounded-xl border border-[#EC620B] bg-[#EC620B]/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#00224A]">
                        Credit / Debit Card
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Secure payment powered by Stripe
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EC620B]">
                      <CheckCircle2
                        size={18}
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card fields */}
              <div className="mt-7">
                <h2 className="text-lg font-semibold text-[#00224A]">
                  Card Information
                </h2>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#00224A]">
                      Card Number
                    </label>

                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#00224A]">
                        Expiry Date
                      </label>

                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#00224A]">
                        CVC
                      </label>

                      <input
                        type="text"
                        placeholder="123"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay button */}
              <button
                type="button"
                onClick={handlePayment}
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#EC620B] px-6 py-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#d95608] hover:shadow-lg active:scale-[0.98]"
              >
                Pay ${price.toLocaleString()}
                <ArrowUpRight
                  size={18}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck
                  size={15}
                  className="text-[#EC620B]"
                />

                Secure and encrypted payment
              </div>
            </div>

            {/* RIGHT - ORDER SUMMARY */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#00224A]">
                  Booking Summary
                </h2>

                {/* Service */}
                <div className="mt-5">
                  <p className="text-xs text-slate-400">
                    Service
                  </p>

                  <p className="mt-1 text-base font-semibold leading-6 text-[#00224A]">
                    {service}
                  </p>
                </div>

                <div className="my-5 h-px bg-slate-200" />

                {/* Date */}
                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 shrink-0 text-[#EC620B]"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Service Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#00224A]">
                      {date || "Not selected"}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="mt-5 flex items-start gap-3">
                  <Clock3
                    size={18}
                    className="mt-0.5 shrink-0 text-[#EC620B]"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Preferred Time
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#00224A]">
                      {time || "Not selected"}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-5 flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-[#EC620B]"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Service Address
                    </p>

                    <p className="mt-1 text-sm leading-5 font-medium text-[#00224A]">
                      {address || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="my-6 h-px bg-slate-200" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Service Price
                  </span>

                  <span className="text-sm font-medium text-[#00224A]">
                    ${price.toLocaleString()}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Payment Fee
                  </span>

                  <span className="text-sm font-medium text-[#00224A]">
                    $0
                  </span>
                </div>

                <div className="my-5 h-px bg-slate-200" />

                {/* Total */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-400">
                      Total Amount
                    </p>

                    <p className="mt-1 text-3xl font-bold text-[#00224A]">
                      ${price.toLocaleString()}
                    </p>
                  </div>

                  <span className="mb-1 text-xs text-slate-400">
                    USD
                  </span>
                </div>

                {/* Security */}
                <div className="mt-6 flex gap-3 rounded-xl bg-[#00224A]/5 p-4">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-[#EC620B]"
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    Your payment is protected with secure payment
                    processing.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentPage;