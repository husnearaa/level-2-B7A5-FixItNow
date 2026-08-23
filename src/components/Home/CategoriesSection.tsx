import { categoriesData } from "@/types/CategoryData";
import CategoryCard from "../shared/categoryCard";

export default function QuickCategory() {
  return (
    // <section className="bg-slate-50 px-4 py-16 sm:py-20 lg:py-24">
    <section className="bg-[#F8FAFC] px-4 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto">
        {/* Section Heading */}
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {/* Small Label */}
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />

            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B] sm:text-sm">
              Explore Categories
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
            Explore Services for Your Home
          </h2>

          {/* Description */}
          <p
            className="
      mx-auto
      mt-4
      max-w-[560px]
      text-sm
      leading-relaxed
      text-slate-500
      sm:text-base
    "
          >
            Find trusted professionals for plumbing, electrical, cleaning,
            painting, and more.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categoriesData.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              imageSrc={category.imageSrc}
              borderColor={category.borderColor}
              buttonColor={category.buttonColor}
              backgroundColor={category.backgroundColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
