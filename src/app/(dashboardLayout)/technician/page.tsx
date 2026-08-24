"use client";

import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  MoreHorizontal,
  UserRound,
  XCircle,
} from "lucide-react";
import { useState } from "react";

type JobStatus = "CONFIRMED" | "PENDING";

type Job = {
  id: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  status: JobStatus;
};

type PendingRequest = {
  id: string;
  customer: string;
  service: string;
  date: string;
  time: string;
};

const initialUpcomingJobs: Job[] = [
  {
    id: "#BK-1024",
    customer: "Sarah Ahmed",
    service: "Home Cleaning",
    date: "Aug 24, 2026",
    time: "10:00 AM",
    status: "CONFIRMED",
  },
  {
    id: "#BK-1023",
    customer: "Emily Johnson",
    service: "Plumbing",
    date: "Aug 24, 2026",
    time: "02:30 PM",
    status: "CONFIRMED",
  },
  {
    id: "#BK-1022",
    customer: "Michael Brown",
    service: "Electrical",
    date: "Aug 25, 2026",
    time: "11:00 AM",
    status: "PENDING",
  },
  {
    id: "#BK-1021",
    customer: "Maria Khan",
    service: "AC Repair",
    date: "Aug 26, 2026",
    time: "04:00 PM",
    status: "CONFIRMED",
  },
];

const initialPendingRequests: PendingRequest[] = [
  {
    id: "#REQ-301",
    customer: "John Smith",
    service: "AC Repair",
    date: "Aug 27, 2026",
    time: "10:30 AM",
  },
  {
    id: "#REQ-302",
    customer: "Nadia Rahman",
    service: "Home Cleaning",
    date: "Aug 27, 2026",
    time: "03:00 PM",
  },
];

export default function TechnicianDashboardPage() {
  const [upcomingJobs, setUpcomingJobs] = useState<Job[]>(
    initialUpcomingJobs,
  );

  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>(
    initialPendingRequests,
  );

  // Accept booking request
  const handleAccept = (request: PendingRequest) => {
    const acceptedJob: Job = {
      id: request.id.replace("#REQ", "#BK"),
      customer: request.customer,
      service: request.service,
      date: request.date,
      time: request.time,
      status: "CONFIRMED",
    };

    setUpcomingJobs((currentJobs) => [...currentJobs, acceptedJob]);

    setPendingRequests((currentRequests) =>
      currentRequests.filter((item) => item.id !== request.id),
    );
  };

  // Decline booking request
  const handleDecline = (requestId: string) => {
    setPendingRequests((currentRequests) =>
      currentRequests.filter((request) => request.id !== requestId),
    );
  };

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-lg font-semibold text-[#00224A] md:text-3xl lg:text-2xl">
            Technician Dashboard
          </h1>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Earnings */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Total Earnings
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                $4,680
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Upcoming Jobs */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Upcoming Jobs
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                {upcomingJobs.length}
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <CalendarDays className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Pending Requests
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                {pendingRequests.length}
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <Clock3 className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Completed Jobs */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Completed Jobs
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                86
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Jobs */}
      <div className="mb-8 rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#00224A]/10 p-5">
          <div>
            <h2 className="text-lg font-bold text-[#00224A]">
              Upcoming Jobs
            </h2>

            <p className="mt-1 text-sm text-[#00224A]/60">
              View your upcoming scheduled service jobs.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-[#00224A] transition-colors hover:bg-[#EC620B]/10 hover:text-[#EC620B]"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Table */}
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
                  {/* Booking */}
                  <td className="px-5 py-4 text-sm font-semibold text-[#00224A]">
                    {job.id}
                  </td>

                  {/* Customer */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EC620B] text-white">
                        <UserRound className="h-4 w-4" />
                      </div>

                      <span className="text-sm text-[#00224A]">
                        {job.customer}
                      </span>
                    </div>
                  </td>

                  {/* Service */}
                  <td className="px-5 py-4 text-sm text-[#00224A]">
                    {job.service}
                  </td>

                  {/* Date & Time */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-[#00224A]">
                      {job.date}
                    </p>

                    <p className="mt-1 text-xs text-[#00224A]/50">
                      {job.time}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        job.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : "bg-[#EC620B]/10 text-[#EC620B]"
                      }`}
                    >
                      {job.status === "CONFIRMED" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <Clock3 className="h-3 w-3" />
                      )}

                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}

              {upcomingJobs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-sm text-[#00224A]/50"
                  >
                    No upcoming jobs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        {/* Section Header */}
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            Pending Requests
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Review and respond to new customer booking requests.
          </p>
        </div>

        {/* Requests */}
        {pendingRequests.length > 0 ? (
          <div className="divide-y divide-[#00224A]/10">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-[#EC620B]/5 md:flex-row md:items-center"
              >
                {/* Customer Information */}
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EC620B] text-white">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#00224A]">
                      {request.customer}
                    </h3>

                    <p className="mt-1 text-sm text-[#00224A]/60">
                      {request.service}
                    </p>

                    <p className="mt-1 text-xs text-[#00224A]/50">
                      {request.date} • {request.time}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAccept(request)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#EC620B] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#EC620B]/90 active:scale-[0.98]"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Accept
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDecline(request.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 active:scale-[0.98]"
                  >
                    <XCircle className="h-4 w-4" />
                    Decline
                  </button>
                </div>
              </div>
            ))}
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