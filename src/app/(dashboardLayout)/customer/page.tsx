"use client";

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
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type Booking = {
  id: string;
  service: string;
  technician: string;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
};

type Payment = {
  id: string;
  bookingId: string;
  service: string;
  amount: number;
  date: string;
  status: "PAID" | "PENDING" | "REFUNDED";
};

const initialBookings: Booking[] = [
  {
    id: "#BK-1024",
    service: "Home Cleaning",
    technician: "James Wilson",
    date: "Aug 28, 2026",
    time: "10:00 AM",
    price: 80,
    status: "CONFIRMED",
  },
  {
    id: "#BK-1023",
    service: "AC Repair",
    technician: "Robert Smith",
    date: "Aug 30, 2026",
    time: "02:30 PM",
    price: 120,
    status: "PENDING",
  },
  {
    id: "#BK-1022",
    service: "Plumbing",
    technician: "Daniel Brown",
    date: "Aug 20, 2026",
    time: "11:00 AM",
    price: 95,
    status: "COMPLETED",
  },
  {
    id: "#BK-1021",
    service: "Electrical",
    technician: "Michael Johnson",
    date: "Aug 18, 2026",
    time: "04:00 PM",
    price: 110,
    status: "COMPLETED",
  },
  {
    id: "#BK-1020",
    service: "Home Cleaning",
    technician: "William Davis",
    date: "Aug 15, 2026",
    time: "09:30 AM",
    price: 75,
    status: "CANCELLED",
  },
];

const initialPayments: Payment[] = [
  {
    id: "#PAY-501",
    bookingId: "#BK-1022",
    service: "Plumbing",
    amount: 95,
    date: "Aug 20, 2026",
    status: "PAID",
  },
  {
    id: "#PAY-500",
    bookingId: "#BK-1021",
    service: "Electrical",
    amount: 110,
    date: "Aug 18, 2026",
    status: "PAID",
  },
  {
    id: "#PAY-499",
    bookingId: "#BK-1020",
    service: "Home Cleaning",
    amount: 75,
    date: "Aug 15, 2026",
    status: "REFUNDED",
  },
];

export default function CustomerDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);

  const [rating, setRating] = useState(0);

  const [review, setReview] = useState("");

  const [submittedReviews, setSubmittedReviews] = useState<string[]>([]);

  const cancelBooking = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) return;

    setBookings((current) =>
      current.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status: "CANCELLED",
            }
          : booking,
      ),
    );
  };

  const submitReview = () => {
    if (!reviewBooking || rating === 0 || !review.trim()) return;

    setSubmittedReviews((current) => [...current, reviewBooking.id]);

    setReviewBooking(null);
    setRating(0);
    setReview("");
  };

  const getBookingStatusClass = (status: BookingStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-[#EC620B]/10 text-[#EC620B]";

      case "CONFIRMED":
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

  const getPaymentStatusClass = (status: Payment["status"]) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-[#EC620B]/10 text-[#EC620B]";

      case "REFUNDED":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status === "PENDING" ||
      booking.status === "CONFIRMED" ||
      booking.status === "IN_PROGRESS",
  );

  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  );

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING",
  );

  const totalPaid = initialPayments
    .filter((payment) => payment.status === "PAID")
    .reduce((total, payment) => total + payment.amount, 0);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden px-4 py-6 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#00224A] md:text-3xl">
          Customer Dashboard
        </h1>

        <p className="mt-1 text-sm text-[#00224A]/60">
          Manage your bookings, payments, and service reviews.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Upcoming */}
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

        {/* Completed */}
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

        {/* Payments */}
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

      {/* Booking History */}
      <div className="mb-8 w-full max-w-full rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            Booking History
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            View and manage your service bookings.
          </p>
        </div>

        {/* Only table scrolls */}
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
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-[#00224A]/10 last:border-b-0 hover:bg-[#EC620B]/5"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#00224A]">
                    {booking.id}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                    {booking.service}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                    {booking.technician}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <p className="text-sm font-medium text-[#00224A]">
                      {booking.date}
                    </p>

                    <p className="mt-1 text-xs text-[#00224A]/50">
                      {booking.time}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#00224A]">
                    ${booking.price}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getBookingStatusClass(
                        booking.status,
                      )}`}
                    >
                      {booking.status.replace("_", " ")}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    {booking.status === "PENDING" ||
                    booking.status === "CONFIRMED" ? (
                      <button
                        type="button"
                        onClick={() => cancelBooking(booking.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Cancel
                      </button>
                    ) : booking.status === "COMPLETED" ? (
                      submittedReviews.includes(booking.id) ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          Reviewed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setReviewBooking(booking)}
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
              ))}
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

      {/* Payment History */}
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
              {initialPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-[#00224A]/10 last:border-b-0 hover:bg-[#EC620B]/5"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#00224A]">
                    {payment.id}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                    {payment.bookingId}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                    {payment.service}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                    {payment.date}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#00224A]">
                    ${payment.amount}
                  </td>

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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Section */}
      <div className="w-full rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            Review Completed Services
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Share your experience after completing a service.
          </p>
        </div>

        <div className="p-5">
          {completedBookings.length === 0 ? (
            <div className="py-6 text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-[#00224A]/30" />

              <p className="mt-3 text-sm font-semibold text-[#00224A]">
                No completed services yet
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col justify-between gap-4 rounded-lg border border-[#00224A]/10 p-4 md:flex-row md:items-center"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-[#00224A]">
                      {booking.service}
                    </h3>

                    <p className="mt-1 text-xs text-[#00224A]/60">
                      Technician: {booking.technician}
                    </p>

                    <p className="mt-1 text-xs text-[#00224A]/50">
                      {booking.date}
                    </p>
                  </div>

                  {submittedReviews.includes(booking.id) ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Review Submitted
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setReviewBooking(booking)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d95708]"
                    >
                      <Star className="h-4 w-4" />
                      Leave Review
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {reviewBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00224A]/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="border-b border-[#00224A]/10 p-5">
              <h2 className="text-lg font-bold text-[#00224A]">
                Leave a Review
              </h2>

              <p className="mt-1 text-sm text-[#00224A]/60">
                {reviewBooking.service} with {reviewBooking.technician}
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

              {/* Comment */}
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
                  onClick={() => {
                    setReviewBooking(null);
                    setRating(0);
                    setReview("");
                  }}
                  className="rounded-lg border border-[#00224A]/15 px-4 py-2.5 text-sm font-semibold text-[#00224A] hover:bg-[#00224A]/5"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={rating === 0 || !review.trim()}
                  onClick={submitReview}
                  className="rounded-lg bg-[#EC620B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d95708] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}