"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  UserRound,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

// =====================================================
// Types
// =====================================================

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type Service = {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: string;
};

type Technician = {
  id: number;
  name: string;
  service: string;
  experience: number;
  rating: number;
  price: number;
  location: string;
};

type Booking = {
  id: string;
  service: string;
  technician: string;
  date: string;
  time: string;
  location: string;
  amount: number;
  status: BookingStatus;
};

// =====================================================
// Services
// =====================================================

const services: Service[] = [
  {
    id: 1,
    name: "Home Cleaning",
    category: "Cleaning",
    price: 60,
    duration: "2-3 hours",
  },
  {
    id: 2,
    name: "Plumbing",
    category: "Repair",
    price: 80,
    duration: "1-2 hours",
  },
  {
    id: 3,
    name: "Electrical",
    category: "Repair",
    price: 90,
    duration: "1-2 hours",
  },
  {
    id: 4,
    name: "AC Repair",
    category: "Appliance",
    price: 100,
    duration: "2-3 hours",
  },
  {
    id: 5,
    name: "Painting",
    category: "Home Improvement",
    price: 120,
    duration: "4-6 hours",
  },
  {
    id: 6,
    name: "Carpentry",
    category: "Home Improvement",
    price: 95,
    duration: "2-4 hours",
  },
];

// =====================================================
// Technicians
// =====================================================

const technicians: Technician[] = [
  {
    id: 1,
    name: "James Wilson",
    service: "Home Cleaning",
    experience: 5,
    rating: 4.9,
    price: 80,
    location: "Brooklyn, NY",
  },
  {
    id: 2,
    name: "Robert Smith",
    service: "AC Repair",
    experience: 7,
    rating: 4.8,
    price: 120,
    location: "Queens, NY",
  },
  {
    id: 3,
    name: "Michael Brown",
    service: "Plumbing",
    experience: 6,
    rating: 4.7,
    price: 95,
    location: "Manhattan, NY",
  },
  {
    id: 4,
    name: "David Miller",
    service: "Electrical",
    experience: 8,
    rating: 4.9,
    price: 110,
    location: "Bronx, NY",
  },
  {
    id: 5,
    name: "Daniel Johnson",
    service: "Painting",
    experience: 5,
    rating: 4.6,
    price: 130,
    location: "Brooklyn, NY",
  },
  {
    id: 6,
    name: "William Davis",
    service: "Carpentry",
    experience: 9,
    rating: 4.8,
    price: 105,
    location: "Queens, NY",
  },
];

// =====================================================
// Initial Bookings
// =====================================================

const initialBookings: Booking[] = [
  {
    id: "#BK-1024",
    service: "Home Cleaning",
    technician: "James Wilson",
    date: "Aug 28, 2026",
    time: "10:00 AM",
    location: "Brooklyn, NY",
    amount: 80,
    status: "CONFIRMED",
  },
  {
    id: "#BK-1023",
    service: "AC Repair",
    technician: "Robert Smith",
    date: "Aug 30, 2026",
    time: "02:30 PM",
    location: "Queens, NY",
    amount: 120,
    status: "PENDING",
  },
  {
    id: "#BK-1022",
    service: "Plumbing",
    technician: "Michael Brown",
    date: "Sep 02, 2026",
    time: "11:00 AM",
    location: "Manhattan, NY",
    amount: 95,
    status: "COMPLETED",
  },
];

// =====================================================
// Time Slots
// =====================================================

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

// =====================================================
// Component
// =====================================================

export default function ServicesBookingsPage() {
  const [bookings, setBookings] =
    useState<Booking[]>(initialBookings);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [location, setLocation] = useState("Brooklyn, NY");
  const [search, setSearch] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");

  // ===================================================
  // Filter technicians
  // ===================================================

  const filteredTechnicians = useMemo(() => {
    if (!selectedService) {
      return [];
    }

    return technicians.filter(
      (technician) =>
        technician.service === selectedService.name &&
        technician.name
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  }, [selectedService, search]);

  // ===================================================
  // Select Service
  // ===================================================

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setSelectedTechnician(null);
    setSelectedDate("");
    setSelectedTime("");
    setBookingMessage("");
    setSearch("");
  };

  // ===================================================
  // Confirm Booking
  // ===================================================

  const handleConfirmBooking = () => {
    if (
      !selectedService ||
      !selectedTechnician ||
      !selectedDate ||
      !selectedTime ||
      !location.trim()
    ) {
      setBookingMessage(
        "Please complete all booking details.",
      );
      return;
    }

    const newBooking: Booking = {
      id: `#BK-${1025 + bookings.length}`,
      service: selectedService.name,
      technician: selectedTechnician.name,
      date: selectedDate,
      time: selectedTime,
      location,
      amount: selectedTechnician.price,
      status: "PENDING",
    };

    setBookings((current) => [newBooking, ...current]);

    setBookingMessage(
      "Booking request submitted successfully. Waiting for technician confirmation.",
    );

    setSelectedService(null);
    setSelectedTechnician(null);
    setSelectedDate("");
    setSelectedTime("");
    setSearch("");
  };

  // ===================================================
  // Cancel Booking
  // ===================================================

  const handleCancelBooking = (id: string) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status: "CANCELLED",
            }
          : booking,
      ),
    );
  };

  // ===================================================
  // Status Styles
  // ===================================================

  const getStatusClass = (status: BookingStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-[#EC620B]/10 text-[#EC620B]";

      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "COMPLETED":
        return "bg-purple-100 text-purple-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ===================================================
  // Cancel Eligibility
  // ===================================================

  const canCancel = (status: BookingStatus) =>
    status === "PENDING" || status === "CONFIRMED";

  // ===================================================
  // Render
  // ===================================================

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden px-4 py-6 md:px-6 lg:px-8">
      {/* ================================================
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

      {/* ================================================
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
          {/* ==========================================
              STEP 1 — SERVICE
          =========================================== */}

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
                      <div>
                        <h4 className="text-sm font-semibold text-[#00224A]">
                          {service.name}
                        </h4>

                        <p className="mt-1 text-xs text-[#00224A]/50">
                          {service.category}
                        </p>
                      </div>

                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#EC620B]" />
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#EC620B]">
                        From ${service.price}
                      </span>

                      <span className="text-xs text-[#00224A]/50">
                        {service.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==========================================
              STEP 2 — TECHNICIAN
          =========================================== */}

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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredTechnicians.map((technician) => {
                  const isSelected =
                    selectedTechnician?.id === technician.id;

                  return (
                    <button
                      key={technician.id}
                      type="button"
                      onClick={() =>
                        setSelectedTechnician(technician)
                      }
                      className={`rounded-xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-[#EC620B] bg-[#EC620B]/5 ring-1 ring-[#EC620B]"
                          : "border-[#00224A]/10 hover:border-[#EC620B]/50 hover:bg-[#EC620B]/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00224A] text-white">
                          <UserRound className="h-6 w-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="truncate text-sm font-bold text-[#00224A]">
                              {technician.name}
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
                          ${technician.price}/hr
                        </span>

                        <span className="text-sm font-medium text-[#00224A]">
                          ★ {technician.rating}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-[#00224A]/50">
                        <MapPin className="h-3.5 w-3.5" />
                        {technician.location}
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredTechnicians.length === 0 && (
                <div className="rounded-xl border border-dashed border-[#00224A]/15 py-8 text-center">
                  <UserRound className="mx-auto h-8 w-8 text-[#00224A]/20" />

                  <p className="mt-2 text-sm font-semibold text-[#00224A]">
                    No technicians found
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              STEP 3 — SCHEDULE
          =========================================== */}

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
                    Choose a convenient date and time.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Date */}

                <div>
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
                        setSelectedDate(e.target.value)
                      }
                      min="2026-08-25"
                      className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none focus:border-[#EC620B]"
                    />
                  </div>
                </div>

                {/* Location */}

                <div>
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
                      placeholder="Enter your address"
                      className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none placeholder:text-[#00224A]/40 focus:border-[#EC620B]"
                    />
                  </div>
                </div>
              </div>

              {/* Time */}

              <div className="mt-5">
                <label className="mb-3 block text-sm font-medium text-[#00224A]">
                  Available Time
                </label>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
                  {timeSlots.map((time) => {
                    const isSelected =
                      selectedTime === time;

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() =>
                          setSelectedTime(time)
                        }
                        className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors ${
                          isSelected
                            ? "border-[#EC620B] bg-[#EC620B] text-white"
                            : "border-[#00224A]/15 text-[#00224A] hover:border-[#EC620B] hover:text-[#EC620B]"
                        }`}
                      >
                        <Clock3 className="h-3.5 w-3.5" />
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confirmation */}

              <div className="mt-6 rounded-xl bg-[#00224A]/5 p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <p className="text-xs font-medium text-[#00224A]/50">
                      Selected Technician
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#00224A]">
                      {selectedTechnician.name}
                    </p>

                    <p className="mt-1 text-xs text-[#00224A]/60">
                      {selectedService.name} • $
                      {selectedTechnician.price}/hr
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d95708]"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Confirm Booking
                  </button>
                </div>

                {bookingMessage && (
                  <div
                    className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                      bookingMessage.includes("successfully")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {bookingMessage}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================================================
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

        {/* ============================================
            Mobile Cards
        ============================================= */}

        <div className="space-y-3 p-4 md:hidden">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-xl border border-[#00224A]/10 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#00224A]">
                    {booking.service}
                  </p>

                  <p className="mt-1 text-xs text-[#00224A]/50">
                    {booking.id}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClass(
                    booking.status,
                  )}`}
                >
                  {booking.status.replace("_", " ")}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#00224A]/60">
                  <UserRound className="h-3.5 w-3.5" />
                  {booking.technician}
                </div>

                <div className="flex items-center gap-2 text-xs text-[#00224A]/60">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {booking.date} • {booking.time}
                </div>

                <div className="flex items-center gap-2 text-xs text-[#00224A]/60">
                  <MapPin className="h-3.5 w-3.5" />
                  {booking.location}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#00224A]/10 pt-4">
                <span className="text-sm font-bold text-[#00224A]">
                  ${booking.amount}
                </span>

                {canCancel(booking.status) && (
                  <button
                    type="button"
                    onClick={() =>
                      handleCancelBooking(booking.id)
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ============================================
            Desktop Table
        ============================================= */}

        <div className="hidden w-full md:block">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[850px]">
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
                        {booking.id}
                      </p>

                      <p className="mt-1 text-xs text-[#00224A]/50">
                        ${booking.amount}
                      </p>
                    </td>

                    {/* Service */}

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                      {booking.service}
                    </td>

                    {/* Technician */}

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                      {booking.technician}
                    </td>

                    {/* Date */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <p className="text-sm font-medium text-[#00224A]">
                        {booking.date}
                      </p>

                      <p className="mt-1 text-xs text-[#00224A]/50">
                        {booking.time}
                      </p>
                    </td>

                    {/* Status */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          booking.status,
                        )}`}
                      >
                        {booking.status ===
                          "CONFIRMED" && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}

                        {booking.status === "PENDING" && (
                          <Clock3 className="h-3 w-3" />
                        )}

                        {booking.status === "IN_PROGRESS" && (
                          <Clock3 className="h-3 w-3" />
                        )}

                        {booking.status ===
                          "COMPLETED" && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}

                        {booking.status ===
                          "CANCELLED" && (
                          <XCircle className="h-3 w-3" />
                        )}

                        {booking.status.replace("_", " ")}
                      </span>
                    </td>

                    {/* Action */}

                    <td className="whitespace-nowrap px-5 py-4">
                      {canCancel(booking.status) ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleCancelBooking(
                              booking.id,
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                        >
                          <XCircle className="h-3.5 w-3.5" />
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

        {/* Footer */}

        <div className="border-t border-[#00224A]/10 px-5 py-4">
          <p className="text-xs text-[#00224A]/50">
            Showing{" "}
            <span className="font-semibold text-[#00224A]">
              {bookings.length}
            </span>{" "}
            bookings
          </p>
        </div>
      </div>
    </div>
  );
}