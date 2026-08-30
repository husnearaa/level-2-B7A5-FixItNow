"use client";

import { useGetTechnicianBookingsQuery, useUpdateBookingStatusMutation } from "@/redux/api/bookingApi";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  MoreHorizontal,
  UserRound,
  XCircle,
} from "lucide-react";



type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DECLINED"
  | "CANCELLED";

type Booking = {
  id: string;

  status: BookingStatus;

  scheduledAt: string;

  totalAmount: number;

  customer?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };

  service?: {
    id: string;
    name: string;
    price: number;
    category?: {
      id: string;
      name: string;
    };
  };

  availability?: {
    id: string;
    startTime: string;
    endTime: string;
  };
};

export default function TechnicianDashboardPage() {
  // ========================================
  // GET TECHNICIAN BOOKINGS
  // ========================================

  const {
    data: response,
    isLoading,
    isError,
  } = useGetTechnicianBookingsQuery({});

  const [
    updateBookingStatus,
    { isLoading: isUpdating },
  ] = useUpdateBookingStatusMutation();

  const bookings: Booking[] = response?.data ?? [];

  // FILTER DATA

  const pendingRequests = bookings.filter(
    (booking) =>
      booking.status === "REQUESTED"
  );

  const upcomingJobs = bookings.filter(
    (booking) =>
      booking.status === "ACCEPTED" ||
      booking.status === "PAID" ||
      booking.status === "IN_PROGRESS"
  );

  const completedJobs = bookings.filter(
    (booking) =>
      booking.status === "COMPLETED"
  );

  // TOTAL EARNINGS

  const totalEarnings = completedJobs.reduce(
    (total, booking) =>
      total + Number(booking.totalAmount || 0),
    0
  );

  // ACCEPT REQUEST


  const handleAccept = async (
    bookingId: string
  ) => {
    try {
      await updateBookingStatus({
        id: bookingId,
        status: "ACCEPTED",
      }).unwrap();
    } catch (error) {
      console.error(
        "Failed to accept booking:",
        error
      );
    }
  };

  // ========================================
  // DECLINE REQUEST
  // ========================================

  const handleDecline = async (
    bookingId: string
  ) => {
    try {
      await updateBookingStatus({
        id: bookingId,
        status: "DECLINED",
      }).unwrap();
    } catch (error) {
      console.error(
        "Failed to decline booking:",
        error
      );
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#EC620B]" />

          <p className="text-sm text-[#00224A]/60">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-600">
            Failed to load dashboard
          </h2>

          <p className="mt-1 text-sm text-red-500">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-8">
        <h1 className="text-lg font-semibold text-[#00224A] md:text-3xl lg:text-2xl">
          Technician Dashboard
        </h1>

        <p className="mt-1 text-sm text-[#00224A]/60">
          Manage your service requests and upcoming jobs.
        </p>
      </div>

      {/* =====================================
          STATISTICS
      ===================================== */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Earnings */}

        <StatCard
          title="Total Earnings"
          value={`$${totalEarnings.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5 text-white" />}
        />

        {/* Upcoming */}

        <StatCard
          title="Upcoming Jobs"
          value={upcomingJobs.length}
          icon={
            <CalendarDays className="h-5 w-5 text-white" />
          }
        />

        {/* Requests */}

        <StatCard
          title="Pending Requests"
          value={pendingRequests.length}
          icon={
            <Clock3 className="h-5 w-5 text-white" />
          }
        />

        {/* Completed */}

        <StatCard
          title="Completed Jobs"
          value={completedJobs.length}
          icon={
            <CheckCircle2 className="h-5 w-5 text-white" />
          }
        />

      </div>

      {/* =====================================
          UPCOMING JOBS
      ===================================== */}

      <div className="mb-8 rounded-xl border border-[#00224A]/10 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-[#00224A]/10 p-5">

          <div>
            <h2 className="text-lg font-bold text-[#00224A]">
              Upcoming Jobs
            </h2>

            <p className="mt-1 text-sm text-[#00224A]/60">
              View your accepted and active service jobs.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-[#00224A] transition-colors hover:bg-[#EC620B]/10 hover:text-[#EC620B]"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead>
              <tr className="border-b border-[#00224A]/10 bg-[#00224A]/5">

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Booking
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Service
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Date & Time
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {upcomingJobs.map((job) => (

                <tr
                  key={job.id}
                  className="border-b border-[#00224A]/10 transition-colors last:border-b-0 hover:bg-[#EC620B]/5"
                >

                  <td className="px-5 py-4 text-sm font-semibold text-[#00224A]">
                    #{job.id.slice(-6)}
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EC620B] text-white">
                        <UserRound className="h-4 w-4" />
                      </div>

                      <span className="text-sm text-[#00224A]">
                        {job.customer?.name ??
                          "Unknown Customer"}
                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-4 text-sm text-[#00224A]">
                    {job.service?.name ??
                      "Unknown Service"}
                  </td>

                  <td className="px-5 py-4">

                    <p className="text-sm font-medium text-[#00224A]">
                      {formatDate(
                        job.scheduledAt
                      )}
                    </p>

                    <p className="mt-1 text-xs text-[#00224A]/50">
                      {formatTime(
                        job.scheduledAt
                      )}
                    </p>

                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={job.status}
                    />
                  </td>

                </tr>

              ))}

              {upcomingJobs.length === 0 && (
                <EmptyTableRow
                  message="No upcoming jobs."
                />
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================
          PENDING REQUESTS
      ===================================== */}

      <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm">

        <div className="border-b border-[#00224A]/10 p-5">

          <h2 className="text-lg font-bold text-[#00224A]">
            Pending Requests
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Review and respond to new customer booking requests.
          </p>

        </div>

        {pendingRequests.length > 0 ? (

          <div className="divide-y divide-[#00224A]/10">

            {pendingRequests.map(
              (request) => (

                <div
                  key={request.id}
                  className="flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-[#EC620B]/5 md:flex-row md:items-center"
                >

                  {/* Customer */}

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EC620B] text-white">
                      <UserRound className="h-5 w-5" />
                    </div>

                    <div>

                      <h3 className="text-sm font-semibold text-[#00224A]">
                        {request.customer?.name ??
                          "Unknown Customer"}
                      </h3>

                      <p className="mt-1 text-sm text-[#00224A]/60">
                        {request.service?.name ??
                          "Unknown Service"}
                      </p>

                      <p className="mt-1 text-xs text-[#00224A]/50">
                        {formatDate(
                          request.scheduledAt
                        )}{" "}
                        •{" "}
                        {formatTime(
                          request.scheduledAt
                        )}
                      </p>

                    </div>

                  </div>

                  {/* Actions */}

                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() =>
                        handleAccept(
                          request.id
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-[#EC620B] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#EC620B]/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-4 w-4" />

                      {isUpdating
                        ? "Updating..."
                        : "Accept"}
                    </button>

                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() =>
                        handleDecline(
                          request.id
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <XCircle className="h-4 w-4" />

                      Decline
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        ) : (

          <div className="flex flex-col items-center justify-center px-5 py-12 text-center">

            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>

            <h3 className="text-sm font-semibold text-[#00224A]">
              No Pending Requests
            </h3>

            <p className="mt-1 text-sm text-[#00224A]/50">
              You have reviewed all booking requests.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

/* ==========================================
   STAT CARD
========================================== */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-[#00224A]/60">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
            {value}
          </h2>

        </div>

        <div className="rounded-lg bg-[#EC620B] p-3">
          {icon}
        </div>

      </div>

    </div>
  );
}

/* ==========================================
   STATUS BADGE
========================================== */

function StatusBadge({
  status,
}: {
  status: BookingStatus;
}) {
  const statusConfig: Record<
    BookingStatus,
    {
      label: string;
      className: string;
      icon: React.ReactNode;
    }
  > = {
    REQUESTED: {
      label: "Requested",
      className:
        "bg-[#EC620B]/10 text-[#EC620B]",
      icon: (
        <Clock3 className="h-3 w-3" />
      ),
    },

    ACCEPTED: {
      label: "Accepted",
      className:
        "bg-green-100 text-green-700",
      icon: (
        <CheckCircle2 className="h-3 w-3" />
      ),
    },

    PAID: {
      label: "Paid",
      className:
        "bg-blue-100 text-blue-700",
      icon: (
        <CheckCircle2 className="h-3 w-3" />
      ),
    },

    IN_PROGRESS: {
      label: "In Progress",
      className:
        "bg-purple-100 text-purple-700",
      icon: (
        <Clock3 className="h-3 w-3" />
      ),
    },

    COMPLETED: {
      label: "Completed",
      className:
        "bg-green-100 text-green-700",
      icon: (
        <CheckCircle2 className="h-3 w-3" />
      ),
    },

    DECLINED: {
      label: "Declined",
      className:
        "bg-red-100 text-red-700",
      icon: (
        <XCircle className="h-3 w-3" />
      ),
    },

    CANCELLED: {
      label: "Cancelled",
      className:
        "bg-red-100 text-red-700",
      icon: (
        <XCircle className="h-3 w-3" />
      ),
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}

/* ==========================================
   EMPTY TABLE
========================================== */

function EmptyTableRow({
  message,
}: {
  message: string;
}) {
  return (
    <tr>
      <td
        colSpan={5}
        className="px-5 py-10 text-center text-sm text-[#00224A]/50"
      >
        {message}
      </td>
    </tr>
  );
}

/* ==========================================
   DATE
========================================== */

function formatDate(
  date?: string
) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

/* ==========================================
   TIME
========================================== */

function formatTime(
  date?: string
) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
}