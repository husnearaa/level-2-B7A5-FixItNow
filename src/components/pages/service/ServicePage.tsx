"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface Category {
  id: string;
  name: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  category: Category;
  startingPrice: number;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
}

interface ServicesResponse {
  success: boolean;
  message: string;
  data: Service[];
}

/* =========================================================
   DEMO DATA

   Keep the structure similar to your future API response.
========================================================= */

const demoServices: Service[] = [
  {
    id: "1",
    title: "Plumbing Repair",
    description:
      "Professional solutions for leaking pipes, faucets, drainage issues, and other plumbing problems.",
    category: {
      id: "plumbing",
      name: "Plumbing",
    },
    startingPrice: 500,
    location: "Dhaka",
    rating: 4.8,
    reviewCount: 124,
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Electrical Service",
    description:
      "Reliable electrical installation, repairs, wiring, and maintenance by qualified professionals.",
    category: {
      id: "electrical",
      name: "Electrical",
    },
    startingPrice: 600,
    location: "Dhaka",
    rating: 4.7,
    reviewCount: 98,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Home Cleaning",
    description:
      "Professional cleaning services to keep your home fresh, clean, and comfortable.",
    category: {
      id: "cleaning",
      name: "Cleaning",
    },
    startingPrice: 800,
    location: "Dhaka",
    rating: 4.9,
    reviewCount: 156,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Painting Service",
    description:
      "Refresh your home with professional interior and exterior painting services.",
    category: {
      id: "painting",
      name: "Painting",
    },
    startingPrice: 1500,
    location: "Gazipur",
    rating: 4.6,
    reviewCount: 74,
    image:
      "https://images.unsplash.com/photo-1562259949-a4dbd2d188b8?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "AC & Cooling Service",
    description:
      "Professional AC cleaning, installation, servicing, and repair for your home.",
    category: {
      id: "ac-cooling",
      name: "AC & Cooling",
    },
    startingPrice: 700,
    location: "Dhaka",
    rating: 4.8,
    reviewCount: 112,
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Home Maintenance",
    description:
      "Reliable general maintenance and repair services to keep your home in great condition.",
    category: {
      id: "maintenance",
      name: "Maintenance",
    },
    startingPrice: 500,
    location: "Narayanganj",
    rating: 4.5,
    reviewCount: 67,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "7",
    title: "Handyman Service",
    description:
      "Get help with furniture assembly, fixtures, shelves, and everyday home repairs.",
    category: {
      id: "handyman",
      name: "Handyman",
    },
    startingPrice: 550,
    location: "Gazipur",
    rating: 4.7,
    reviewCount: 89,
    image:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "8",
    title: "Home Improvement",
    description:
      "Professional assistance for renovation, upgrades, and various home improvement projects.",
    category: {
      id: "home-improvement",
      name: "Home Improvement",
    },
    startingPrice: 1200,
    location: "Narayanganj",
    rating: 4.9,
    reviewCount: 91,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1000&auto=format&fit=crop",
  },
];

/* =========================================================
   DEMO API FUNCTION

   Later replace this with your real API call.
========================================================= */

const getServices = async (): Promise<ServicesResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Services retrieved successfully",
        data: demoServices,
      });
    }, 600);
  });
};

/* =========================================================
   COMPONENT
========================================================= */

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  /* ---------------- Fetch Services ---------------- */

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);

        const response = await getServices();

        if (response.success) {
          setServices(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  /* ---------------- Categories ---------------- */

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Map(
        services.map((service) => [service.category.id, service.category]),
      ).values(),
    );

    return [
      {
        id: "all",
        name: "All Services",
      },
      ...uniqueCategories,
    ];
  }, [services]);

  /* ---------------- Locations ---------------- */

  const locations = useMemo(() => {
    const uniqueLocations = [
      ...new Set(services.map((service) => service.location)),
    ];

    return ["all", ...uniqueLocations];
  }, [services]);

  /* ---------------- Filter Services ---------------- */

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.name.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "all" || service.category.id === selectedCategory;

      const matchesLocation =
        selectedLocation === "all" || service.location === selectedLocation;

      const matchesRating =
        selectedRating === 0 || service.rating >= selectedRating;

      const matchesMinPrice =
        !minPrice || service.startingPrice >= Number(minPrice);

      const matchesMaxPrice =
        !maxPrice || service.startingPrice <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesRating &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [
    services,
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedRating,
    minPrice,
    maxPrice,
  ]);

  /* ---------------- Check Active Filters ---------------- */

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    selectedLocation !== "all" ||
    selectedRating !== 0 ||
    minPrice ||
    maxPrice;

  /* ---------------- Reset Filters ---------------- */

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSelectedRating(0);
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <main className="min-h-screen bg-[#F6F8FA]">
      {/* =====================================================
          PAGE HERO
      ====================================================== */}

      <section className="bg-[#00224A] px-4 py-16 mt-20 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-3xl text-center">
            {/* Heading */}
            <h1
              className="
          text-3xl
          font-semibold
          leading-[1.2]
          tracking-tight
          text-white
          sm:text-4xl
          md:text-5xl
          lg:text-[48px]
        "
            >
              Find the Right Service
              <br className="hidden sm:block" />
              <span className="text-[#EC620B]"> for Your Home</span>
            </h1>

            {/* Description */}
            <p
              className="
          mx-auto
          mt-5
          max-w-2xl
          text-sm
          leading-7
          text-white/65
          sm:text-base
        "
            >
              From plumbing and electrical work to cleaning, painting, and
              repairs, find trusted professionals for every home service you
              need.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES CONTENT
      ====================================================== */}

      <section className="px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px]">
          {/* Search Bar */}

          <div className="mx-auto mb-6 max-w-3xl">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search for plumbing, cleaning, electrical..."
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-12
                  pr-12
                  text-sm
                  text-[#00224A]
                  shadow-sm
                  outline-none
                  transition-all
                  placeholder:text-slate-400
                  focus:border-[#EC620B]
                  focus:ring-4
                  focus:ring-[#EC620B]/10
                  sm:text-base
                "
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-[#EC620B]"
                  aria-label="Clear search"
                >
                  <X size={19} />
                </button>
              )}
            </div>
          </div>

          {/* =====================================================
              ADVANCED FILTER BAR
          ====================================================== */}

          <div className="mb-12 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-[#EC620B]" />

                <h2 className="font-semibold text-[#00224A]">
                  Filter Services
                </h2>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#EC620B] transition-colors hover:text-[#C8520A]"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {/* Service Type */}

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-500">
                  Service Type
                </label>

                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(event) =>
                      setSelectedCategory(event.target.value)
                    }
                    className="
                      h-11
                      w-full
                      appearance-none
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-3
                      text-sm
                      text-[#00224A]
                      outline-none
                      transition-colors
                      focus:border-[#EC620B]
                    "
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Location */}

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-500">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={selectedLocation}
                    onChange={(event) =>
                      setSelectedLocation(event.target.value)
                    }
                    className="
                      h-11
                      w-full
                      appearance-none
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      pl-9
                      pr-8
                      text-sm
                      text-[#00224A]
                      outline-none
                      transition-colors
                      focus:border-[#EC620B]
                    "
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location === "all" ? "All Locations" : location}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Rating */}

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-500">
                  Minimum Rating
                </label>

                <div className="relative">
                  <Star
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 fill-[#EC620B] text-[#EC620B]"
                  />

                  <select
                    value={selectedRating}
                    onChange={(event) =>
                      setSelectedRating(Number(event.target.value))
                    }
                    className="
                      h-11
                      w-full
                      appearance-none
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      pl-9
                      pr-8
                      text-sm
                      text-[#00224A]
                      outline-none
                      transition-colors
                      focus:border-[#EC620B]
                    "
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4.5}>4.5 & Above</option>
                    <option value={4}>4.0 & Above</option>
                    <option value={3}>3.0 & Above</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Minimum Price */}

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-500">
                  Minimum Price
                </label>

                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  placeholder="৳ Min"
                  className="
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    text-sm
                    text-[#00224A]
                    outline-none
                    transition-colors
                    placeholder:text-slate-400
                    focus:border-[#EC620B]
                  "
                />
              </div>

              {/* Maximum Price */}

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-500">
                  Maximum Price
                </label>

                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="৳ Max"
                  className="
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    text-sm
                    text-[#00224A]
                    outline-none
                    transition-colors
                    placeholder:text-slate-400
                    focus:border-[#EC620B]
                  "
                />
              </div>
            </div>
          </div>

          {/* Section Heading */}

          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#EC620B]" />

                <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#EC620B]">
                  Available Services
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-[#00224A] sm:text-3xl">
                Explore Our Services
              </h2>
            </div>

            {!isLoading && (
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-[#00224A]">
                  {filteredServices.length}
                </span>{" "}
                {filteredServices.length === 1 ? "service" : "services"}
              </p>
            )}
          </div>

          {/* Loading State */}

          {isLoading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="h-52 bg-slate-200" />

                  <div className="space-y-3 p-5">
                    <div className="h-3 w-20 rounded bg-slate-200" />
                    <div className="h-5 w-3/4 rounded bg-slate-200" />
                    <div className="h-3 w-full rounded bg-slate-200" />
                    <div className="h-3 w-5/6 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Service Cards */}

          {!isLoading && filteredServices.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredServices.map((service) => (
                <article
                  key={service.id}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-[#EC620B]/30
                    hover:shadow-[0_16px_35px_rgba(0,34,74,0.08)]
                  "
                >
                  {/* Image */}

                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#00224A]/40 via-transparent to-transparent" />

                    <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[#00224A] shadow-sm">
                      {service.category.name}
                    </div>
                  </div>

                  {/* Content */}

                  <div className="flex min-h-[250px] flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1">
                        <Star
                          size={16}
                          fill="#EC620B"
                          className="text-[#EC620B]"
                        />

                        <span className="text-sm font-semibold text-[#00224A]">
                          {service.rating}
                        </span>

                        <span className="text-xs text-slate-400">
                          ({service.reviewCount})
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin size={14} />
                        {service.location}
                      </div>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-[#00224A]">
                      {service.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
                      {service.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div>
                        <span className="block text-xs text-slate-400">
                          Starting from
                        </span>

                        <span className="text-base font-semibold text-[#00224A]">
                          ${service.startingPrice}
                        </span>
                      </div>

                      <Link
                        href={`/services/${service.id}`}
                        className="
                          group/link
                          flex
                          items-center
                          gap-1
                          text-sm
                          font-semibold
                          text-[#EC620B]
                          transition-all
                          hover:gap-2
                        "
                      >
                        View Details
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover/link:rotate-45"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Empty State */}

          {!isLoading && filteredServices.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EC620B]/10">
                <Search size={25} className="text-[#EC620B]" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#00224A]">
                No Services Found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                Try changing your search or filters to find the service
                you&apos;re looking for.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="
                  mt-6
                  rounded-md
                  bg-[#00224A]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition-colors
                  hover:bg-[#00346F]
                "
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
