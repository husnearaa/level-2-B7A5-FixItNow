"use client";

import Link from "next/link";
import {
  Search,
  UserCheck,
  CalendarCheck,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose a Service",
    description:
      "Browse our wide range of home services and choose the one you need.",
    icon: Search,
  },
  {
    number: "02",
    title: "Find a Professional",
    description:
      "Explore qualified technicians, check their profiles, and find the right professional for your job.",
    icon: UserCheck,
  },
  {
    number: "03",
    title: "Book & Get It Done",
    description:
      "Select a convenient time, confirm your booking, and get your service done with ease.",
    icon: CalendarCheck,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 px-4 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
          {/* Small Label */}
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />

            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B] sm:text-sm">
              How It Works
            </span>
          </div>

          {/* Heading */}
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
            Home Services Made Simple
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-[560px] text-sm leading-relaxed text-slate-500 sm:text-base">
            Find the right professional, book a convenient time, and get your
            home service taken care of without the hassle.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {/* Connecting Line */}
          <div
            className="
              absolute
              left-[16.66%]
              right-[16.66%]
              top-[54px]
              hidden
              h-px
              bg-slate-400
              md:block
            "
          />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="
                  group
                  relative
                  z-10
                  flex
                  flex-col
                  items-center
                  text-center
                "
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className="
                      flex
                      h-[108px]
                      w-[108px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-400
                      bg-white
                      shadow-sm
                      transition-all
                      duration-300
                      group-hover:-translate-y-2
                      group-hover:border-[#EC620B]/40
                      group-hover:shadow-[0_12px_30px_rgba(0,34,74,0.10)]
                    "
                  >
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-[#00224A]/5
                        text-[#00224A]
                        transition-all
                        duration-300
                        group-hover:bg-[#EC620B]
                        group-hover:text-white
                      "
                    >
                      <Icon size={25} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Step Number */}
                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-[#EC620B]
                      text-xs
                      font-bold
                      text-white
                      shadow-sm
                    "
                  >
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="
                    mb-3
                    text-lg
                    font-semibold
                    text-[#00224A]
                    transition-colors
                    duration-300
                    group-hover:text-[#EC620B]
                    sm:text-xl
                  "
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="max-w-[320px] text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center lg:mt-14">
          <Link
            href="/services"
            className="
              group
              flex
              items-center
              gap-2
              rounded-md
              bg-button-bg
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#b44b0a]
              active:scale-95
            "
          >
            Find a Service

            <ArrowUpRight
              size={17}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;