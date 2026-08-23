"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  borderColor: string;
  buttonColor: string;
  backgroundColor: string;
}

export default function CategoryCard({
  title,
  description,
  imageSrc,
}: CategoryCardProps) {
  const router = useRouter();

  const handleCategoryClick = () => {
    router.push(
      `/services?category=${title.toLowerCase().replaceAll(" ", "-")}`
    );
  };

  return (
    <div
      onClick={handleCategoryClick}
      className="
        group
        relative
        flex
        h-full
        cursor-pointer
        flex-col
        items-center
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        transition-all
        duration-300
        ease-out
        hover:-translate-y-2
        hover:border-[#EC620B]/40
        hover:shadow-[0_18px_40px_rgba(0,34,74,0.10)]
      "
    >
      {/* Category Image */}
      <div
        className="
          mb-5
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-[#00224A]/5
          p-4
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:bg-[#00224A]
        "
      >
        <Image
          src={imageSrc}
          alt={title}
          width={52}
          height={52}
          className="
            object-contain
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />
      </div>

      {/* Title */}
      <h3
        className="
          mb-2
          text-center
          text-lg
          font-semibold
          text-[#00224A]
          transition-colors
          duration-300
          group-hover:text-[#EC620B]
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          mb-6
          flex-grow
          text-center
          text-sm
          leading-relaxed
          text-slate-500
        "
      >
        {description}
      </p>

      {/* Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleCategoryClick();
        }}
        className="
          flex
          cursor-pointer
          items-center
          gap-2
          rounded-md
          bg-[#EC620B]
          px-5
          py-2.5
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:gap-3
          hover:bg-[#d95608]
          active:scale-95
        "
      >
        View Services

        <ArrowUpRight
          size={16}
          strokeWidth={2.5}
          className="
            transition-transform
            duration-300
            group-hover:rotate-45
          "
        />
      </button>

      {/* Bottom Orange Accent */}
      <span
        className="
          absolute
          bottom-0
          left-1/2
          h-1
          w-0
          -translate-x-1/2
          rounded-t-full
          bg-[#EC620B]
          transition-all
          duration-300
          group-hover:w-1/2
        "
      />
    </div>
  );
}