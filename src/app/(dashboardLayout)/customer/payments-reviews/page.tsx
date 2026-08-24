"use client";

import {
  CheckCircle2,
  Clock3,
  CreditCard,
  Eye,
  MessageSquare,
  Star,
  XCircle,
} from "lucide-react";
import { useState } from "react";

type PaymentStatus = "PAID" | "PENDING" | "FAILED";

type Payment = {
  id: string;
  bookingId: string;
  service: string;
  technician: string;
  date: string;
  amount: number;
  method: string;
  status: PaymentStatus;
};

type ReviewableBooking = {
  id: string;
  service: string;
  technician: string;
  date: string;
};

const initialPayments: Payment[] = [
  {
    id: "#PAY-5012",
    bookingId: "#BK-1024",
    service: "Home Cleaning",
    technician: "James Wilson",
    date: "Aug 20, 2026",
    amount: 80,
    method: "Stripe",
    status: "PAID",
  },
  {
    id: "#PAY-5011",
    bookingId: "#BK-1021",
    service: "AC Repair",
    technician: "Robert Smith",
    date: "Aug 18, 2026",
    amount: 120,
    method: "Stripe",
    status: "PAID",
  },
  {
    id: "#PAY-5010",
    bookingId: "#BK-1018",
    service: "Plumbing",
    technician: "Michael Brown",
    date: "Aug 15, 2026",
    amount: 95,
    method: "Stripe",
    status: "PENDING",
  },
  {
    id: "#PAY-5009",
    bookingId: "#BK-1015",
    service: "Electrical",
    technician: "David Miller",
    date: "Aug 10, 2026",
    amount: 150,
    method: "Stripe",
    status: "FAILED",
  },
];

const initialReviewableBookings: ReviewableBooking[] = [
  {
    id: "#BK-1024",
    service: "Home Cleaning",
    technician: "James Wilson",
    date: "Aug 20, 2026",
  },
  {
    id: "#BK-1021",
    service: "AC Repair",
    technician: "Robert Smith",
    date: "Aug 18, 2026",
  },
];

export default function CustomerPaymentsReviewsPage() {
  const [payments] = useState<Payment[]>(initialPayments);

  const [reviewableBookings, setReviewableBookings] = useState<
    ReviewableBooking[]
  >(initialReviewableBookings);

  const [selectedBooking, setSelectedBooking] =
    useState<ReviewableBooking | null>(null);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState<string[]>([]);

  const handleSubmitReview = () => {
    if (!selectedBooking || rating === 0 || !review.trim()) return;

    setSubmittedReviews((current) => [
      ...current,
      selectedBooking.id,
    ]);

    setReviewableBookings((current) =>
      current.filter((booking) => booking.id !== selectedBooking.id),
    );

    setSelectedBooking(null);
    setRating(0);
    setReview("");
  };

  const getPaymentStatusClass = (status: PaymentStatus) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-[#EC620B]/10 text-[#EC620B]";

      case "FAILED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden px-4 py-6 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#00224A] md:text-3xl">
          Payments & Reviews
        </h1>

        <p className="mt-1 text-sm text-[#00224A]/60">
          Manage your payments and share your experience with technicians.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Payments */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Total Payments
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                {payments.length}
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <CreditCard className="h-5 w-5 text-white" />
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
                $
                {payments
                  .filter((payment) => payment.status === "PAID")
                  .reduce((total, payment) => total + payment.amount, 0)}
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Pending Reviews
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                {reviewableBookings.length}
              </h2>
            </div>

            <div className="rounded-lg bg-[#EC620B] p-3">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="mb-8 w-full max-w-full overflow-hidden rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            Payment History
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            View your previous payments and transaction status.
          </p>
        </div>

        {/* Table scroll only */}
        <div className="w-full max-w-full overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#00224A]/10 bg-[#00224A]/5">
                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Payment
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Service
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Technician
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

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-[#00224A]/10 last:border-b-0 hover:bg-[#EC620B]/5"
                >
                  <td className="whitespace-nowrap px-5 py-4">
                    <p className="text-sm font-semibold text-[#00224A]">
                      {payment.id}
                    </p>

                    <p className="mt-1 text-xs text-[#00224A]/50">
                      {payment.bookingId}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                    {payment.service}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                    {payment.technician}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                    {payment.date}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#00224A]">
                    ${payment.amount}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getPaymentStatusClass(
                        payment.status,
                      )}`}
                    >
                      {payment.status === "PAID" && (
                        <CheckCircle2 className="h-3 w-3" />
                      )}

                      {payment.status === "PENDING" && (
                        <Clock3 className="h-3 w-3" />
                      )}

                      {payment.status === "FAILED" && (
                        <XCircle className="h-3 w-3" />
                      )}

                      {payment.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#00224A]/15 px-3 py-2 text-xs font-semibold text-[#00224A] transition-colors hover:border-[#EC620B] hover:text-[#EC620B]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </button>
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
              {payments.length}
            </span>{" "}
            payment records
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="w-full rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            My Reviews
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Share your experience after completing a service.
          </p>
        </div>

        <div className="p-5">
          {reviewableBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#00224A]">
                All caught up!
              </h3>

              <p className="mt-1 text-xs text-[#00224A]/50">
                You have no completed services waiting for a review.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviewableBookings.map((booking) => {
                const isSelected = selectedBooking?.id === booking.id;

                return (
                  <div
                    key={booking.id}
                    className="rounded-xl border border-[#00224A]/10 p-4"
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-[#00224A]">
                            {booking.service}
                          </h3>

                          <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                            Completed
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-[#00224A]/60">
                          Technician: {booking.technician}
                        </p>

                        <p className="mt-1 text-xs text-[#00224A]/50">
                          {booking.date} • {booking.id}
                        </p>
                      </div>

                      {!isSelected && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setRating(0);
                            setReview("");
                          }}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d95708]"
                        >
                          <Star className="h-4 w-4" />
                          Leave Review
                        </button>
                      )}
                    </div>

                    {/* Review Form */}
                    {isSelected && (
                      <div className="mt-5 border-t border-[#00224A]/10 pt-5">
                        <h4 className="text-sm font-semibold text-[#00224A]">
                          How was your experience?
                        </h4>

                        {/* Stars */}
                        <div className="mt-3 flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              aria-label={`Rate ${star} stars`}
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

                        <textarea
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          rows={4}
                          placeholder="Write your review..."
                          className="mt-4 w-full resize-none rounded-lg border border-[#00224A]/15 p-3 text-sm text-[#00224A] outline-none transition-colors placeholder:text-[#00224A]/40 focus:border-[#EC620B]"
                        />

                        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedBooking(null);
                              setRating(0);
                              setReview("");
                            }}
                            className="rounded-lg border border-[#00224A]/15 px-4 py-2.5 text-sm font-semibold text-[#00224A] transition-colors hover:border-[#EC620B] hover:text-[#EC620B]"
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            disabled={rating === 0 || !review.trim()}
                            onClick={handleSubmitReview}
                            className="rounded-lg bg-[#EC620B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d95708] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}