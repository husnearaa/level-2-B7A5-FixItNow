"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
  Search,
  UserRound,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";



import {
  useGetTechnicianAvailabilityQuery,
} from "@/redux/api/availabilityApi";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { useGetAllTechniciansQuery } from "@/redux/api/technicianApi";
import { useCancelBookingMutation, useCreateBookingMutation, useGetMyBookingsQuery } from "@/redux/api/bookingApi";

// =====================================================
// Types
// =====================================================

type Service = {
  id: string;
  technicianId: string;
  categoryId: string;
  name: string;
  description: string;
  price: string;
  location: string;
  category?: {
    id: string;
    name: string;
    description: string;
  };
  technician?: Technician;
};

type TechnicianUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image?: string | null;
};

type Technician = {
  id: string;
  userId: string;
  bio: string;
  experience: number;
  skills: string[];
  location: string;
  hourlyRate: string;
  averageRating: number;
  totalReviews: number;
  isVerified: boolean;
  user: TechnicianUser;
};

type Availability = {
  id: string;
  technicianId: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: string;
};

type BookingStatus =
  | "REQUESTED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED";

type Booking = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  availabilityId: string;
  totalAmount: string;
  scheduledAt: string;
  customerNote?: string | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;

  service?: {
    id: string;
    name: string;
    description?: string;
    price: string;
    location: string;
    category?: {
      id: string;
      name: string;
    };
  };

  technician?: {
    id: string;
    user?: {
      id: string;
      name: string;
      email?: string;
      phone?: string;
      address?: string;
    };
    experience?: number;
    location?: string;
    hourlyRate?: string;
    averageRating?: number;
    isVerified?: boolean;
  };

  availability?: Availability;

  payment?: unknown;
  review?: unknown;
};

// =====================================================
// API Response Types
// =====================================================

type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

// =====================================================
// Helpers
// =====================================================

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// =====================================================
// Component
// =====================================================

export default function ServicesBookingsPage() {
  // ===================================================
  // API
  // ===================================================

  const {
    data: servicesResponse,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useGetAllServiceQuery({});

  const {
    data: techniciansResponse,
    isLoading: techniciansLoading,
    isError: techniciansError,
  } = useGetAllTechniciansQuery({});

  const {
    data: bookingsResponse,
    isLoading: bookingsLoading,
    isError: bookingsError,
  } = useGetMyBookingsQuery({});

  const [createBooking, { isLoading: creatingBooking }] =
    useCreateBookingMutation();

  const [cancelBooking, { isLoading: cancellingBooking }] =
    useCancelBookingMutation();

  // ===================================================
  // State
  // ===================================================

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);

  const [selectedAvailability, setSelectedAvailability] =
    useState<Availability | null>(null);

  const [selectedDate, setSelectedDate] = useState("");

  const [location, setLocation] = useState("");

  const [customerNote, setCustomerNote] = useState("");

  const [search, setSearch] = useState("");

  const [bookingMessage, setBookingMessage] = useState("");

  // ===================================================
  // Extract API data
  // ===================================================

  const services: Service[] =
    (servicesResponse as ApiResponse<Service[]> | undefined)?.data ?? [];

  const technicians: Technician[] =
    (
      techniciansResponse as
        | ApiResponse<Technician[]>
        | undefined
    )?.data ?? [];

  const bookings: Booking[] =
    (
      bookingsResponse as
        | ApiResponse<Booking[]>
        | undefined
    )?.data ?? [];

  // ===================================================
  // Get availability for selected technician
  // ===================================================

  const {
    data: availabilityResponse,
    isLoading: availabilityLoading,
    isError: availabilityError,
  } = useGetTechnicianAvailabilityQuery(
    {
      id: selectedTechnician?.id ?? "",
    },
    {
      skip: !selectedTechnician,
    },
  );

  const availabilities: Availability[] =
    (
      availabilityResponse as
        | ApiResponse<Availability[]>
        | undefined
    )?.data ?? [];

  // ===================================================
  // Filter available dates
  // ===================================================

  const availableDates = useMemo(() => {
    return availabilities
      .filter((item) => !item.isBooked)
      .map((item) => formatDateForInput(item.startTime));
  }, [availabilities]);

  // ===================================================
  // Filter technicians by selected service
  // ===================================================

  const filteredTechnicians = useMemo(() => {
    if (!selectedService) {
      return [];
    }

    return technicians.filter((technician) => {
      const matchesService =
        technician.id === selectedService.technicianId;

      const matchesSearch =
        technician.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        technician.location
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return matchesService && matchesSearch;
    });
  }, [technicians, selectedService, search]);

  // ===================================================
  // Handle service selection
  // ===================================================

  const handleSelectService = (service: Service) => {
    setSelectedService(service);

    const technician = technicians.find(
      (item) => item.id === service.technicianId,
    );

    setSelectedTechnician(technician ?? null);

    setSelectedAvailability(null);
    setSelectedDate("");
    setSearch("");
    setBookingMessage("");
  };

  // ===================================================
  // Handle technician selection
  // ===================================================

  const handleSelectTechnician = (technician: Technician) => {
    setSelectedTechnician(technician);
    setSelectedAvailability(null);
    setSelectedDate("");
    setBookingMessage("");
  };

  // ===================================================
  // Handle date selection
  // ===================================================

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedAvailability(null);

    const matchingSlot = availabilities.find(
      (availability) =>
        !availability.isBooked &&
        formatDateForInput(availability.startTime) === date,
    );

    if (matchingSlot) {
      setSelectedAvailability(matchingSlot);
    }
  };

  // ===================================================
  // Confirm booking
  // ===================================================

  const handleConfirmBooking = async () => {
    if (!selectedService) {
      setBookingMessage("Please select a service.");
      return;
    }

    if (!selectedTechnician) {
      setBookingMessage("Please select a technician.");
      return;
    }

    if (!selectedAvailability) {
      setBookingMessage("Please select an available time slot.");
      return;
    }

    if (!location.trim()) {
      setBookingMessage("Please enter your service location.");
      return;
    }

    try {
      const bookingData = {
        technicianId: selectedTechnician.id,
        serviceId: selectedService.id,
        availabilityId: selectedAvailability.id,
        scheduledAt: selectedAvailability.startTime,
        customerNote: customerNote.trim(),
      };

      await createBooking(bookingData).unwrap();

      setBookingMessage(
        "Booking request submitted successfully.",
      );

      setSelectedService(null);
      setSelectedTechnician(null);
      setSelectedAvailability(null);
      setSelectedDate("");
      setLocation("");
      setCustomerNote("");
      setSearch("");
    } catch (error) {
      console.error("Booking error:", error);

      setBookingMessage(
        "Failed to create booking. Please try again.",
      );
    }
  };

  // ===================================================
  // Cancel booking
  // ===================================================

  const handleCancelBooking = async (id: string) => {
    try {
      await cancelBooking({ id }).unwrap();
    } catch (error) {
      console.error("Cancel booking error:", error);
    }
  };

  // ===================================================
  // Status class
  // ===================================================

  const getStatusClass = (status: BookingStatus) => {
    switch (status) {
      case "REQUESTED":
        return "bg-[#EC620B]/10 text-[#EC620B]";

      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "COMPLETED":
        return "bg-purple-100 text-purple-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ===================================================
  // Status icon
  // ===================================================

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case "REQUESTED":
        return <Clock3 className="h-3 w-3" />;

      case "CONFIRMED":
        return <CheckCircle2 className="h-3 w-3" />;

      case "IN_PROGRESS":
        return <Clock3 className="h-3 w-3" />;

      case "COMPLETED":
        return <CheckCircle2 className="h-3 w-3" />;

      case "CANCELLED":
      case "REJECTED":
        return <XCircle className="h-3 w-3" />;

      default:
        return null;
    }
  };

  // ===================================================
  // Cancel eligibility
  // ===================================================

  const canCancel = (status: BookingStatus) => {
    return (
      status === "REQUESTED" ||
      status === "CONFIRMED"
    );
  };

  // ===================================================
  // Loading
  // ===================================================

  if (servicesLoading || techniciansLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-[#00224A]">
          <Loader2 className="h-5 w-5 animate-spin text-[#EC620B]" />
          <span className="text-sm font-medium">
            Loading services...
          </span>
        </div>
      </div>
    );
  }

  // ===================================================
  // API Error
  // ===================================================

  if (servicesError || techniciansError) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          Failed to load services or technicians.
          Please refresh the page and try again.
        </div>
      </div>
    );
  }

  // ===================================================
  // Render
  // ===================================================

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden px-4 py-6 md:px-6 lg:px-8">
      {/* =================================================
          Header
      ================================================= */}

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#00224A] md:text-3xl">
          Services & Bookings
        </h1>

        <p className="mt-1 text-sm text-[#00224A]/60">
          Find a trusted technician and manage your home
          service bookings.
        </p>
      </div>

      {/* =================================================
          Book a Service
      ================================================= */}

      <div className="mb-8 overflow-hidden rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        {/* Header */}

        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-semibold text-[#00224A]">
            Book a Service
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Select a service, choose a technician, and
            schedule your service.
          </p>
        </div>

        <div className="p-5">
          {/* =================================================
              STEP 1
          ================================================= */}

          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EC620B] text-sm font-bold text-white">
                1
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#00224A]">
                  Select a Service
                </h3>

                <p className="text-xs text-[#00224A]/50">
                  What service do you need?
                </p>
              </div>
            </div>

            {/* Services */}

            {services.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#00224A]/15 py-8 text-center">
                <p className="text-sm font-semibold text-[#00224A]">
                  No services available
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => {
                  const isSelected =
                    selectedService?.id === service.id;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() =>
                        handleSelectService(service)
                      }
                      className={`rounded-xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-[#EC620B] bg-[#EC620B]/5 ring-1 ring-[#EC620B]"
                          : "border-[#00224A]/10 hover:border-[#EC620B]/50 hover:bg-[#EC620B]/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-[#00224A]">
                            {service.name}
                          </h4>

                          <p className="mt-1 text-xs text-[#00224A]/50">
                            {service.category?.name ??
                              "Home Service"}
                          </p>
                        </div>

                        {isSelected && (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#EC620B]" />
                        )}
                      </div>

                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#00224A]/60">
                        {service.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#EC620B]">
                          ৳{Number(service.price).toLocaleString()}
                        </span>

                        <span className="flex items-center gap-1 text-xs text-[#00224A]/50">
                          <MapPin className="h-3.5 w-3.5" />
                          {service.location}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* =================================================
              STEP 2
          ================================================= */}

          {selectedService && (
            <div className="mt-8 border-t border-[#00224A]/10 pt-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EC620B] text-sm font-bold text-white">
                  2
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#00224A]">
                    Choose a Technician
                  </h3>

                  <p className="text-xs text-[#00224A]/50">
                    Select a qualified technician for{" "}
                    {selectedService.name}.
                  </p>
                </div>
              </div>

              {/* Search */}

              <div className="relative mb-4 w-full md:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search technician..."
                  className="h-10 w-full rounded-lg border border-[#00224A]/15 bg-white pl-9 pr-3 text-sm text-[#00224A] outline-none placeholder:text-[#00224A]/40 focus:border-[#EC620B]"
                />
              </div>

              {/* Technicians */}

              {filteredTechnicians.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#00224A]/15 py-8 text-center">
                  <UserRound className="mx-auto h-8 w-8 text-[#00224A]/20" />

                  <p className="mt-2 text-sm font-semibold text-[#00224A]">
                    No technicians found
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredTechnicians.map((technician) => {
                    const isSelected =
                      selectedTechnician?.id ===
                      technician.id;

                    return (
                      <button
                        key={technician.id}
                        type="button"
                        onClick={() =>
                          handleSelectTechnician(
                            technician,
                          )
                        }
                        className={`rounded-xl border p-4 text-left transition-all ${
                          isSelected
                            ? "border-[#EC620B] bg-[#EC620B]/5 ring-1 ring-[#EC620B]"
                            : "border-[#00224A]/10 hover:border-[#EC620B]/50 hover:bg-[#EC620B]/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#00224A] text-white">
                            {technician.user?.image ? (
                              <img
                                src={technician.user.image}
                                alt={
                                  technician.user.name
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <UserRound className="h-6 w-6" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="truncate text-sm font-bold text-[#00224A]">
                                {technician.user?.name}
                              </h4>

                              {isSelected && (
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#EC620B]" />
                              )}
                            </div>

                            <p className="mt-1 text-xs text-[#00224A]/50">
                              {technician.experience} years
                              experience
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm font-semibold text-[#EC620B]">
                            ৳
                            {Number(
                              technician.hourlyRate,
                            ).toLocaleString()}
                            /hr
                          </span>

                          <span className="text-sm font-medium text-[#00224A]">
                            ★{" "}
                            {technician.averageRating ??
                              0}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#00224A]/50">
                          <MapPin className="h-3.5 w-3.5" />
                          {technician.location}
                        </div>

                        {technician.isVerified && (
                          <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* =================================================
              STEP 3
          ================================================= */}

          {selectedTechnician && selectedService && (
            <div className="mt-8 border-t border-[#00224A]/10 pt-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EC620B] text-sm font-bold text-white">
                  3
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#00224A]">
                    Schedule Your Service
                  </h3>

                  <p className="text-xs text-[#00224A]/50">
                    Choose an available date and time.
                  </p>
                </div>
              </div>

              {/* Availability loading */}

              {availabilityLoading && (
                <div className="flex items-center gap-2 rounded-lg bg-[#00224A]/5 p-4 text-sm text-[#00224A]">
                  <Loader2 className="h-4 w-4 animate-spin text-[#EC620B]" />
                  Loading available slots...
                </div>
              )}

              {availabilityError && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                  Failed to load technician availability.
                </div>
              )}

              {!availabilityLoading &&
                !availabilityError &&
                availabilities.length === 0 && (
                  <div className="rounded-xl border border-dashed border-[#00224A]/15 py-8 text-center">
                    <Clock3 className="mx-auto h-8 w-8 text-[#00224A]/20" />

                    <p className="mt-2 text-sm font-semibold text-[#00224A]">
                      No available slots
                    </p>

                    <p className="mt-1 text-xs text-[#00224A]/50">
                      This technician currently has no
                      available schedule.
                    </p>
                  </div>
                )}

              {!availabilityLoading &&
                availabilities.length > 0 && (
                  <>
                    {/* Date */}

                    <div className="mb-5">
                      <label
                        htmlFor="booking-date"
                        className="mb-2 block text-sm font-medium text-[#00224A]"
                      >
                        Service Date
                      </label>

                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

                        <input
                          id="booking-date"
                          type="date"
                          value={selectedDate}
                          onChange={(e) =>
                            handleDateChange(
                              e.target.value,
                            )
                          }
                          min={availableDates.sort()[0]}
                          className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none focus:border-[#EC620B] md:max-w-sm"
                        />
                      </div>
                    </div>

                    {/* Available Slots */}

                    <div>
                      <label className="mb-3 block text-sm font-medium text-[#00224A]">
                        Available Time
                      </label>

                      {selectedDate ? (
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                          {availabilities
                            .filter(
                              (availability) =>
                                !availability.isBooked &&
                                formatDateForInput(
                                  availability.startTime,
                                ) === selectedDate,
                            )
                            .map((availability) => {
                              const isSelected =
                                selectedAvailability?.id ===
                                availability.id;

                              return (
                                <button
                                  key={availability.id}
                                  type="button"
                                  onClick={() =>
                                    setSelectedAvailability(
                                      availability,
                                    )
                                  }
                                  className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors ${
                                    isSelected
                                      ? "border-[#EC620B] bg-[#EC620B] text-white"
                                      : "border-[#00224A]/15 text-[#00224A] hover:border-[#EC620B] hover:text-[#EC620B]"
                                  }`}
                                >
                                  <Clock3 className="h-3.5 w-3.5" />

                                  {formatTime(
                                    availability.startTime,
                                  )}
                                </button>
                              );
                            })}

                          {availabilities.filter(
                            (availability) =>
                              !availability.isBooked &&
                              formatDateForInput(
                                availability.startTime,
                              ) === selectedDate,
                          ).length === 0 && (
                            <p className="col-span-full rounded-lg bg-[#00224A]/5 p-4 text-xs text-[#00224A]/60">
                              No available time slots for
                              this date.
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="rounded-lg bg-[#00224A]/5 p-4 text-xs text-[#00224A]/60">
                          Select a date to see available
                          time slots.
                        </p>
                      )}
                    </div>

                    {/* Location */}

                    <div className="mt-5">
                      <label
                        htmlFor="booking-location"
                        className="mb-2 block text-sm font-medium text-[#00224A]"
                      >
                        Service Location
                      </label>

                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

                        <input
                          id="booking-location"
                          type="text"
                          value={location}
                          onChange={(e) =>
                            setLocation(e.target.value)
                          }
                          placeholder="Enter your service address"
                          className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none placeholder:text-[#00224A]/40 focus:border-[#EC620B]"
                        />
                      </div>
                    </div>

                    {/* Customer note */}

                    <div className="mt-5">
                      <label
                        htmlFor="customer-note"
                        className="mb-2 block text-sm font-medium text-[#00224A]"
                      >
                        Note for Technician
                        <span className="ml-1 text-xs font-normal text-[#00224A]/40">
                          (optional)
                        </span>
                      </label>

                      <textarea
                        id="customer-note"
                        value={customerNote}
                        onChange={(e) =>
                          setCustomerNote(e.target.value)
                        }
                        placeholder="Tell the technician anything they should know..."
                        rows={3}
                        className="w-full resize-none rounded-lg border border-[#00224A]/15 bg-white px-3 py-3 text-sm text-[#00224A] outline-none placeholder:text-[#00224A]/40 focus:border-[#EC620B]"
                      />
                    </div>

                    {/* Confirmation */}

                    <div className="mt-6 rounded-xl bg-[#00224A]/5 p-5">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                          <p className="text-xs font-medium text-[#00224A]/50">
                            Selected Technician
                          </p>

                          <p className="mt-1 text-sm font-bold text-[#00224A]">
                            {selectedTechnician.user?.name}
                          </p>

                          <p className="mt-1 text-xs text-[#00224A]/60">
                            {selectedService.name} • ৳
                            {Number(
                              selectedService.price,
                            ).toLocaleString()}
                          </p>

                          {selectedAvailability && (
                            <p className="mt-1 text-xs text-[#00224A]/60">
                              {formatDate(
                                selectedAvailability.startTime,
                              )}{" "}
                              •{" "}
                              {formatTime(
                                selectedAvailability.startTime,
                              )}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          disabled={creatingBooking}
                          onClick={handleConfirmBooking}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d95708] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {creatingBooking ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Booking...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Confirm Booking
                            </>
                          )}
                        </button>
                      </div>

                      {bookingMessage && (
                        <div
                          className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                            bookingMessage.includes(
                              "successfully",
                            )
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {bookingMessage}
                        </div>
                      )}
                    </div>
                  </>
                )}
            </div>
          )}
        </div>
      </div>

      {/* =================================================
          My Bookings
      ================================================= */}

      <div className="w-full max-w-full overflow-hidden rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            My Bookings
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Track your upcoming and previous service
            bookings.
          </p>
        </div>

        {/* Loading */}

        {bookingsLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-sm text-[#00224A]">
              <Loader2 className="h-4 w-4 animate-spin text-[#EC620B]" />
              Loading your bookings...
            </div>
          </div>
        )}

        {/* Error */}

        {bookingsError && (
          <div className="p-5">
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
              Failed to load your bookings.
            </div>
          </div>
        )}

        {/* Empty */}

        {!bookingsLoading &&
          !bookingsError &&
          bookings.length === 0 && (
            <div className="py-12 text-center">
              <CalendarDays className="mx-auto h-10 w-10 text-[#00224A]/20" />

              <p className="mt-3 text-sm font-semibold text-[#00224A]">
                No bookings yet
              </p>

              <p className="mt-1 text-xs text-[#00224A]/50">
                Your service bookings will appear here.
              </p>
            </div>
          )}

        {/* =================================================
            Mobile Cards
        ================================================= */}

        {!bookingsLoading &&
          !bookingsError &&
          bookings.length > 0 && (
            <div className="space-y-3 p-4 md:hidden">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl border border-[#00224A]/10 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#00224A]">
                        {booking.service?.name ??
                          "Service"}
                      </p>

                      <p className="mt-1 text-xs text-[#00224A]/50">
                        #{booking.id.slice(0, 8)}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClass(
                        booking.status,
                      )}`}
                    >
                      {booking.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#00224A]/60">
                      <UserRound className="h-3.5 w-3.5" />

                      {booking.technician?.user?.name ??
                        "Technician"}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#00224A]/60">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {formatDate(
                        booking.scheduledAt,
                      )}{" "}
                      •{" "}
                      {formatTime(
                        booking.scheduledAt,
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#00224A]/60">
                      <MapPin className="h-3.5 w-3.5" />

                      {booking.service?.location ??
                        booking.technician?.location ??
                        "Location not available"}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#00224A]/10 pt-4">
                    <span className="text-sm font-bold text-[#00224A]">
                      ৳
                      {Number(
                        booking.totalAmount,
                      ).toLocaleString()}
                    </span>

                    {canCancel(booking.status) ? (
                      <button
                        type="button"
                        disabled={cancellingBooking}
                        onClick={() =>
                          handleCancelBooking(
                            booking.id,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        {cancellingBooking ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5" />
                        )}

                        Cancel
                      </button>
                    ) : (
                      <span className="text-xs text-[#00224A]/40">
                        No action
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        {/* =================================================
            Desktop Table
        ================================================= */}

        {!bookingsLoading &&
          !bookingsError &&
          bookings.length > 0 && (
            <div className="hidden w-full md:block">
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-[#00224A]/10 bg-[#00224A]/5">
                      <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                        Booking
                      </th>

                      <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                        Service
                      </th>

                      <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                        Technician
                      </th>

                      <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                        Date & Time
                      </th>

                      <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                        Status
                      </th>

                      <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-[#00224A]/10 last:border-b-0 hover:bg-[#EC620B]/5"
                      >
                        {/* Booking */}

                        <td className="whitespace-nowrap px-5 py-4">
                          <p className="text-sm font-semibold text-[#00224A]">
                            #{booking.id.slice(0, 8)}
                          </p>

                          <p className="mt-1 text-xs text-[#00224A]/50">
                            ৳
                            {Number(
                              booking.totalAmount,
                            ).toLocaleString()}
                          </p>
                        </td>

                        {/* Service */}

                        <td className="whitespace-nowrap px-5 py-4">
                          <p className="text-sm text-[#00224A]">
                            {booking.service?.name ??
                              "Service"}
                          </p>

                          <p className="mt-1 text-xs text-[#00224A]/50">
                            {booking.service?.category
                              ?.name ?? ""}
                          </p>
                        </td>

                        {/* Technician */}

                        <td className="whitespace-nowrap px-5 py-4">
                          <p className="text-sm text-[#00224A]">
                            {booking.technician?.user
                              ?.name ?? "Technician"}
                          </p>

                          <p className="mt-1 text-xs text-[#00224A]/50">
                            {booking.technician
                              ?.location ?? ""}
                          </p>
                        </td>

                        {/* Date */}

                        <td className="whitespace-nowrap px-5 py-4">
                          <p className="text-sm font-medium text-[#00224A]">
                            {formatDate(
                              booking.scheduledAt,
                            )}
                          </p>

                          <p className="mt-1 text-xs text-[#00224A]/50">
                            {formatTime(
                              booking.scheduledAt,
                            )}
                          </p>
                        </td>

                        {/* Status */}

                        <td className="whitespace-nowrap px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                              booking.status,
                            )}`}
                          >
                            {getStatusIcon(
                              booking.status,
                            )}

                            {booking.status.replace(
                              "_",
                              " ",
                            )}
                          </span>
                        </td>

                        {/* Action */}

                        <td className="whitespace-nowrap px-5 py-4">
                          {canCancel(
                            booking.status,
                          ) ? (
                            <button
                              type="button"
                              disabled={
                                cancellingBooking
                              }
                              onClick={() =>
                                handleCancelBooking(
                                  booking.id,
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                            >
                              {cancellingBooking ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <XCircle className="h-3.5 w-3.5" />
                              )}

                              Cancel
                            </button>
                          ) : (
                            <span className="text-xs text-[#00224A]/40">
                              No action
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {/* Footer */}

        {!bookingsLoading &&
          !bookingsError &&
          bookings.length > 0 && (
            <div className="border-t border-[#00224A]/10 px-5 py-4">
              <p className="text-xs text-[#00224A]/50">
                Showing{" "}
                <span className="font-semibold text-[#00224A]">
                  {bookings.length}
                </span>{" "}
                bookings
              </p>
            </div>
          )}
      </div>
    </div>
  );
}