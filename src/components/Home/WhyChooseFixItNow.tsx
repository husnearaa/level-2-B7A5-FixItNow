"use client";

import Image from "next/image";
import {
  ShieldCheck,
  CalendarCheck,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: "Verified Professionals",
    description:
      "Connect with qualified technicians and experienced professionals you can trust for your home service needs.",
    icon: ShieldCheck,
  },
  {
    title: "Easy & Fast Booking",
    description:
      "Find the service you need, choose a convenient time, and book your professional in just a few clicks.",
    icon: CalendarCheck,
  },
  {
    title: "Quality Service",
    description:
      "Check professional profiles and customer reviews to choose the right person for your job with confidence.",
    icon: BadgeCheck,
  },
  {
    title: "Secure Payments",
    description:
      "Enjoy a safe and convenient payment experience with secure online transactions through the platform.",
    icon: CreditCard,
  },
];

const WhyChooseFixItNow = () => {
  return (
    <section className="bg-white px-4 py-16 lg:py-20">
      <div className="container mx-auto w-full max-w-[1440px]">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />

            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B] sm:text-sm">
              Why FixItNow
            </span>
          </div>

          <h2
            className="
              text-3xl
              font-semibold
              leading-[1.2]
              tracking-tight
              text-[#00224A]
              sm:text-4xl
              lg:text-[42px]
            "
          >
            Why Choose FixItNow?
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-[570px]
              text-sm
              leading-relaxed
              text-slate-500
              sm:text-base
            "
          >
            We make it simple to find trusted professionals and get reliable
            home services without the hassle.
          </p>
        </div>

        {/* Content */}
        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-10 xl:gap-14">
          {/* Left Side */}
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    group
                    flex
                    min-h-[140px]
                    cursor-pointer
                    items-start
                    gap-5
                    rounded-2xl
                    border
                    border-slate-200
                    bg-[#F8FAFC]
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#EC620B]/30
                    hover:bg-white
                    hover:shadow-[0_14px_35px_rgba(0,34,74,0.08)]
                    sm:min-h-[150px]
                    sm:p-6
                  "
                >
                  {/* Number */}
                  <span
                    className="
                      hidden
                      pt-1
                      text-sm
                      font-bold
                      text-[#EC620B]/60
                      sm:block
                    "
                  >
                    0{index + 1}
                  </span>

                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#00224A]/5
                      text-[#00224A]
                      transition-all
                      duration-300
                      group-hover:bg-[#EC620B]
                      group-hover:text-white
                    "
                  >
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3
                      className="
                        mb-2
                        text-lg
                        font-semibold
                        text-[#00224A]
                        transition-colors
                        duration-300
                        group-hover:text-[#EC620B]
                        sm:text-xl
                      "
                    >
                      {feature.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side Image */}
          <div className="group relative min-h-[450px] overflow-hidden rounded-3xl lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop"
              alt="Professional handyman providing home repair service"
                fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="
                object-cover
                object-center
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00224A]/75 via-[#00224A]/10 to-transparent" />

            {/* Image Text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="mb-2 inline-block rounded-full bg-[#EC620B] px-3 py-1 text-xs font-semibold text-white">
                FixItNow
              </span>

              <h3 className="max-w-md text-2xl font-semibold leading-tight text-white sm:text-3xl">
                Reliable help for every home.
              </h3>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
                From everyday repairs to essential maintenance, find the right
                professional when you need them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseFixItNow;
