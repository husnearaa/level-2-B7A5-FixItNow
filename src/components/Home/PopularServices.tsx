"use client";

import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  Zap,
  Sparkles,
  Paintbrush,
  Wind,
  Hammer,
} from "lucide-react";
import Image from "next/image";

const popularServices = [
  {
    title: "Bathroom Plumbing Repair",
    category: "Plumbing",
    description:
      "Fix leaks, faucets, pipes, drains, and other bathroom plumbing issues.",
    icon: Wrench,
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Electrical Wiring",
    category: "Electrical",
    description:
      "Get professional help with wiring, switches, outlets, and lighting.",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Deep Home Cleaning",
    category: "Cleaning",
    description:
      "Give your home a fresh and spotless look with professional cleaning.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Interior Painting",
    category: "Painting",
    description:
      "Transform your rooms with skilled and reliable painting professionals.",
    icon: Paintbrush,
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80",
  },
{
  title: "AC Repair & Service",
  category: "AC & HVAC",
  description:
    "Keep your AC running smoothly with expert repair and maintenance.",
  icon: Wind,
  image:
    "https://images.pexels.com/photos/5463580/pexels-photo-5463580.jpeg?auto=compress&cs=tinysrgb&w=900",
},
  {
    title: "Furniture Assembly",
    category: "Handyman",
    description:
      "Get professional help assembling and setting up your furniture.",
    icon: Hammer,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
  },
];

const PopularServices = () => {
  return (
    <section className="bg-bg-color px-4 py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* ================= HEADER ================= */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-start md:justify-between">
          <div>
            {/* Small Label */}
            <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#EC620B] sm:text-xs">
                Service
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-[560px] text-3xl font-semibold leading-[1.3] tracking-tight text-white sm:text-4xl lg:text-[40px]">
              Explore &amp; Find Your Perfect
              <br className="hidden sm:block" />
              Home Repair Solution
            </h2>
          </div>

          {/* See All Service */}
          <Link
            href="/services"
            className="group flex w-fit shrink-0 items-center gap-2 rounded-md bg-[#EC620B] px-5 py-3 text-[10px] font-semibold text-white transition-all duration-300 hover:bg-[#d95708] hover:shadow-lg sm:text-xs"
          >
            See All Service

            <ArrowRight
              size={13}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ================= SERVICES GRID ================= */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularServices.map((service) => {
            const Icon = service.icon;

            const categorySlug = service.category
              .toLowerCase()
              .replaceAll(" ", "-")
              .replaceAll("&", "and");

            return (
              <Link
                key={service.title}
                href={`/services?category=${categorySlug}`}
                className="
                  group
                  relative
                  overflow-visible
                  rounded-lg
                  bg-card-bg
                  p-4
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-1
                  hover:bg-[#0D3B73]
                  hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]
                "
              >
                {/* ================= IMAGE ================= */}
                <div className="relative mb-5">
                  <div className="h-[150px] overflow-hidden rounded-md sm:h-[155px] lg:h-[160px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={500}
                      height={500}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* ================= ORANGE ICON ================= */}
                  <div
                    className="
                      absolute
                      -bottom-3
                      left-1/2
                      flex
                      h-9
                      w-9
                      -translate-x-1/2
                      items-center
                      justify-center
                      rounded-md
                      bg-[#EC620B]
                      text-white
                      shadow-md
                      transition-all
                      duration-300
                      group-hover:-translate-x-1/2
                      group-hover:scale-110
                    "
                  >
                    <Icon size={16} strokeWidth={2} />
                  </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="pt-1 text-center">
                  {/* Title */}
                  <h3 className="mb-2 text-base font-semibold text-white ">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mx-auto mb-4 max-w-[280px] text-sm leading-[1.7] text-slate-300">
                    {service.description}
                  </p>

                  {/* Read More */}
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#EC620B] transition-colors duration-200 group-hover:text-white">
                    View details
                    <ArrowRight
                      size={11}
                      strokeWidth={2.5}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;