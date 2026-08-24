"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Save,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useState } from "react";

type DaySchedule = {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
};

const initialSchedule: DaySchedule[] = [
  { day: "Monday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Tuesday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Wednesday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Thursday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Friday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Saturday", enabled: false, startTime: "09:00", endTime: "17:00" },
  { day: "Sunday", enabled: false, startTime: "09:00", endTime: "17:00" },
];

export default function TechnicianAvailabilityPage() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [saved, setSaved] = useState(false);

  const updateDay = (
    index: number,
    field: keyof Omit<DaySchedule, "day">,
    value: boolean | string,
  ) => {
    setSchedule((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    // Later you can connect this with your API
    console.log({
      isAvailable,
      schedule,
    });
  };

  const handleAvailabilityToggle = () => {
    setIsAvailable((current) => !current);
    setSaved(false);
  };

  const availableDays = schedule.filter((item) => item.enabled).length;

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#00224A] md:text-3xl">
          Availability Scheduler
        </h1>
        <p className="mt-1 text-sm text-[#00224A]/60">
          Set your working hours and let customers know when you are available.
        </p>
      </div>

      {/* Availability Status */}
      <div className="mb-6 rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EC620B]/10 text-[#EC620B]">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-[#00224A]">
                Availability Status
              </h2>
              <p className="mt-1 text-sm text-[#00224A]/60">
                {isAvailable
                  ? "You are currently available for new booking requests."
                  : "You are currently unavailable for new booking requests."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAvailabilityToggle}
            className={`inline-flex items-center gap-2 self-start rounded-lg px-4 py-2 text-sm font-semibold transition-colors sm:self-auto ${
              isAvailable
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-[#00224A]/5 text-[#00224A]/60 hover:bg-[#00224A]/10"
            }`}
          >
            {isAvailable ? (
              <>
                <ToggleRight className="h-5 w-5" />
                Available
              </>
            ) : (
              <>
                <ToggleLeft className="h-5 w-5" />
                Unavailable
              </>
            )}
          </button>
        </div>
      </div>

      {/* Working Schedule */}
      <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            Weekly Working Hours
          </h2>
          <p className="mt-1 text-sm text-[#00224A]/60">
            Choose the days and hours when you are available to work.
          </p>
        </div>

        <div className="p-5">
          <div className="space-y-3">
            {schedule.map((item, index) => (
              <div
                key={item.day}
                className={`rounded-xl border p-4 transition-colors ${
                  item.enabled
                    ? "border-[#00224A]/10 bg-white"
                    : "border-[#00224A]/5 bg-[#00224A]/[0.02]"
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  {/* Day */}
                  <div className="flex min-w-[150px] items-center justify-between gap-3">
                    <span
                      className={`font-semibold ${
                        item.enabled
                          ? "text-[#00224A]"
                          : "text-[#00224A]/40"
                      }`}
                    >
                      {item.day}
                    </span>

                    {/* Toggle */}
                    <button
                      type="button"
                      onClick={() =>
                        updateDay(index, "enabled", !item.enabled)
                      }
                      className="md:hidden"
                      aria-label={`Toggle ${item.day} availability`}
                    >
                      {item.enabled ? (
                        <ToggleRight className="h-7 w-7 text-[#EC620B]" />
                      ) : (
                        <ToggleLeft className="h-7 w-7 text-[#00224A]/30" />
                      )}
                    </button>
                  </div>

                  {/* Desktop Toggle */}
                  <button
                    type="button"
                    onClick={() => updateDay(index, "enabled", !item.enabled)}
                    className="hidden md:block"
                    aria-label={`Toggle ${item.day} availability`}
                  >
                    {item.enabled ? (
                      <ToggleRight className="h-7 w-7 text-[#EC620B]" />
                    ) : (
                      <ToggleLeft className="h-7 w-7 text-[#00224A]/30" />
                    )}
                  </button>

                  {/* Time Inputs */}
                  <div
                    className={`grid flex-1 grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center ${
                      !item.enabled ? "opacity-40" : ""
                    }`}
                  >
                    <div className="relative">
                      <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />
                      <input
                        type="time"
                        value={item.startTime}
                        disabled={!item.enabled}
                        onChange={(e) =>
                          updateDay(index, "startTime", e.target.value)
                        }
                        className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none transition-colors focus:border-[#EC620B] disabled:cursor-not-allowed"
                      />
                    </div>

                    <span className="hidden text-center text-sm font-medium text-[#00224A]/50 sm:block">
                      to
                    </span>

                    <div className="relative">
                      <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />
                      <input
                        type="time"
                        value={item.endTime}
                        disabled={!item.enabled}
                        onChange={(e) =>
                          updateDay(index, "endTime", e.target.value)
                        }
                        className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none transition-colors focus:border-[#EC620B] disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-between gap-4 border-t border-[#00224A]/10 p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm text-[#00224A]/60">
            <Clock3 className="h-4 w-4 text-[#EC620B]" />
            <span>
              Available on{" "}
              <strong className="text-[#00224A]">{availableDays}</strong> days
              per week
            </span>
          </div>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                Changes saved
              </span>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d95708]"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}