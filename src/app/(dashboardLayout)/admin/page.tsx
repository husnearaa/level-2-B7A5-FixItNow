"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Ban,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

import { useState } from "react";

const users = [
  {
    id: 1,
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 2,
    name: "James Wilson",
    email: "james@example.com",
    role: "Technician",
    status: "Active",
  },
  {
    id: 3,
    name: "Maria Khan",
    email: "maria@example.com",
    role: "Customer",
    status: "Banned",
  },
  {
    id: 4,
    name: "David Smith",
    email: "david@example.com",
    role: "Technician",
    status: "Active",
  },
  {
    id: 5,
    name: "Emily Johnson",
    email: "emily@example.com",
    role: "Customer",
    status: "Active",
  },
];

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
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState(users);

  const filteredUsers = userList.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );



  return (
    <div className="min-h-screen  px-4 py-6 md:px-6 lg:px-8">
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

        <div className="flex items-center gap-2 rounded-lg border border-[#00224A]/10 bg-white px-4 py-2">
          <Activity className="h-4 w-4 text-[#EC620B]" />

          <span className="text-sm font-medium text-[#00224A]">
            Platform Active
          </span>

          <span className="h-2 w-2 rounded-full bg-[#EC620B]" />
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Users */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Total Users
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                1,248
              </h2>
            </div>

            <div className="rounded-lg bg-[#00224A] p-3">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1 text-sm">
            <ArrowUpRight className="h-4 w-4 text-[#EC620B]" />

            <span className="font-semibold text-[#EC620B]">12.5%</span>

            <span className="text-[#00224A]/50">from last month</span>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
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
            <ArrowUpRight className="h-4 w-4 text-[#EC620B]" />

            <span className="font-semibold text-[#EC620B]">8.2%</span>

            <span className="text-[#00224A]/50">from last month</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Total Revenue
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                $24,680
              </h2>
            </div>

            <div className="rounded-lg bg-[#00224A] p-3">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1 text-sm">
            <ArrowUpRight className="h-4 w-4 text-[#EC620B]" />

            <span className="font-semibold text-[#EC620B]">15.8%</span>

            <span className="text-[#00224A]/50">from last month</span>
          </div>
        </div>
      </div>

 

      {/* Recent Bookings */}
      <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#00224A]/10 p-5">
          <div>
            <h2 className="text-lg font-bold text-[#00224A]">
              Recent Bookings
            </h2>

            <p className="mt-1 text-sm text-[#00224A]/60">
              Overview of the latest platform bookings.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-[#00224A] hover:bg-[#00224A]/5"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

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
                  className="border-b border-[#00224A]/10 last:border-b-0"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-[#00224A]">
                    {booking.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#00224A]">
                    {booking.customer}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#00224A]">
                    {booking.technician}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#00224A]">
                    {booking.service}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#00224A]/60">
                    {booking.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        booking.status === "COMPLETED"
                          ? "bg-[#00224A] text-white"
                          : booking.status === "REQUESTED"
                            ? "bg-[#EC620B] text-white"
                            : booking.status === "IN_PROGRESS"
                              ? "bg-[#EC620B] text-white"
                              : "bg-[#00224A] text-white"
                      }`}
                    >
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