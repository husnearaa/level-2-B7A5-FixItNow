"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import heroImg from "@/assets/images/heroImg.jpg";

const HeroSection = () => {
  return (
    <section className="mt-20 w-full overflow-hidden bg-[#00224A]">
      {/* SVG Clip Path */}
      <svg
        className="absolute h-0 w-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath
            id="heroCurve"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M 0.27 0 C 0.16 0.22, 0.12 0.65, 0 1 L 1 1 L 1 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className="
          relative mx-auto
          min-h-[500px]
          w-full
          max-w-[1440px]
          sm:min-h-[520px]
          md:min-h-[550px]
        "
      >
        {/* LEFT CONTENT */}
        <div
          className="
            relative z-10
            flex min-h-[500px] w-full flex-col justify-center
            px-6 py-12
            sm:min-h-[520px] sm:px-10
            md:min-h-[550px] md:w-[58%] md:px-14
            lg:px-20
            xl:px-28
          "
        >
          {/* Small Label */}
          <div className="mb-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />

            <span className="text-xs text-white/70 sm:text-sm">
             Trusted Home Services
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              mb-5
              text-3xl font-semibold leading-[1.3] text-white
              md:text-4xl
              lg:text-5xl
              xl:text-[52px]
            "
          >
            Choose Us for A Tidy
            <br />
            Home And Peace Of Mind!
          </h1>

          {/* Description */}
          <p
            className="
              mb-8 max-w-[470px]
              text-sm leading-relaxed text-white/65
              sm:text-base
            "
          >
            Trusted professionals are ready to help with your home repair and
            maintenance needs. Find reliable experts and enjoy a comfortable,
            worry-free home.
          </p>

          {/* Button */}
          <div className="flex items-center">
            <Link
              href="/services"
              className="
                flex items-center gap-2
                rounded-md
                bg-[#EC620B]
                px-6 py-3
                text-sm font-semibold text-white
                shadow-md
                transition-all duration-200
                hover:bg-[#d95608]
                active:scale-95
              "
            >
              Explore services

              <ArrowUpRight
                size={17}
                strokeWidth={2.5}
              />
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="
            absolute inset-y-0 right-0
            hidden h-full w-[60%]
            overflow-hidden
            md:block
          "
          style={{
            clipPath: "url(#heroCurve)",
          }}
        >
          <Image
            src={heroImg}
            alt="FixItNow home service professional"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-[#00224A]/10" />
        </div>

        {/* MOBILE IMAGE */}
        <div className="relative h-[350px] w-full overflow-hidden md:hidden">
          <Image
            src={heroImg}
            alt="FixItNow home service professional"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#00224A]/10" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;