"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Home Cleaning",
    review:
      "Finding a reliable cleaner used to be difficult, but FixItNow made the whole process incredibly simple. The professional arrived on time and did an excellent job.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Rahim Hasan",
    role: "Plumbing Service",
    review:
      "I had a plumbing issue at home and needed help quickly. I found a qualified technician through FixItNow and was very happy with the service and booking experience.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Electrical Service",
    review:
      "The technician was professional, friendly, and completed the work perfectly. I really liked being able to check the technician's profile before booking.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
];

const ReviewsSection = () => {
  return (
    <section className="bg-gray-100 px-4 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
          {/* Small Label */}
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />

            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B] sm:text-sm">
              Customer Reviews
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
            What Our Customers Say
          </h2>

          {/* Description */}
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
            See why customers trust FixItNow for reliable professionals and
            hassle-free home services.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="
                group
                relative
                flex
                h-full
                flex-col
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-[#EC620B]/30
                hover:shadow-[0_16px_35px_rgba(0,34,74,0.08)]
                sm:p-7
              "
            >
              {/* Quote Icon */}
              <div
                className="
                  absolute
                  right-6
                  top-6
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#EC620B]/10
                  text-[#EC620B]
                  transition-all
                  duration-300
                  group-hover:bg-[#EC620B]
                  group-hover:text-white
                "
              >
                <Quote size={19} fill="currentColor" />
              </div>

              {/* Customer */}
              <div className="mb-5 flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[#00224A] sm:text-lg">
                    {review.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                    {review.role}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    fill="#EC620B"
                    className="text-[#EC620B]"
                  />
                ))}

                <span className="ml-2 text-xs font-medium text-slate-500">
                  {review.rating}.0
                </span>
              </div>

              {/* Review */}
              <p className="flex-1 text-sm leading-7 text-slate-600">
                &quot;{review.review}&quot;
              </p>

              {/* Bottom Accent */}
              <div
                className="
                  mt-6
                  h-1
                  w-10
                  rounded-full
                  bg-[#EC620B]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;