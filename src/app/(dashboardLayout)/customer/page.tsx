"use client";

import { useCancelBookingMutation, useGetMyBookingsQuery } from "@/redux/api/bookingApi";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  MessageSquare,
  Star,
  XCircle,
} from "lucide-react";
import { useState } from "react";


type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type Booking = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  availabilityId: string;
  totalAmount: string;
  scheduledAt: string;
  customerNote: string;
  status: BookingStatus;

  service: {
    id: string;
    name: string;
    description: string;
    price: string;
    location: string;
    category: {
      id: string;
      name: string;
      description: string;
    };
  };

  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };

  availability: {
    id: string;
    technicianId: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    createdAt: string;
  };

  payment: {
    id: string;
    bookingId: string;
    customerId: string;
    transactionId: string | null;
    amount: string;
    status: "PENDING" | "COMPLETED" | "REFUNDED";
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;

  review: {
    id: string;
    bookingId: string;
    customerId: string;
    technicianId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export default function CustomerDashboardPage() {
  // ========================================
  // GET MY BOOKINGS
  // ========================================

  const {
    data: bookingsResponse,
    isLoading,
    isError,
  } = useGetMyBookingsQuery({});

  const bookings: Booking[] = bookingsResponse?.data || [];

  // ========================================
  // CANCEL BOOKING
  // ========================================

  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  // ========================================
  // CREATE REVIEW
  // ========================================

  const [createReview, { isLoading: isSubmittingReview }] =
    useCreateReviewMutation();

  // ========================================
  // REVIEW STATES
  // ========================================

  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // ========================================
  // CANCEL BOOKING HANDLER
  // ========================================

  const handleCancelBooking = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) return;

    try {
      await cancelBooking({ id }).unwrap();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  // ========================================
  // SUBMIT REVIEW HANDLER
  // ========================================

  const handleSubmitReview = async () => {
    if (!reviewBooking) return;

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    if (!review.trim()) {
      alert("Please write a review.");
      return;
    }

    try {
      await createReview({
        bookingId: reviewBooking.id,
        technicianId: reviewBooking.technicianId,
        rating,
        comment: review.trim(),
      }).unwrap();

      setReviewBooking(null);
      setRating(0);
      setReview("");

      alert("Review submitted successfully.");
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  // ========================================
  // BOOKING STATUS STYLE
  // ========================================

  const getBookingStatusClass = (status: BookingStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-[#EC620B]/10 text-[#EC620B]";

      case "CONFIRMED":
      case "ACCEPTED":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "COMPLETED":
        return "bg-purple-100 text-purple-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ========================================
  // PAYMENT STATUS STYLE
  // ========================================

  const getPaymentStatusClass = (
    status: "PENDING" | "COMPLETED" | "REFUNDED",
  ) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-[#EC620B]/10 text-[#EC620B]";

      case "REFUNDED":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ========================================
  // STATISTICS
  // ========================================

  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status === "PENDING" ||
      booking.status === "CONFIRMED" ||
      booking.status === "ACCEPTED" ||
      booking.status === "IN_PROGRESS",
  );

  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  );

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING",
  );

  const totalPaid = bookings
    .filter((booking) => booking.payment?.status === "COMPLETED")
    .reduce(
      (total, booking) => total + Number(booking.payment?.amount || 0),
      0,
    );

  // ========================================
  // LOADING
  // ========================================

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm font-medium text-[#00224A]/60">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <div className="rounded-lg bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
          Failed to load your bookings.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden px-4 py-6 md:px-6 lg:px-8">
      {/* ========================================
          HEADER
      ======================================== */}

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#00224A] md:text-3xl">
          Customer Dashboard
        </h1>

        <p className="mt-1 text-sm text-[#00224A]/60">
          Manage your bookings, payments, and service reviews.
        </p>
      </div>

      {/* ========================================
          STATISTICS
      ======================================== */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Upcoming Bookings */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Upcoming Bookings
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                {upcomingBookings.length}
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <CalendarDays className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Pending
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                {pendingBookings.length}
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <Clock3 className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Completed Jobs */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Completed Jobs
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                {completedBookings.length}
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Total Paid */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Total Paid
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                ${totalPaid}
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================
          BOOKING HISTORY
      ======================================== */}

      <div className="mb-8 w-full max-w-full rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            Booking History
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            View and manage your service bookings.
          </p>
        </div>

        <div className="w-full max-w-full overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#00224A]/10 bg-[#00224A]/5">
                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Booking
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Service
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Technician
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Date & Time
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Price
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Status
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-sm text-[#00224A]/50"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-[#00224A]/10 last:border-b-0 hover:bg-[#EC620B]/5"
                  >
                    {/* Booking ID */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#00224A]">
                      #{booking.id.slice(0, 8)}
                    </td>

                    {/* Service */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                      {booking.service.name}
                    </td>

                    {/* Technician */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                      Technician
                    </td>

                    {/* Date & Time */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <p className="text-sm font-medium text-[#00224A]">
                        {new Date(
                          booking.scheduledAt,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>

                      <p className="mt-1 text-xs text-[#00224A]/50">
                        {new Date(
                          booking.scheduledAt,
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>

                    {/* Price */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#00224A]">
                      ${Number(booking.totalAmount)}
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getBookingStatusClass(
                          booking.status,
                        )}`}
                      >
                        {booking.status.replace("_", " ")}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="whitespace-nowrap px-5 py-4">
                      {/* Cancel */}
                      {booking.status === "PENDING" ||
                      booking.status === "CONFIRMED" ||
                      booking.status === "ACCEPTED" ? (
                        <button
                          type="button"
                          disabled={isCancelling}
                          onClick={() => handleCancelBooking(booking.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <XCircle className="h-3.5 w-3.5" />

                          {isCancelling ? "Cancelling..." : "Cancel"}
                        </button>
                      ) : /* Review */
                      booking.status === "COMPLETED" ? (
                        booking.review ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            Reviewed
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setReviewBooking(booking);
                              setRating(0);
                              setReview("");
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#EC620B] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d95708]"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            Review
                          </button>
                        )
                      ) : (
                        <span className="text-xs text-[#00224A]/40">
                          No action
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#00224A]/10 px-5 py-4">
          <p className="text-xs text-[#00224A]/50">
            Showing{" "}
            <span className="font-semibold text-[#00224A]">
              {bookings.length}
            </span>{" "}
            bookings
          </p>
        </div>
      </div>

      {/* ========================================
          PAYMENT HISTORY
      ======================================== */}

      <div className="mb-8 w-full max-w-full rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            Payment History
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            View your previous service payments.
          </p>
        </div>

        <div className="w-full max-w-full overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#00224A]/10 bg-[#00224A]/5">
                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Payment
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Booking
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Service
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Date
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Amount
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.filter((booking) => booking.payment).length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-[#00224A]/50"
                  >
                    No payment history found.
                  </td>
                </tr>
              ) : (
                bookings
                  .filter((booking) => booking.payment)
                  .map((booking) => {
                    const payment = booking.payment!;

                    return (
                      <tr
                        key={payment.id}
                        className="border-b border-[#00224A]/10 last:border-b-0 hover:bg-[#EC620B]/5"
                      >
                        {/* Payment ID */}
                        <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#00224A]">
                          #{payment.id.slice(0, 8)}
                        </td>

                        {/* Booking ID */}
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                          #{booking.id.slice(0, 8)}
                        </td>

                        {/* Service */}
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                          {booking.service.name}
                        </td>

                        {/* Date */}
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                          {new Date(
                            payment.paidAt ||
                              payment.createdAt ||
                              booking.scheduledAt,
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>

                        {/* Amount */}
                        <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#00224A]">
                          ${Number(payment.amount)}
                        </td>

                        {/* Status */}
                        <td className="whitespace-nowrap px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getPaymentStatusClass(
                              payment.status,
                            )}`}
                          >
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================
          REVIEW MODAL
      ======================================== */}

      {reviewBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00224A]/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="border-b border-[#00224A]/10 p-5">
              <h2 className="text-lg font-bold text-[#00224A]">
                Leave a Review
              </h2>

              <p className="mt-1 text-sm text-[#00224A]/60">
                {reviewBooking.service.name}
              </p>
            </div>

            <div className="space-y-5 p-5">
              {/* Rating */}
              <div>
                <p className="mb-2 text-sm font-medium text-[#00224A]">
                  Your Rating
                </p>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          star <= rating
                            ? "fill-[#EC620B] text-[#EC620B]"
                            : "text-[#00224A]/20"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review */}
              <div>
                <label
                  htmlFor="review"
                  className="mb-2 block text-sm font-medium text-[#00224A]"
                >
                  Your Review
                </label>

                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  placeholder="Tell us about your experience..."
                  className="w-full resize-none rounded-lg border border-[#00224A]/15 p-3 text-sm text-[#00224A] outline-none placeholder:text-[#00224A]/40 focus:border-[#EC620B]"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  disabled={isSubmittingReview}
                  onClick={() => {
                    setReviewBooking(null);
                    setRating(0);
                    setReview("");
                  }}
                  className="rounded-lg border border-[#00224A]/15 px-4 py-2.5 text-sm font-semibold text-[#00224A] transition-colors hover:bg-[#00224A]/5 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={
                    rating === 0 ||
                    !review.trim() ||
                    isSubmittingReview
                  }
                  onClick={handleSubmitReview}
                  className="rounded-lg bg-[#EC620B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d95708] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

