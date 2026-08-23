import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  UserCheck,
} from "lucide-react";

interface ServiceDetails {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  location: string;
  technician: {
    name: string;
    image: string;
    rating: number;
    experience: string;
    completedJobs: number;
  };
  features: string[];
}

const service: ServiceDetails = {
  title: "Professional Home Cleaning",

  category: "Cleaning",

  description:
    "Reliable and professional home cleaning service for a clean, fresh, and comfortable home.",

  longDescription:
    "Our professional home cleaning service is designed to make your home fresh, clean, and comfortable. Verified technicians carefully handle your cleaning needs using professional tools and reliable techniques.",

  image:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",

  rating: 4.9,

  reviews: 128,

  price: 1500,

  duration: "2–3 hours",

  location: "Available across Dhaka",

  technician: {
    name: "Sarah Ahmed",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",

    rating: 4.9,

    experience: "5+ years experience",

    completedJobs: 320,
  },

  features: [
    "Verified and experienced professional",
    "Flexible scheduling",
    "High-quality service",
    "Transparent pricing",
    "Easy online booking",
    "Secure payment",
  ],
};

interface PageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

const ServiceDetailsPage = async ({ params }: PageProps) => {
  const { serviceId } = await params;

  return (
    <main className="min-h-screen bg-gray-50">
  
          {/* SERVICE OVERVIEW */}
  
      <section className="bg-gray-50 px-4 pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-12">
        <div className="mx-auto w-full max-w-[1440px]">
          {/* Back Button */}
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#EC620B]"
          >
            <ArrowLeft size={17} />
            Back to Services
          </Link>

          {/* Overview Card */}
          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
               
               {/* LEFT - IMAGE */}

            <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[560px]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00224A]/50 via-transparent to-transparent" />

              {/* Category */}
              <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#00224A] shadow-md sm:text-sm">
                  {service.category}
                </span>
              </div>

              {/* Rating */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-[#00224A]/90 px-4 py-2.5 text-sm text-white backdrop-blur-sm sm:bottom-7 sm:left-7">
                <Star
                  size={16}
                  fill="#EC620B"
                  className="text-[#EC620B]"
                />

                <span className="font-semibold">{service.rating}</span>

                <span className="text-white/60">
                  ({service.reviews} reviews)
                </span>
              </div>
            </div>

            {/* =================================================
                RIGHT - SERVICE INFORMATION
            ================================================== */}

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12 xl:p-16">

              {/* Title */}
              <h1 className="max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight text-[#00224A] sm:text-4xl lg:text-[46px]">
                {service.title}
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                {service.description}
              </p>

              {/* Price */}
              <div className="mt-7">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Starting from
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-3xl font-bold text-[#00224A] sm:text-4xl">
                    ৳{service.price.toLocaleString()}
                  </span>

                  <span className="mb-1 text-sm text-slate-400">
                    / service
                  </span>
                </div>
              </div>

              {/* Service Meta */}
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Duration */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00224A]/5 text-[#00224A]">
                    <Clock3 size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Duration</p>

                    <p className="mt-0.5 text-sm font-semibold text-[#00224A]">
                      {service.duration}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00224A]/5 text-[#00224A]">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Availability</p>

                    <p className="mt-0.5 text-sm font-semibold text-[#00224A]">
                      Dhaka
                    </p>
                  </div>
                </div>
              </div>

              {/* Technician Preview */}
              <div className="mt-7 flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full">
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
                      Service professional
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-[#00224A]">
                      {service.technician.name}
                    </p>
                  </div>
                </div>

                <div className="hidden items-center gap-1.5 sm:flex">
                  <Star
                    size={15}
                    fill="#EC620B"
                    className="text-[#EC620B]"
                  />

                  <span className="text-sm font-semibold text-[#00224A]">
                    {service.technician.rating}
                  </span>
                </div>
              </div>

              {/* Booking Button */}
              <Link
                href={`/services/${serviceId}/book`}
                className="group mt-7 flex w-full items-center justify-center gap-2 rounded-md bg-[#EC620B] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#d95608] hover:shadow-lg active:scale-[0.98]"
              >
                Book This Service

                <ArrowUpRight
                  size={18}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </Link>

              {/* Trust Text */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={15} className="text-[#EC620B]" />
                Verified professionals & secure booking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section className=" pb-16 pt-2 sm:pb-20 sm:pt-4 lg:pb-24 lg:pt-6">
        <div className="mx-auto w-full">
          <div className="container space-y-6">
            {/* =================================================
                ABOUT SERVICE
            ================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00224A]/5 text-[#00224A]">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B]">
                    Service Overview
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-[#00224A] sm:text-2xl">
                    About This Service
                  </h2>
                </div>
              </div>

              <p className="max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
                {service.longDescription}
              </p>
            </div>

            {/* =================================================
                WHAT'S INCLUDED
            ================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B]">
                  Service Benefits
                </p>

                <h2 className="mt-1 text-xl font-semibold text-[#00224A] sm:text-2xl">
                  What&apos;s Included
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:border-[#EC620B]/20 hover:bg-[#EC620B]/5"
                  >
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-[#EC620B]"
                    />

                    <span className="text-sm text-slate-600">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                TECHNICIAN
            ================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />

                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B]">
                    Your Professional
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-[#00224A] sm:text-2xl">
                  Meet Your Technician
                </h2>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {/* Technician Image */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                  <Image
                    src={service.technician.image}
                    alt={service.technician.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Technician Information */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#00224A]">
                    {service.technician.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {service.technician.experience}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1 text-sm">
                      <Star
                        size={16}
                        fill="#EC620B"
                        className="text-[#EC620B]"
                      />

                      <span className="font-medium text-[#00224A]">
                        {service.technician.rating}
                      </span>
                    </span>

                    <span className="text-sm text-slate-500">
                      {service.technician.completedJobs}+ completed jobs
                    </span>
                  </div>
                </div>

                {/* Verified */}
                <div className="flex items-center gap-2 text-sm font-medium text-[#00224A]">
                  <UserCheck
                    size={18}
                    className="text-[#EC620B]"
                  />

                  Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailsPage;