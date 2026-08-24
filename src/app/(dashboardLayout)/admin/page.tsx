"use client";

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  Users,
} from "lucide-react";

const bookings = [
  {
    id: "#BK-1024",
    customer: "Sarah Ahmed",
    technician: "James Wilson",
    service: "Home Cleaning",
    date: "Aug 24, 2026",
    status: "PAID",
  },
  {
    id: "#BK-1023",
    customer: "Emily Johnson",
    technician: "David Smith",
    service: "Plumbing",
    date: "Aug 24, 2026",
    status: "IN_PROGRESS",
  },
  {
    id: "#BK-1022",
    customer: "Michael Brown",
    technician: "Robert Lee",
    service: "Electrical",
    date: "Aug 23, 2026",
    status: "COMPLETED",
  },
  {
    id: "#BK-1021",
    customer: "Maria Khan",
    technician: "James Wilson",
    service: "AC Repair",
    date: "Aug 23, 2026",
    status: "REQUESTED",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] px-4 py-6 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#00224A] md:text-3xl">
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
        <div className="rounded-xl border border-[#00224A]/10 bg-[#FFF8F4] p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Total Users
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                1,248
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-600" />

            <span className="font-semibold text-green-600">12.5%</span>

            <span className="text-[#00224A]/50">
              from last month
            </span>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="rounded-xl border border-[#00224A]/10 bg-[#FFF8F4] p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Active Bookings
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                186
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <CalendarDays className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-600" />

            <span className="font-semibold text-green-600">8.2%</span>

            <span className="text-[#00224A]/50">
              from last month
            </span>
          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-xl border border-[#00224A]/10 bg-[#FFF8F4] p-5 shadow-sm transition-shadow hover:shadow-md sm:col-span-2 xl:col-span-1">
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

          <div className="mt-4 flex items-center gap-1 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-600" />

            <span className="font-semibold text-green-600">15.8%</span>

            <span className="text-[#00224A]/50">
              from last month
            </span>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="rounded-xl border border-[#00224A]/10 bg-[#FFF8F4] shadow-sm">
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
              {bookings.map((booking) => (
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
                    {booking.customer}
                  </td>

                  {/* Technician */}
                  <td className="px-5 py-4 text-sm text-[#00224A]">
                    {booking.technician}
                  </td>

                  {/* Service */}
                  <td className="px-5 py-4 text-sm text-[#00224A]">
                    {booking.service}
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 text-sm text-[#00224A]/60">
                    {booking.date}
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

                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}