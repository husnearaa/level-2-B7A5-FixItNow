"use client";

import { useCancelBookingMutation, useGetTechnicianBookingsQuery, useUpdateBookingStatusMutation } from "@/redux/api/bookingApi";
import {
  CheckCircle2,
  Clock3,
  Eye,
  Loader2,
  MapPin,
  Search,
  User,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";


type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DECLINED"
  | "CANCELLED";

type Booking = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  availabilityId: string;
  totalAmount: string;
  scheduledAt: string;
  customerNote: string | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;

  service?: {
    id: string;
    name: string;
    description: string;
    price: string;
    location: string;
    category?: {
      id: string;
      name: string;
    };
  };

  customer?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };

  availability?: {
    id: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
  };

  payment?: {
    id: string;
    amount: string;
    status: string;
    transactionId: string | null;
    paidAt: string | null;
  } | null;

  review?: {
    id: string;
    rating: number;
    comment: string;
  } | null;
};

const statusOptions = [
  "ALL",
  "REQUESTED",
  "ACCEPTED",
  "IN_PROGRESS",
  "COMPLETED",
  "DECLINED",
  "CANCELLED",
] as const;

type StatusFilter = (typeof statusOptions)[number];

export default function TechnicianBookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("ALL");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetTechnicianBookingsQuery({});

  const [updateBookingStatus, { isLoading: isUpdating }] =
    useUpdateBookingStatusMutation();


  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  const bookings: Booking[] = data?.data ?? [];

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "N/A";

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(dateString));
  };

  
  const formatBookingId = (id: string) => {
    if (!id) return "N/A";

    return `#${id.slice(0, 8).toUpperCase()}`;
  };


  const formatStatus = (status: BookingStatus) => {
    return status.replace("_", " ");
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

      case "CANCELLED":
        return "bg-gray-100 text-gray-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };


  const filteredBookings = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const customerName =
        booking.customer?.name?.toLowerCase() ?? "";

      const serviceName =
        booking.service?.name?.toLowerCase() ?? "";

      const bookingId =
        booking.id?.toLowerCase() ?? "";

      const location =
        booking.service?.location?.toLowerCase() ?? "";

      const matchesSearch =
        customerName.includes(searchValue) ||
        serviceName.includes(searchValue) ||
        bookingId.includes(searchValue) ||
        location.includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" ||
        booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

 
  const handleStatusUpdate = async (
    id: string,
    status: BookingStatus,
  ) => {
    try {
      await updateBookingStatus({
        id,
        status,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };


  const handleCancelBooking = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) return;

    try {
      await cancelBooking({ id }).unwrap();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  const getActionButtons = (booking: Booking) => {
    const loading =
      isUpdating || isCancelling;

    if (booking.status === "REQUESTED") {
      return (
        <>
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              handleStatusUpdate(
                booking.id,
                "ACCEPTED",
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#EC620B] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d95708] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Accept
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              handleStatusUpdate(
                booking.id,
                "DECLINED",
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <XCircle className="h-3.5 w-3.5" />
            Decline
          </button>
        </>
      );
    }


    if (booking.status === "ACCEPTED") {
      return (
        <>
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              handleStatusUpdate(
                booking.id,
                "IN_PROGRESS",
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#EC620B] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d95708] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Clock3 className="h-3.5 w-3.5" />
            Start Job
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              handleCancelBooking(booking.id)
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <XCircle className="h-3.5 w-3.5" />
            Cancel
          </button>
        </>
      );
    }


    if (booking.status === "IN_PROGRESS") {
      return (
        <>
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              handleStatusUpdate(
                booking.id,
                "COMPLETED",
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#EC620B] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d95708] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Complete
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              handleCancelBooking(booking.id)
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <XCircle className="h-3.5 w-3.5" />
            Cancel
          </button>
        </>
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


  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#EC620B]" />
          <p className="text-sm font-medium text-[#00224A]/60">
            Loading bookings...
          </p>
        </div>
      </div>
    );
  }


  if (isError) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
        <div className="rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <XCircle className="mx-auto h-10 w-10 text-red-500" />

          <h2 className="mt-4 text-lg font-bold text-[#00224A]">
            Failed to load bookings
          </h2>

          <p className="mt-2 text-sm text-[#00224A]/60">
            Something went wrong while loading your bookings.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-lg bg-[#EC620B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d95708]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  const totalBookings = bookings.length;

  const pendingRequests = bookings.filter(
    (booking) => booking.status === "REQUESTED",
  ).length;

  const inProgress = bookings.filter(
    (booking) => booking.status === "IN_PROGRESS",
  ).length;

  const completed = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  ).length;

  return (
    <div className="min-h-screen w-full px-4 py-6 md:px-6 lg:px-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#00224A] md:text-3xl">
          Booking Management
        </h1>

        <p className="mt-1 text-sm text-[#00224A]/60">
          Manage customer booking requests and your scheduled jobs.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#00224A]/60">
            Total Bookings
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
            {totalBookings}
          </h2>
        </div>

        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#00224A]/60">
            Pending Requests
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
            {pendingRequests}
          </h2>
        </div>

        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#00224A]/60">
            In Progress
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
            {inProgress}
          </h2>
        </div>

        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#00224A]/60">
            Completed
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
            {completed}
          </h2>
        </div>
      </div>

      {/* BOOKINGS CONTAINER */}
      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        {/* SECTION HEADER */}
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            All Bookings
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Review and manage your customer bookings.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col gap-3 border-b border-[#00224A]/10 p-5 md:flex-row md:items-center md:justify-between">
          {/* SEARCH */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search bookings..."
              className="h-10 w-full rounded-lg border border-[#00224A]/15 bg-white pl-9 pr-3 text-sm text-[#00224A] outline-none transition-colors placeholder:text-[#00224A]/40 focus:border-[#EC620B]"
            />
          </div>

          {/* STATUS FILTER */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as StatusFilter,
              )
            }
            className="h-10 w-full rounded-lg border border-[#00224A]/15 bg-white px-3 text-sm font-medium text-[#00224A] outline-none focus:border-[#EC620B] md:w-52"
          >
            {statusOptions.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status === "ALL"
                  ? "All Status"
                  : formatStatus(status)}
              </option>
            ))}
          </select>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-[#00224A]/10 bg-[#00224A]/5">
                <th className="w-[10%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Booking
                </th>

                <th className="w-[14%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Customer
                </th>

                <th className="w-[16%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Service
                </th>

                <th className="w-[15%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Date & Time
                </th>

                <th className="w-[13%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Location
                </th>

                <th className="w-[11%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
                  Amount
                </th>

                <th className="w-[11%] px-3 py-3 text-left text-xs font-semibold uppercase text-[#00224A]">
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
                    {/* BOOKING ID */}
                    <td className="truncate px-3 py-4 text-sm font-semibold text-[#00224A]">
                      {formatBookingId(booking.id)}
                    </td>

                    {/* CUSTOMER */}
                    <td className="px-3 py-4">
                      <p className="truncate text-sm font-medium text-[#00224A]">
                        {booking.customer?.name ??
                          "Unknown Customer"}
                      </p>

                      <p className="mt-1 truncate text-xs text-[#00224A]/50">
                        {booking.customer?.phone ??
                          "No phone"}
                      </p>
                    </td>

                    {/* SERVICE */}
                    <td className="px-3 py-4">
                      <p className="truncate text-sm text-[#00224A]">
                        {booking.service?.name ??
                          "Unknown Service"}
                      </p>

                      {booking.service?.category && (
                        <p className="mt-1 truncate text-xs text-[#00224A]/50">
                          {booking.service.category.name}
                        </p>
                      )}
                    </td>

                    {/* DATE & TIME */}
                    <td className="px-3 py-4">
                      <p className="truncate text-sm font-medium text-[#00224A]">
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

                    {/* LOCATION */}
                    <td className="px-3 py-4">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#EC620B]" />

                        <span className="truncate text-sm text-[#00224A]">
                          {booking.service?.location ??
                            booking.customer?.address ??
                            "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* AMOUNT */}
                    <td className="px-3 py-4">
                      <p className="text-sm font-semibold text-[#00224A]">
                        $
                        {Number(
                          booking.totalAmount,
                        ).toLocaleString()}
                      </p>

                      {booking.payment && (
                        <p className="mt-1 text-xs text-[#00224A]/50">
                          {booking.payment.status}
                        </p>
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="px-3 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                          booking.status,
                        )}`}
                      >
                        {formatStatus(
                          booking.status,
                        )}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-3 py-4">
                      <div className="flex flex-wrap gap-2">
                        {getActionButtons(booking)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center"
                  >
                    <Search className="mx-auto h-8 w-8 text-[#00224A]/30" />

                    <p className="mt-3 text-sm font-semibold text-[#00224A]">
                      No bookings found
                    </p>

                    <p className="mt-1 text-xs text-[#00224A]/50">
                      Try changing your search or status
                      filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE + TABLET */}
        <div className="divide-y divide-[#00224A]/10 lg:hidden">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="space-y-4 p-5 transition-colors hover:bg-[#EC620B]/5"
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#00224A]">
                      {booking.customer?.name ??
                        "Unknown Customer"}
                    </p>

                    <p className="mt-1 text-sm text-[#00224A]/60">
                      {booking.service?.name ??
                        "Unknown Service"}
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#EC620B]">
                      {formatBookingId(booking.id)}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                      booking.status,
                    )}`}
                  >
                    {formatStatus(
                      booking.status,
                    )}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* DATE */}
                  <div>
                    <p className="text-xs text-[#00224A]/50">
                      Date & Time
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#00224A]">
                      {formatDate(
                        booking.scheduledAt,
                      )}
                    </p>

                    <p className="text-xs text-[#00224A]/60">
                      {formatTime(
                        booking.scheduledAt,
                      )}
                    </p>
                  </div>

                  {/* LOCATION */}
                  <div>
                    <p className="text-xs text-[#00224A]/50">
                      Location
                    </p>

                    <div className="mt-1 flex items-start gap-1.5 text-sm font-medium text-[#00224A]">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EC620B]" />

                      <span>
                        {booking.service?.location ??
                          booking.customer?.address ??
                          "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* AMOUNT */}
                  <div>
                    <p className="text-xs text-[#00224A]/50">
                      Amount
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#00224A]">
                      ৳
                      {Number(
                        booking.totalAmount,
                      ).toLocaleString()}
                    </p>
                  </div>

                  {/* CUSTOMER */}
                  <div>
                    <p className="text-xs text-[#00224A]/50">
                      Customer
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#00224A]">
                      <User className="h-4 w-4 text-[#EC620B]" />

                      <span>
                        {booking.customer?.name ??
                          "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* NOTE */}
                {booking.customerNote && (
                  <div className="rounded-lg bg-[#00224A]/5 p-3">
                    <p className="text-xs font-semibold text-[#00224A]">
                      Customer Note
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#00224A]/60">
                      {booking.customerNote}
                    </p>
                  </div>
                )}

                {/* ACTIONS */}
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

        {/* FOOTER */}
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

