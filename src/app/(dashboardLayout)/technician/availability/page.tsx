"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useState } from "react";

type DaySchedule = {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
};

const initialSchedule: DaySchedule[] = [
  {
    day: "Monday",
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    day: "Tuesday",
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    day: "Wednesday",
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    day: "Thursday",
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    day: "Friday",
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    day: "Saturday",
    enabled: false,
    startTime: "10:00",
    endTime: "15:00",
  },
  {
    day: "Sunday",
    enabled: false,
    startTime: "10:00",
    endTime: "15:00",
  },
];

const initialBlockedDates = [
  {
    id: 1,
    date: "Aug 30, 2026",
    reason: "Personal Day",
  },
  {
    id: 2,
    date: "Sep 04, 2026",
    reason: "Holiday",
  },
];

export default function TechnicianAvailabilityPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);

  const [blockedDates, setBlockedDates] = useState(initialBlockedDates);

  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [newBlockedReason, setNewBlockedReason] = useState("");

  const [saved, setSaved] = useState(false);

  const updateSchedule = (
    index: number,
    field: keyof DaySchedule,
    value: string | boolean,
  ) => {
    setSchedule((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );

    setSaved(false);
  };

  const handleAddBlockedDate = () => {
    if (!newBlockedDate) return;

    const formattedDate = new Date(
      `${newBlockedDate}T00:00:00`,
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    setBlockedDates((current) => [
      ...current,
      {
        id: Date.now(),
        date: formattedDate,
        reason: newBlockedReason.trim() || "Unavailable",
      },
    ]);

    setNewBlockedDate("");
    setNewBlockedReason("");
    setSaved(false);
  };

  const handleRemoveBlockedDate = (id: number) => {
    setBlockedDates((current) =>
      current.filter((item) => item.id !== id),
    );

    setSaved(false);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#00224A] md:text-3xl">
            Availability Scheduler
          </h1>

          {/* <p className="mt-1 text-sm text-[#00224A]/60">
            Set your working hours and manage your unavailable dates.
          </p> */}
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-[#00224A]/10 bg-white px-4 py-2 shadow-sm">
          <Clock3 className="h-4 w-4 text-[#EC620B]" />

          <span className="text-sm font-medium text-[#00224A]">
            Availability
          </span>

          <span className="h-2 w-2 rounded-full bg-green-500" />
        </div>
      </div>

      <form onSubmit={handleSave}>
        {/* Weekly Schedule */}
        <div className="mb-6 rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
          {/* Card Header */}
          <div className="border-b border-[#00224A]/10 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EC620B] text-white">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#00224A]">
                  Weekly Schedule
                </h2>

                <p className="mt-1 text-sm text-[#00224A]/60">
                  Choose the days and hours you are available for bookings.
                </p>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="divide-y divide-[#00224A]/10">
            {schedule.map((item, index) => (
              <div
                key={item.day}
                className="flex flex-col gap-4 p-5 transition-colors hover:bg-[#EC620B]/5 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Day */}
                <div className="flex items-center gap-3 sm:w-40">
                  <button
                    type="button"
                    onClick={() =>
                      updateSchedule(
                        index,
                        "enabled",
                        !item.enabled,
                      )
                    }
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                      item.enabled
                        ? "bg-[#EC620B]"
                        : "bg-[#00224A]/20"
                    }`}
                    aria-label={`Toggle ${item.day}`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        item.enabled
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>

                  <span
                    className={`text-sm font-semibold ${
                      item.enabled
                        ? "text-[#00224A]"
                        : "text-[#00224A]/40"
                    }`}
                  >
                    {item.day}
                  </span>
                </div>

                {/* Time */}
                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

                    <input
                      type="time"
                      value={item.startTime}
                      disabled={!item.enabled}
                      onChange={(e) =>
                        updateSchedule(
                          index,
                          "startTime",
                          e.target.value,
                        )
                      }
                      className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none transition-colors focus:border-[#EC620B] disabled:cursor-not-allowed disabled:bg-[#00224A]/5 disabled:text-[#00224A]/30"
                    />
                  </div>

                  <span className="hidden text-sm text-[#00224A]/40 sm:block">
                    to
                  </span>

                  <div className="relative flex-1">
                    <Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

                    <input
                      type="time"
                      value={item.endTime}
                      disabled={!item.enabled}
                      onChange={(e) =>
                        updateSchedule(
                          index,
                          "endTime",
                          e.target.value,
                        )
                      }
                      className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none transition-colors focus:border-[#EC620B] disabled:cursor-not-allowed disabled:bg-[#00224A]/5 disabled:text-[#00224A]/30"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="sm:w-28 sm:text-right">
                  {item.enabled ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-[#00224A]/5 px-3 py-1 text-xs font-semibold text-[#00224A]/50">
                      Unavailable
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blocked Dates */}
        <div className="mb-6 rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-[#00224A]/10 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EC620B] text-white">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#00224A]">
                  Blocked Dates
                </h2>

                <p className="mt-1 text-sm text-[#00224A]/60">
                  Block specific dates when you are not available.
                </p>
              </div>
            </div>
          </div>

          {/* Add Date */}
          <div className="border-b border-[#00224A]/10 p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]">
              <div>
                <label
                  htmlFor="blocked-date"
                  className="mb-2 block text-sm font-medium text-[#00224A]"
                >
                  Date
                </label>

                <input
                  id="blocked-date"
                  type="date"
                  value={newBlockedDate}
                  onChange={(e) =>
                    setNewBlockedDate(e.target.value)
                  }
                  className="h-11 w-full rounded-lg border border-[#00224A]/15 px-3 text-sm text-[#00224A] outline-none transition-colors focus:border-[#EC620B]"
                />
              </div>

              <div>
                <label
                  htmlFor="blocked-reason"
                  className="mb-2 block text-sm font-medium text-[#00224A]"
                >
                  Reason
                </label>

                <input
                  id="blocked-reason"
                  type="text"
                  value={newBlockedReason}
                  onChange={(e) =>
                    setNewBlockedReason(e.target.value)
                  }
                  placeholder="e.g. Personal Day"
                  className="h-11 w-full rounded-lg border border-[#00224A]/15 px-3 text-sm text-[#00224A] outline-none transition-colors placeholder:text-[#00224A]/40 focus:border-[#EC620B]"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddBlockedDate}
                  disabled={!newBlockedDate}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#EC620B]/90 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                >
                  <Plus className="h-4 w-4" />
                  Block Date
                </button>
              </div>
            </div>
          </div>

          {/* Blocked Date List */}
          <div>
            {blockedDates.length === 0 ? (
              <div className="p-8 text-center">
                <CalendarDays className="mx-auto h-8 w-8 text-[#00224A]/30" />

                <p className="mt-2 text-sm font-medium text-[#00224A]">
                  No blocked dates
                </p>

                <p className="mt-1 text-xs text-[#00224A]/50">
                  You are available on all dates according to your
                  weekly schedule.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#00224A]/10">
                {blockedDates.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 p-5 transition-colors hover:bg-[#EC620B]/5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EC620B]/10">
                        <CalendarDays className="h-5 w-5 text-[#EC620B]" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#00224A]">
                          {item.date}
                        </p>

                        <p className="mt-1 text-xs text-[#00224A]/50">
                          {item.reason}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveBlockedDate(item.id)
                      }
                      className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Availability Summary */}
        <div className="mb-6 rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
          <div className="border-b border-[#00224A]/10 p-5">
            <h2 className="text-lg font-bold text-[#00224A]">
              Availability Summary
            </h2>

            <p className="mt-1 text-sm text-[#00224A]/60">
              Quick overview of your current availability.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
            <div className="rounded-lg bg-[#00224A]/5 p-4">
              <p className="text-sm text-[#00224A]/60">
                Available Days
              </p>

              <p className="mt-2 text-2xl font-bold text-[#00224A]">
                {schedule.filter((item) => item.enabled).length}
              </p>

              <p className="mt-1 text-xs text-[#00224A]/50">
                days per week
              </p>
            </div>

            <div className="rounded-lg bg-[#EC620B]/10 p-4">
              <p className="text-sm text-[#00224A]/60">
                Working Hours
              </p>

              <p className="mt-2 text-2xl font-bold text-[#00224A]">
                8 hrs
              </p>

              <p className="mt-1 text-xs text-[#00224A]/50">
                average per day
              </p>
            </div>

            <div className="rounded-lg bg-[#00224A]/5 p-4">
              <p className="text-sm text-[#00224A]/60">
                Blocked Dates
              </p>

              <p className="mt-2 text-2xl font-bold text-[#00224A]">
                {blockedDates.length}
              </p>

              <p className="mt-1 text-xs text-[#00224A]/50">
                upcoming dates
              </p>
            </div>
          </div>
        </div>

        {/* Save Section */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          {saved && (
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              Availability saved successfully
            </div>
          )}

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#EC620B]/90"
          >
            <Save className="h-4 w-4" />
            Save Availability
          </button>
        </div>
      </form>
    </div>
  );
}