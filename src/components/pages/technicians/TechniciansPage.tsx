"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Star,
  MapPin,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";

interface Technician {
  id: string;
  name: string;
  role: string;
  category: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  experience: string;
  experienceYears: number;
  completedJobs: number;
  price: number;
}

const technicians: Technician[] = [
  {
    id: "sarah-ahmed",
    name: "Sarah Ahmed",
    role: "Home Cleaning Specialist",
    category: "Cleaning",
    location: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: 128,
    experience: "5+ years",
    experienceYears: 5,
    completedJobs: 350,
    price: 150,
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    role: "Professional Plumber",
    category: "Plumbing",
    location: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 96,
    experience: "7+ years",
    experienceYears: 7,
    completedJobs: 420,
    price: 120,
  },
  {
    id: "michael-khan",
    name: "Michael Khan",
    role: "Electrical Technician",
    category: "Electrical",
    location: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: 84,
    experience: "6+ years",
    experienceYears: 6,
    completedJobs: 280,
    price: 100,
  },
  {
    id: "emma-wilson",
    name: "Emma Wilson",
    role: "AC Repair Specialist",
    category: "AC Repair",
    location: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop",
    rating: 4.7,
    reviews: 72,
    experience: "4+ years",
    experienceYears: 4,
    completedJobs: 210,
    price: 130,
  },
  {
    id: "daniel-ahmed",
    name: "Daniel Ahmed",
    role: "Painting Specialist",
    category: "Painting",
    location: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 65,
    experience: "5+ years",
    experienceYears: 5,
    completedJobs: 190,
    price: 140,
  },
  {
    id: "olivia-martin",
    name: "Olivia Martin",
    role: "Home Appliance Expert",
    category: "Appliance Repair",
    location: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: 110,
    experience: "6+ years",
    experienceYears: 6,
    completedJobs: 310,
    price: 125,
  },
];

const categories = [
  "All",
  "Cleaning",
  "Plumbing",
  "Electrical",
  "AC Repair",
  "Painting",
  "Appliance Repair",
];

const TechniciansPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  const filteredTechnicians = useMemo(() => {
    return technicians.filter((technician) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        technician.name.toLowerCase().includes(searchValue) ||
        technician.role.toLowerCase().includes(searchValue) ||
        technician.category.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || technician.category === category;

      const matchesRating =
        ratingFilter === "All" ||
        (ratingFilter === "4.5+" && technician.rating >= 4.5) ||
        (ratingFilter === "4.8+" && technician.rating >= 4.8) ||
        (ratingFilter === "4.9+" && technician.rating >= 4.9);

      const matchesExperience =
        experienceFilter === "All" ||
        (experienceFilter === "3+" && technician.experienceYears >= 3) ||
        (experienceFilter === "5+" && technician.experienceYears >= 5) ||
        (experienceFilter === "7+" && technician.experienceYears >= 7);

      const matchesPrice =
        priceFilter === "All" ||
        (priceFilter === "Under $120" && technician.price < 120) ||
        (priceFilter === "$120 - $150" &&
          technician.price >= 120 &&
          technician.price <= 150) ||
        (priceFilter === "$150+" && technician.price >= 150);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRating &&
        matchesExperience &&
        matchesPrice
      );
    });
  }, [
    search,
    category,
    ratingFilter,
    experienceFilter,
    priceFilter,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setRatingFilter("All");
    setExperienceFilter("All");
    setPriceFilter("All");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="bg-[#00224A] px-4 py-16 lg:py-20 mt-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find a Trusted Technician
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Connect with skilled professionals who are ready to help with
            your home service needs.
          </p>

          {/* SEARCH */}
          <div className="relative mt-8 w-full max-w-2xl">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search technicians or services..."
              className="w-full rounded-xl border border-white/10 bg-white py-4 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/20"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <section className="px-4 py-10 sm:py-12 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          {/* HEADER */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#00224A] sm:text-3xl">
                Our Technicians
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {filteredTechnicians.length} professionals available
              </p>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="w-fit text-sm font-medium text-[#EC620B] transition hover:text-[#d95608]"
            >
              Clear all filters
            </button>
          </div>

          {/* =====================================================
              FILTERS
          ====================================================== */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <SlidersHorizontal
                size={18}
                className="text-[#EC620B]"
              />

              <h3 className="text-sm font-semibold text-[#00224A]">
                Filter Technicians
              </h3>
            </div>

            {/* CATEGORY */}
            <div className="mt-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                Service Category
              </p>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((item) => {
                  const active = category === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                        active
                          ? "border-[#EC620B] bg-[#EC620B] text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-[#EC620B]/40 hover:text-[#EC620B]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SELECT FILTERS */}
            <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
              {/* RATING */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#00224A]">
                  Rating
                </label>

                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-600 outline-none transition focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10"
                >
                  <option value="All">All Ratings</option>
                  <option value="4.5+">4.5+ Rating</option>
                  <option value="4.8+">4.8+ Rating</option>
                  <option value="4.9+">4.9+ Rating</option>
                </select>
              </div>

              {/* EXPERIENCE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#00224A]">
                  Experience
                </label>

                <select
                  value={experienceFilter}
                  onChange={(e) =>
                    setExperienceFilter(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-600 outline-none transition focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10"
                >
                  <option value="All">Any Experience</option>
                  <option value="3+">3+ Years</option>
                  <option value="5+">5+ Years</option>
                  <option value="7+">7+ Years</option>
                </select>
              </div>

              {/* PRICE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#00224A]">
                  Price Range
                </label>

                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-600 outline-none transition focus:border-[#EC620B] focus:ring-2 focus:ring-[#EC620B]/10"
                >
                  <option value="All">All Prices</option>
                  <option value="Under $120">Under $120</option>
                  <option value="$120 - $150">$120 - $150</option>
                  <option value="$150+">$150+</option>
                </select>
              </div>
            </div>
          </div>

          {/* =====================================================
              TECHNICIAN GRID
          ====================================================== */}
          {filteredTechnicians.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTechnicians.map((technician) => (
                <article
                  key={technician.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#EC620B]/30 hover:shadow-lg"
                >
                  {/* IMAGE */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={technician.image}
                      alt={technician.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#00224A]/70 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4">
                      <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#00224A]">
                        {technician.category}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    {/* NAME + RATING */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-[#00224A]">
                          {technician.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {technician.role}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 rounded-lg bg-[#EC620B]/5 px-2 py-1">
                        <Star
                          size={14}
                          fill="#EC620B"
                          className="text-[#EC620B]"
                        />

                        <span className="text-xs font-semibold text-[#00224A]">
                          {technician.rating}
                        </span>
                      </div>
                    </div>

                    {/* LOCATION */}
                    <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin size={15} />
                      {technician.location}
                    </div>

                    {/* STATS */}
                    <div className="mt-5 grid grid-cols-2 border-y border-slate-100 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#00224A]">
                          {technician.experience}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Experience
                        </p>
                      </div>

                      <div className="border-l border-slate-100 pl-4">
                        <p className="text-sm font-semibold text-[#00224A]">
                          {technician.completedJobs}+
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Jobs Completed
                        </p>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="mt-5 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs text-slate-400">
                          Starting from
                        </p>

                        <p className="mt-1 text-2xl font-bold text-[#00224A]">
                          ${technician.price}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Star
                          size={13}
                          fill="#EC620B"
                          className="text-[#EC620B]"
                        />

                        {technician.reviews} reviews
                      </div>
                    </div>

                    {/* BOOK NOW */}
                    <Link
                      href={`/booking?technician=${technician.id}`}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#00224A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#001a38]"
                    >
                      Book Now

                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* =====================================================
                NO RESULTS
            ====================================================== */
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Search size={22} className="text-slate-400" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#00224A]">
                No technicians found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filter options.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 text-sm font-semibold text-[#EC620B] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default TechniciansPage;