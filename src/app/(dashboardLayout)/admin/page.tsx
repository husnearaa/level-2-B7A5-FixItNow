/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import { useGetAllUserQuery } from "@/redux/api/userApi";
import {
  CalendarDays,
  CheckCircle2,
  DollarSign,
  Users,
} from "lucide-react";

// import {
//   useGetAllBookingsQuery,
//   useGetAllUserQuery,
// } from "@/redux/api/adminApi";

export default function AdminDashboardPage() {
  const {
    data: usersResponse,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAllUserQuery({});

  const {
    data: bookingsResponse,
    isLoading: bookingsLoading,
    isError: bookingsError,
  } = useGetAllBookingsQuery({});

  /*
   * Your API response may be:
   *
   * {
   *   success: true,
   *   data: [...]
   * }
   *
   * or:
   *
   * {
   *   success: true,
   *   data: {
   *     data: [...]
   *   }
   * }
   *
   * These helpers handle both common structures.
   */

  const users =
    usersResponse?.data?.data ??
    usersResponse?.data ??
    [];

  const bookings =
    bookingsResponse?.data?.data ??
    bookingsResponse?.data ??
    [];

  const totalUsers = Array.isArray(users) ? users.length : 0;

  const totalBookings = Array.isArray(bookings)
    ? bookings.length
    : 0;

  return (
    <div className="min-h-screen bg-[#F8F9FA] px-4 py-6 md:px-6 lg:px-8 m-6 rounded-lg">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#00224A] md:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Monitor and manage your FixItNow platform.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Users */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Total Users
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                {usersLoading ? "..." : usersError ? "0" : totalUsers}
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Active Bookings
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                {bookingsLoading
                  ? "..."
                  : bookingsError
                    ? "0"
                    : totalBookings}
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <CalendarDays className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Revenue - KEEPING SAME */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:col-span-2 xl:col-span-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Total Revenue
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                $24,680
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#00224A]/10 p-5">
          <div>
            <h2 className="text-lg font-bold text-[#00224A]">
              Recent Bookings
            </h2>

            <p className="mt-1 text-sm text-[#00224A]/60">
              Overview of the latest platform bookings.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-[#00224A]/10 bg-[#00224A]/5">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Booking
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Technician
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Service
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {bookingsLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-[#00224A]/60"
                  >
                    Loading bookings...
                  </td>
                </tr>
              ) : bookingsError ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-red-500"
                  >
                    Failed to load bookings.
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-[#00224A]/60"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking: any) => (
                  <tr
                    key={booking.id}
                    className="border-b border-[#00224A]/10 transition-colors last:border-b-0 hover:bg-[#EC620B]/5"
                  >
                    {/* Booking */}
                    <td className="px-5 py-4 text-sm font-semibold text-[#00224A]">
                      {booking.id}
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4 text-sm text-[#00224A]">
                      {booking.customer?.name ||
                        booking.customer?.firstName ||
                        booking.user?.name ||
                        "N/A"}
                    </td>

                    {/* Technician */}
                    <td className="px-5 py-4 text-sm text-[#00224A]">
                      {booking.technician?.name ||
                        booking.technician?.firstName ||
                        "N/A"}
                    </td>

                    {/* Service */}
                    <td className="px-5 py-4 text-sm text-[#00224A]">
                      {booking.service?.name ||
                        booking.serviceName ||
                        "N/A"}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-sm text-[#00224A]/60">
                      {booking.date ||
                        booking.bookingDate ||
                        booking.createdAt
                        ? new Date(
                            booking.date ||
                              booking.bookingDate ||
                              booking.createdAt
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          booking.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "IN_PROGRESS"
                              ? "bg-[#EC620B]/10 text-[#EC620B]"
                              : booking.status === "REQUESTED"
                                ? "bg-[#EC620B] text-white"
                                : booking.status === "PAID"
                                  ? "bg-[#00224A] text-white"
                                  : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status === "COMPLETED" && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}

                        {booking.status || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
