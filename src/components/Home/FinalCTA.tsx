"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="bg-white px-4 py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-[#00224A]
            px-6
            py-12
            sm:px-10
            sm:py-14
            lg:px-16
            lg:py-16
          "
        >
          {/* Decorative Circle */}
          <div
            className="
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              border-[40px]
              border-white/5
            "
          />

          <div
            className="
              absolute
              -bottom-24
              left-1/3
              h-52
              w-52
              rounded-full
              border-[35px]
              border-[#EC620B]/10
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
              <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />

              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B] sm:text-sm">
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
                text-white
                sm:text-4xl
                lg:text-[44px]
              "
            >
              Ready to Get Your Home Fixed?
            </h2>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-4
                max-w-[600px]
                text-sm
                leading-relaxed
                text-white/65
                sm:text-base
              "
            >
              Find trusted professionals, choose a convenient time, and book
              your next home service with FixItNow.
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
              <div className="flex items-center gap-2 text-sm text-white/75">
                <CheckCircle2
                  size={17}
                  className="text-[#EC620B]"
                  strokeWidth={2}
                />
                Trusted Professionals
              </div>

              <div className="flex items-center gap-2 text-sm text-white/75">
                <CheckCircle2
                  size={17}
                  className="text-[#EC620B]"
                  strokeWidth={2}
                />
                Easy Booking
              </div>

              <div className="flex items-center gap-2 text-sm text-white/75">
                <CheckCircle2
                  size={17}
                  className="text-[#EC620B]"
                  strokeWidth={2}
                />
                Secure Payments
              </div>
            </div>

            {/* Button */}
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
                  shadow-lg
                  transition-all
                  duration-300
                  hover:bg-[#d95608]
                  hover:shadow-xl
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