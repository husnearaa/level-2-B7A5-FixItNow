"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="bg-[#F4F7FA] px-4 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-[#00224A]/10
            bg-[#EAF1F8]
            px-6
            py-12
            sm:px-10
            sm:py-14
            lg:px-16
            lg:py-16
          "
        >
          {/* Decorative Background Shape */}
          <div
            className="
              absolute
              -right-20
              -top-24
              h-72
              w-72
              rounded-full
              bg-[#00224A]/5
            "
          />

          <div
            className="
              absolute
              -bottom-28
              -left-20
              h-64
              w-64
              rounded-full
              bg-[#EC620B]/5
            "
          />

          {/* Decorative Orange Line */}
          <div
            className="
              absolute
              right-10
              top-10
              hidden
              h-20
              w-20
              rounded-full
              border-8
              border-[#EC620B]/10
              sm:block
            "
          />

          {/* Content */}
          <div
            className="
              relative
              z-10
              mx-auto
              max-w-3xl
              text-center
            "
          >
            {/* Small Label */}
            <div className="mb-4 flex items-center justify-center gap-2">
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-[#EC620B]/10
                  text-[#EC620B]
                "
              >
                <Sparkles size={14} />
              </span>

              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#EC620B]
                  sm:text-sm
                "
              >
                Get Started Today
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
                lg:text-[44px]
              "
            >
              Ready to Take Care of Your Home?
            </h2>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-4
                max-w-[600px]
                text-sm
                leading-relaxed
                text-slate-600
                sm:text-base
              "
            >
              Find trusted professionals, choose a convenient time, and book
              your home service with confidence.
            </p>

            {/* Benefits */}
            <div
              className="
                mt-7
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:flex-row
                sm:gap-6
              "
            >
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2
                  size={17}
                  className="text-[#EC620B]"
                  strokeWidth={2}
                />
                Trusted Professionals
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2
                  size={17}
                  className="text-[#EC620B]"
                  strokeWidth={2}
                />
                Easy Booking
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2
                  size={17}
                  className="text-[#EC620B]"
                  strokeWidth={2}
                />
                Secure Payments
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/services"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-md
                  bg-[#EC620B]
                  px-7
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:bg-[#D95608]
                  hover:shadow-lg
                  active:scale-95
                "
              >
                Explore Services

                <ArrowUpRight
                  size={18}
                  strokeWidth={2.5}
                  className="
                    transition-transform
                    duration-300
                    group-hover:rotate-45
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;