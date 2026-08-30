/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  Plus,
  Save,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Pencil,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  useCreateAvailabilityMutation,
  useDeleteAvailabilityMutation,
  useGetAvailabilityQuery,
  useUpdateAvailabilityMutation,
} from "@/redux/api/availabilityApi";

type Availability = {
  id: string;
  technicianId?: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt?: string;
};

type AvailabilityForm = {
  date: string;
  startTime: string;
  endTime: string;
};

const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/*
 * Converts:
 * 2026-09-10 + 10:00
 *
 * into:
 * 2026-09-10T10:00:00.000Z
 *
 * We intentionally use UTC here because your API returns
 * ISO UTC timestamps.
 */
const toISOString = (date: string, time: string) => {
  return new Date(`${date}T${time}:00.000Z`).toISOString();
};

const formatDate = (value: string) => {
  const date = new Date(value);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (value: string) => {
  const date = new Date(value);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getAvailabilityArray = (response: any): Availability[] => {
  if (!response) return [];

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.availabilities)) {
    return response.data.availabilities;
  }

  if (Array.isArray(response?.data?.availability)) {
    return response.data.availability;
  }

  return [];
};

export default function TechnicianAvailabilityPage() {
  /* =========================================================
     GET AVAILABILITY
  ========================================================= */

  const {
    data: availabilityResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAvailabilityQuery({});

  /* =========================================================
     MUTATIONS
  ========================================================= */

  const [createAvailability, { isLoading: isCreating }] =
    useCreateAvailabilityMutation();

  const [updateAvailability, { isLoading: isUpdating }] =
    useUpdateAvailabilityMutation();

  const [deleteAvailability, { isLoading: isDeleting }] =
    useDeleteAvailabilityMutation();

  /* =========================================================
     STATE
  ========================================================= */

  const [isAvailable, setIsAvailable] = useState(true);

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const [form, setForm] = useState<AvailabilityForm>({
    date: getToday(),
    startTime: "09:00",
    endTime: "17:00",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const [saved, setSaved] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  /* =========================================================
     LOAD API DATA
  ========================================================= */

  useEffect(() => {
    const list = getAvailabilityArray(availabilityResponse);

    /*
     * Sort newest/future slots first.
     */
    const sorted = [...list].sort(
      (a, b) =>
        new Date(a.startTime).getTime() -
        new Date(b.startTime).getTime(),
    );

    setAvailabilities(sorted);
  }, [availabilityResponse]);

  /* =========================================================
     AVAILABLE SLOTS
  ========================================================= */

  const activeSlots = useMemo(
    () => availabilities.filter((item) => !item.isBooked),
    [availabilities],
  );

  const bookedSlots = useMemo(
    () => availabilities.filter((item) => item.isBooked),
    [availabilities],
  );

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleFormChange = (
    field: keyof AvailabilityForm,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  /* =========================================================
     GLOBAL AVAILABILITY
  ========================================================= */

  const handleAvailabilityToggle = () => {
    setIsAvailable((current) => !current);
    setSaved(false);
  };

  /* =========================================================
     VALIDATE TIME
  ========================================================= */

  const validateTime = () => {
    if (!form.date) {
      toast.error("Please select a date.");
      return false;
    }

    if (!form.startTime || !form.endTime) {
      toast.error("Please select both start and end time.");
      return false;
    }

    if (form.startTime >= form.endTime) {
      toast.error("End time must be after start time.");
      return false;
    }

    return true;
  };

  /* =========================================================
     CHECK OVERLAPPING SLOTS
  ========================================================= */

  const hasOverlap = (
    start: string,
    end: string,
    ignoreId?: string,
  ) => {
    const newStart = new Date(start).getTime();
    const newEnd = new Date(end).getTime();

    return availabilities.some((item) => {
      if (item.id === ignoreId) return false;

      /*
       * Booked slots also matter because creating a slot
       * over an already booked slot can cause backend errors.
       */
      const existingStart = new Date(item.startTime).getTime();
      const existingEnd = new Date(item.endTime).getTime();

      return (
        newStart < existingEnd &&
        newEnd > existingStart
      );
    });
  };

  /* =========================================================
     CREATE AVAILABILITY
  ========================================================= */

  const handleCreate = async () => {
    if (!validateTime()) return;

    const startTime = toISOString(
      form.date,
      form.startTime,
    );

    const endTime = toISOString(
      form.date,
      form.endTime,
    );

    if (hasOverlap(startTime, endTime)) {
      toast.error(
        "This time overlaps with an existing availability slot.",
      );
      return;
    }

    try {
      await createAvailability({
        startTime,
        endTime,
      }).unwrap();

      toast.success("Availability created successfully.");

      setForm({
        date: form.date,
        startTime: "09:00",
        endTime: "17:00",
      });

      setSaved(false);

      await refetch();
    } catch (error: any) {
      console.error("Create availability error:", error);

      const message =
        error?.data?.message ||
        "Failed to create availability.";

      toast.error(message);
    }
  };

  /* =========================================================
     START EDIT
  ========================================================= */

  const handleEdit = (item: Availability) => {
    if (item.isBooked) {
      toast.error(
        "Booked availability cannot be edited.",
      );
      return;
    }

    const start = new Date(item.startTime);
    const end = new Date(item.endTime);

    /*
     * Convert the existing UTC date/time into values
     * suitable for the date/time inputs.
     */
    const year = start.getUTCFullYear();
    const month = String(start.getUTCMonth() + 1).padStart(
      2,
      "0",
    );
    const day = String(start.getUTCDate()).padStart(2, "0");

    const startHour = String(start.getUTCHours()).padStart(
      2,
      "0",
    );
    const startMinute = String(
      start.getUTCMinutes(),
    ).padStart(2, "0");

    const endHour = String(end.getUTCHours()).padStart(
      2,
      "0",
    );
    const endMinute = String(
      end.getUTCMinutes(),
    ).padStart(2, "0");

    setForm({
      date: `${year}-${month}-${day}`,
      startTime: `${startHour}:${startMinute}`,
      endTime: `${endHour}:${endMinute}`,
    });

    setEditingId(item.id);

    setSaved(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     UPDATE AVAILABILITY
  ========================================================= */

  const handleUpdate = async () => {
    if (!editingId) return;

    if (!validateTime()) return;

    const startTime = toISOString(
      form.date,
      form.startTime,
    );

    const endTime = toISOString(
      form.date,
      form.endTime,
    );

    if (hasOverlap(startTime, endTime, editingId)) {
      toast.error(
        "This time overlaps with another availability slot.",
      );
      return;
    }

    try {
      await updateAvailability({
        id: editingId,
        data: {
          startTime,
          endTime,
        },
      }).unwrap();

      toast.success("Availability updated successfully.");

      setEditingId(null);

      setForm({
        date: form.date,
        startTime: "09:00",
        endTime: "17:00",
      });

      setSaved(false);

      await refetch();
    } catch (error: any) {
      console.error("Update availability error:", error);

      const message =
        error?.data?.message ||
        "Failed to update availability.";

      toast.error(message);
    }
  };

  /* =========================================================
     CANCEL EDIT
  ========================================================= */

  const handleCancelEdit = () => {
    setEditingId(null);

    setForm({
      date: getToday(),
      startTime: "09:00",
      endTime: "17:00",
    });

    setSaved(false);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (item: Availability) => {
    if (item.isBooked) {
      toast.error(
        "Booked availability cannot be deleted.",
      );
      return;
    }

    try {
      setDeletingId(item.id);

      await deleteAvailability(item.id).unwrap();

      toast.success("Availability deleted successfully.");

      setAvailabilities((current) =>
        current.filter(
          (availability) =>
            availability.id !== item.id,
        ),
      );

      if (editingId === item.id) {
        handleCancelEdit();
      }

      setSaved(false);
    } catch (error: any) {
      console.error("Delete availability error:", error);

      const message =
        error?.data?.message ||
        "Failed to delete availability.";

      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================================
     SAVE CHANGES
     
     IMPORTANT:
     Create and update are already performed immediately
     through their respective actions.

     This button acts as the final save/refresh action
     for the availability page.
  ========================================================= */

  const handleSaveChanges = async () => {
    if (editingId) {
      await handleUpdate();
      return;
    }

    /*
     * If the user has entered a new availability,
     * Save Changes creates it.
     */
    if (form.date && form.startTime && form.endTime) {
      await handleCreate();
      return;
    }

    setSaved(true);
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-2 text-[#00224A]">
          <Loader2 className="h-5 w-5 animate-spin text-[#EC620B]" />
          Loading availability...
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (isError) {
    return (
      <div className="min-h-[500px] p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-600">
            Failed to load availability.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-[#EC620B] px-4 py-2 text-sm font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#00224A] md:text-3xl">
          Availability Scheduler
        </h1>

        <p className="mt-1 text-sm text-[#00224A]/60">
          Manage your available dates and working hours.
        </p>
      </div>

      {/* AVAILABILITY STATUS */}

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

      {/* CREATE / UPDATE */}

      <div className="mb-6 rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="border-b border-[#00224A]/10 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EC620B]/10 text-[#EC620B]">
              {editingId ? (
                <Pencil className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#00224A]">
                {editingId
                  ? "Edit Availability"
                  : "Create Availability"}
              </h2>

              <p className="mt-1 text-sm text-[#00224A]/60">
                {editingId
                  ? "Update your selected availability time."
                  : "Add a date and time when customers can book you."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-3">
          {/* DATE */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#00224A]">
              Date
            </label>

            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

              <input
                type="date"
                min={getToday()}
                value={form.date}
                onChange={(e) =>
                  handleFormChange(
                    "date",
                    e.target.value,
                  )
                }
                className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none focus:border-[#EC620B]"
              />
            </div>
          </div>

          {/* START */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#00224A]">
              Start Time
            </label>

            <div className="relative">
              <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

              <input
                type="time"
                value={form.startTime}
                onChange={(e) =>
                  handleFormChange(
                    "startTime",
                    e.target.value,
                  )
                }
                className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none focus:border-[#EC620B]"
              />
            </div>
          </div>

          {/* END */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#00224A]">
              End Time
            </label>

            <div className="relative">
              <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

              <input
                type="time"
                value={form.endTime}
                onChange={(e) =>
                  handleFormChange(
                    "endTime",
                    e.target.value,
                  )
                }
                className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none focus:border-[#EC620B]"
              />
            </div>
          </div>
        </div>

        {/* EDIT CANCEL */}

        {editingId && (
          <div className="px-5 pb-5">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="inline-flex items-center gap-2 rounded-lg border border-[#00224A]/10 px-4 py-2 text-sm font-medium text-[#00224A]/70 transition-colors hover:bg-[#00224A]/5"
            >
              <X className="h-4 w-4" />
              Cancel Editing
            </button>
          </div>
        )}
      </div>

      {/* EXISTING AVAILABILITY */}

      <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            Your Availability
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Manage your existing availability slots.
          </p>
        </div>

        <div className="p-5">
          {availabilities.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#00224A]/15 py-12 text-center">
              <CalendarDays className="mx-auto h-10 w-10 text-[#00224A]/25" />

              <p className="mt-3 font-semibold text-[#00224A]">
                No availability found
              </p>

              <p className="mt-1 text-sm text-[#00224A]/50">
                Create your first availability above.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {availabilities.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 ${
                    item.isBooked
                      ? "border-[#00224A]/5 bg-[#00224A]/[0.02]"
                      : "border-[#00224A]/10 bg-white"
                  }`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* DATE/TIME */}

                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                          item.isBooked
                            ? "bg-[#00224A]/5 text-[#00224A]/40"
                            : "bg-[#EC620B]/10 text-[#EC620B]"
                        }`}
                      >
                        <CalendarDays className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="font-semibold text-[#00224A]">
                          {formatDate(item.startTime)}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-sm text-[#00224A]/60">
                          <Clock3 className="h-4 w-4" />

                          <span>
                            {formatTime(item.startTime)}
                          </span>

                          <span>—</span>

                          <span>
                            {formatTime(item.endTime)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* STATUS */}

                    <div className="flex flex-wrap items-center gap-2">
                      {item.isBooked ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Booked
                        </span>
                      ) : (
                        <>
                          <span className="rounded-full bg-[#EC620B]/10 px-3 py-1.5 text-xs font-semibold text-[#EC620B]">
                            Available
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(item)
                            }
                            disabled={
                              isUpdating ||
                              isDeleting
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#00224A]/10 px-3 py-2 text-sm font-medium text-[#00224A] transition-colors hover:bg-[#00224A]/5 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(item)
                            }
                            disabled={
                              deletingId === item.id ||
                              isDeleting
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {deletingId === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}

                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className="flex flex-col justify-between gap-4 border-t border-[#00224A]/10 p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm text-[#00224A]/60">
            <Clock3 className="h-4 w-4 text-[#EC620B]" />

            <span>
              <strong className="text-[#00224A]">
                {activeSlots.length}
              </strong>{" "}
              available slots
            </span>

            {bookedSlots.length > 0 && (
              <span className="text-[#00224A]/40">
                • {bookedSlots.length} booked
              </span>
            )}
          </div>

          {/* ONLY SAVE BUTTON */}

          <div className="flex items-center gap-3">
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                Changes saved
              </span>
            )}

            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={
                isCreating ||
                isUpdating ||
                isFetching
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d95708] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreating || isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}

              {isCreating || isUpdating
                ? "Saving..."
                : editingId
                  ? "Update Availability"
                  : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}