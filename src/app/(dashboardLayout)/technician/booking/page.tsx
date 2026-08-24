"use client";

import {
  CheckCircle2,
  Clock3,
  Eye,
  MapPin,
  Search,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DECLINED";

type Booking = {
  id: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: BookingStatus;
};

const initialBookings: Booking[] = [
  {
    id: "#BK-1024",
    customer: "Sarah Ahmed",
    service: "Home Cleaning",
    date: "Aug 24, 2026",
    time: "10:00 AM",
    location: "Brooklyn, NY",
    status: "ACCEPTED",
  },
  {
    id: "#BK-1023",
    customer: "Emily Johnson",
    service: "Plumbing",
    date: "Aug 24, 2026",
    time: "02:30 PM",
    location: "Queens, NY",
    status: "IN_PROGRESS",
  },
  {
    id: "#BK-1022",
    customer: "Michael Brown",
    service: "Electrical",
    date: "Aug 25, 2026",
    time: "11:00 AM",
    location: "Manhattan, NY",
    status: "REQUESTED",
  },
  {
    id: "#BK-1021",
    customer: "Maria Khan",
    service: "AC Repair",
    date: "Aug 26, 2026",
    time: "04:00 PM",
    location: "Bronx, NY",
    status: "REQUESTED",
  },
  {
    id: "#BK-1020",
    customer: "David Miller",
    service: "Plumbing",
    date: "Aug 27, 2026",
    time: "09:30 AM",
    location: "Brooklyn, NY",
    status: "COMPLETED",
  },
];

const statusOptions = [
  "ALL",
  "REQUESTED",
  "ACCEPTED",
  "IN_PROGRESS",
  "COMPLETED",
  "DECLINED",
] as const;

export default function TechnicianBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        booking.customer.toLowerCase().includes(searchValue) ||
        booking.service.toLowerCase().includes(searchValue) ||
        booking.id.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking,
      ),
    );
  };

  const getStatusClass = (status: BookingStatus) => {
    switch (status) {
      case "REQUESTED":
        return "bg-[#EC620B] text-white";
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      case "IN_PROGRESS":
        return "bg-[#EC620B]/10 text-[#EC620B]";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700";
      case "DECLINED":
        return "bg-red-100 text-red-700";
    }
  };

  const formatStatus = (status: BookingStatus) => {
    return status.replace("_", " ");
  };

  const getActionButtons = (booking: Booking) => {
    if (booking.status === "REQUESTED") {
      return (
        <>
          <button
            type="button"
            onClick={() => updateBookingStatus(booking.id, "ACCEPTED")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#EC620B] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d95708]"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Accept
          </button>

          <button
            type="button"
            onClick={() => updateBookingStatus(booking.id, "DECLINED")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            <XCircle className="h-3.5 w-3.5" />
            Decline
          </button>
        </>
      );
    }

    if (booking.status === "ACCEPTED") {
      return (
        <button
          type="button"
          onClick={() => updateBookingStatus(booking.id, "IN_PROGRESS")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#EC620B] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d95708]"
        >
          <Clock3 className="h-3.5 w-3.5" />
          Start Job
        </button>
      );
    }

    if (booking.status === "IN_PROGRESS") {
      return (
        <button
          type="button"
          onClick={() => updateBookingStatus(booking.id, "COMPLETED")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#EC620B] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d95708]"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Complete
        </button>
      );
    }

    return (
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#00224A]/15 px-3 py-2 text-xs font-semibold text-[#00224A] transition-colors hover:border-[#EC620B] hover:text-[#EC620B]"
      >
        <Eye className="h-3.5 w-3.5" />
        View
      </button>
    );
  };

  return (
    <div className="min-h-screen w-full px-4 py-6 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#00224A] md:text-3xl">
          Booking Management
        </h1>
        <p className="mt-1 text-sm text-[#00224A]/60">
          Manage customer booking requests and your scheduled jobs.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#00224A]/60">
            Total Bookings
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
            {bookings.length}
          </h2>
        </div>

        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#00224A]/60">
            Pending Requests
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
            {
              bookings.filter((booking) => booking.status === "REQUESTED")
                .length
            }
          </h2>
        </div>

        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#00224A]/60">In Progress</p>
          <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
            {
              bookings.filter((booking) => booking.status === "IN_PROGRESS")
                .length
            }
          </h2>
        </div>

        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#00224A]/60">Completed</p>
          <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
            {
              bookings.filter((booking) => booking.status === "COMPLETED")
                .length
            }
          </h2>
        </div>
      </div>

      {/* Bookings */}
      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        {/* Section Header */}
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">All Bookings</h2>
          <p className="mt-1 text-sm text-[#00224A]/60">
            Review and manage your customer bookings.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-[#00224A]/10 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search bookings..."
              className="h-10 w-full rounded-lg border border-[#00224A]/15 bg-white pl-9 pr-3 text-sm text-[#00224A] outline-none transition-colors placeholder:text-[#00224A]/40 focus:border-[#EC620B]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 w-full rounded-lg border border-[#00224A]/15 bg-white px-3 text-sm font-medium text-[#00224A] outline-none focus:border-[#EC620B] md:w-48"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === "ALL"
                  ? "All Status"
                  : status.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-[#00224A]/10 bg-[#00224A]/5">
                <th className="w-[11%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Booking
                </th>
                <th className="w-[14%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Customer
                </th>
                <th className="w-[13%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Service
                </th>
                <th className="w-[15%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Date & Time
                </th>
                <th className="w-[14%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Location
                </th>
                <th className="w-[13%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Status
                </th>
                <th className="w-[20%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-[#00224A]/10 last:border-b-0 hover:bg-[#EC620B]/5"
                  >
                    <td className="truncate px-3 py-4 text-sm font-semibold text-[#00224A]">
                      {booking.id}
                    </td>
                    <td className="truncate px-3 py-4 text-sm text-[#00224A]">
                      {booking.customer}
                    </td>
                    <td className="truncate px-3 py-4 text-sm text-[#00224A]">
                      {booking.service}
                    </td>
                    <td className="px-3 py-4">
                      <p className="truncate text-sm font-medium text-[#00224A]">
                        {booking.date}
                      </p>
                      <p className="mt-1 text-xs text-[#00224A]/50">
                        {booking.time}
                      </p>
                    </td>
                    <td className="truncate px-3 py-4 text-sm text-[#00224A]">
                      {booking.location}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                          booking.status,
                        )}`}
                      >
                        {formatStatus(booking.status)}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex flex-wrap gap-2">
                        {getActionButtons(booking)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <Search className="mx-auto h-8 w-8 text-[#00224A]/30" />
                    <p className="mt-3 text-sm font-semibold text-[#00224A]">
                      No bookings found
                    </p>
                    <p className="mt-1 text-xs text-[#00224A]/50">
                      Try changing your search or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Cards */}
        <div className="divide-y divide-[#00224A]/10 lg:hidden">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="space-y-4 p-5 transition-colors hover:bg-[#EC620B]/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#00224A]">
                      {booking.customer}
                    </p>
                    <p className="mt-1 text-sm text-[#00224A]/60">
                      {booking.service}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#EC620B]">
                      {booking.id}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                      booking.status,
                    )}`}
                  >
                    {formatStatus(booking.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-[#00224A]/50">Date & Time</p>
                    <p className="mt-1 text-sm font-medium text-[#00224A]">
                      {booking.date}
                    </p>
                    <p className="text-xs text-[#00224A]/60">
                      {booking.time}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#00224A]/50">Location</p>
                    <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#00224A]">
                      <MapPin className="h-4 w-4 shrink-0 text-[#EC620B]" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {getActionButtons(booking)}
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Search className="mx-auto h-8 w-8 text-[#00224A]/30" />
              <p className="mt-3 text-sm font-semibold text-[#00224A]">
                No bookings found
              </p>
              <p className="mt-1 text-xs text-[#00224A]/50">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="border-t border-[#00224A]/10 px-5 py-4">
          <p className="text-xs text-[#00224A]/50">
            Showing{" "}
            <span className="font-semibold text-[#00224A]">
              {filteredBookings.length}
            </span>{" "}
            of{" "}
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