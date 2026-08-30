"use client";

import { useGetMyBookingsQuery } from "@/redux/api/bookingApi";
import { useGetMyPaymentQuery, useGetPaymentByIdQuery } from "@/redux/api/paymentApi";
import { useCreateReviewMutation, useGetAllReviewQuery } from "@/redux/api/reviewApi";
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  Eye,
  Loader2,
  MessageSquare,
  Star,
  XCircle,
} from "lucide-react";
import { useState } from "react";



/* =========================================================
   TYPES
========================================================= */

type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "PAID";

type Payment = {
  id: string;
  bookingId: string;
  customerId: string;
  transactionId: string | null;
  amount: string | number;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;

  booking?: {
    id: string;
    customerId: string;
    technicianId: string;
    serviceId: string;
    availabilityId: string;
    totalAmount: string | number;
    scheduledAt: string;
    customerNote: string | null;
    status: string;

    service?: {
      id: string;
      name: string;
      description: string;
      price: string | number;
      location: string;
    };

    technician?: {
      id: string;
      userId: string;
      bio: string;
      experience: number;
      skills: string[];
      location: string;
      hourlyRate: string | number;
      averageRating: number;
      totalReviews: number;

      user?: {
        id: string;
        name: string;
        email: string;
        phone?: string;
        address?: string;
        image?: string | null;
      };
    };
  };
};

type Booking = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  availabilityId: string;
  totalAmount: string | number;
  scheduledAt: string;
  customerNote: string | null;
  status: string;

  service?: {
    id: string;
    name: string;
    description?: string;
    price: string | number;
    location?: string;
  };

  technician?: {
    id: string;
    userId: string;
    bio?: string;
    experience?: number;
    skills?: string[];
    location?: string;
    hourlyRate?: string | number;
    averageRating?: number;
    totalReviews?: number;

    user?: {
      id: string;
      name: string;
      email: string;
      phone?: string;
      address?: string;
      image?: string | null;
    };
  };
};

type Review = {
  id: string;
  customerId?: string;
  technicianId?: string;
  bookingId?: string;
  rating: number;
  comment?: string;
  review?: string;
  createdAt?: string;
};

type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

/* =========================================================
   HELPERS
========================================================= */

const formatDate = (date: string) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatDateTime = (date: string) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getAmount = (amount: string | number | undefined) => {
  const value = Number(amount ?? 0);

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/* =========================================================
   COMPONENT
========================================================= */

export default function CustomerPaymentsReviewsPage() {
  /* =======================================================
     API
  ======================================================= */

  const {
    data: paymentResponse,
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = useGetMyPaymentQuery({});

  const {
    data: bookingResponse,
    isLoading: bookingsLoading,
    isError: bookingsError,
  } = useGetMyBookingsQuery({});

  const {
    data: reviewResponse,
    isLoading: reviewsLoading,
  } = useGetAllReviewQuery({});

  const [createReview, { isLoading: creatingReview }] =
    useCreateReviewMutation();

  /* =======================================================
     DATA
  ======================================================= */

  const payments: Payment[] =
    (paymentResponse as ApiResponse<Payment[]> | undefined)?.data ?? [];

  const bookings: Booking[] =
    (bookingResponse as ApiResponse<Booking[]> | undefined)?.data ?? [];

  const reviews: Review[] =
    (reviewResponse as ApiResponse<Review[]> | undefined)?.data ?? [];

  /* =======================================================
     STATE
  ======================================================= */

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [rating, setRating] = useState(0);

  const [reviewText, setReviewText] = useState("");

  const [selectedPaymentId, setSelectedPaymentId] =
    useState<string | null>(null);

  /* =======================================================
     PAYMENT DETAILS
  ======================================================= */

  const { data: paymentDetailsResponse } =
    useGetPaymentByIdQuery(selectedPaymentId!, {
      skip: !selectedPaymentId,
    });

  const selectedPayment = (
    paymentDetailsResponse as ApiResponse<Payment> | undefined
  )?.data;

  /* =======================================================
     REVIEWABLE BOOKINGS
  ======================================================= */

  const reviewableBookings = bookings.filter((booking) => {
    /*
      Only completed bookings should be reviewable.
    */

    const completedStatuses = [
      "COMPLETED",
      "PAID",
    ];

    if (!completedStatuses.includes(booking.status)) {
      return false;
    }

    /*
      If a review already exists for this booking,
      don't show it again.
    */

    const alreadyReviewed = reviews.some(
      (review) => review.bookingId === booking.id,
    );

    return !alreadyReviewed;
  });

  /* =======================================================
     PAYMENT SUMMARY
  ======================================================= */

  const totalPayments = payments.length;

  const totalPaid = payments
    .filter(
      (payment) =>
        payment.status === "COMPLETED" ||
        payment.status === "PAID",
    )
    .reduce(
      (total, payment) => total + Number(payment.amount ?? 0),
      0,
    );

  /* =======================================================
     REVIEW SUBMIT
  ======================================================= */

  const handleSubmitReview = async () => {
    if (!selectedBooking || rating === 0 || !reviewText.trim()) {
      return;
    }

    try {
      /*
        Your backend should receive the booking,
        technician, rating and comment.

        If your backend uses a slightly different
        field name, change it here.
      */

      await createReview({
        bookingId: selectedBooking.id,
        technicianId: selectedBooking.technicianId,
        rating,
        comment: reviewText.trim(),
      }).unwrap();

      setSelectedBooking(null);
      setRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  /* =======================================================
     STATUS CLASS
  ======================================================= */

  const getPaymentStatusClass = (status: PaymentStatus) => {
    switch (status) {
      case "COMPLETED":
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

  /* =======================================================
     STATUS ICON
  ======================================================= */

  const PaymentStatusIcon = ({
    status,
  }: {
    status: PaymentStatus;
  }) => {
    if (status === "COMPLETED" || status === "PAID") {
      return <CheckCircle2 className="h-3 w-3" />;
    }

    if (status === "PENDING") {
      return <Clock3 className="h-3 w-3" />;
    }

    if (status === "FAILED") {
      return <XCircle className="h-3 w-3" />;
    }

    return null;
  };

  /* =======================================================
     LOADING
  ======================================================= */

  const pageLoading =
    paymentsLoading || bookingsLoading || reviewsLoading;

  if (pageLoading) {
    return (
      <div className="flex min-h-[500px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#EC620B]" />

          <p className="text-sm font-medium text-[#00224A]/60">
            Loading payments & reviews...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (paymentsError || bookingsError) {
    return (
      <div className="flex min-h-[500px] items-center justify-center px-5">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-5 text-center">
          <XCircle className="mx-auto h-8 w-8 text-red-500" />

          <h2 className="mt-3 font-semibold text-red-700">
            Something went wrong
          </h2>

          <p className="mt-1 text-sm text-red-600">
            We could not load your payment information.
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="container w-full overflow-x-hidden px-4 py-6 md:px-6 lg:px-8">

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#00224A] md:text-3xl">
          Payments & Reviews
        </h1>

        <p className="mt-1 text-sm text-[#00224A]/60">
          Manage your payments and share your experience with
          technicians.
        </p>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {/* Total Payments */}

        <div className="rounded-xl border border-[#00224A]/10 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-[#00224A]/60">
                Total Payments
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#00224A]">
                {totalPayments}
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
                ${getAmount(totalPaid)}
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

      {/* =================================================
          PAYMENT HISTORY
      ================================================= */}

      <div className="mb-8 w-full overflow-x-hidden rounded-xl border border-[#00224A]/10 bg-white shadow-sm">

        <div className="border-b border-[#00224A]/10 p-5">
          <h2 className="text-lg font-bold text-[#00224A]">
            Payment History
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            View your previous payments and transaction status.
          </p>
        </div>

        {payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
            <CreditCard className="h-10 w-10 text-[#00224A]/20" />

            <h3 className="mt-3 text-sm font-semibold text-[#00224A]">
              No payments yet
            </h3>

            <p className="mt-1 text-xs text-[#00224A]/50">
              Your payment history will appear here.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-full overflow-x-auto">

            <table className="w-full min-w-[950px]">

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

                {payments.map((payment) => {

                  const serviceName =
                    payment.booking?.service?.name ??
                    "Service";

                  const technicianName =
                    payment.booking?.technician?.user?.name ??
                    "Technician";

                  return (
                    <tr
                      key={payment.id}
                      className="border-b border-[#00224A]/10 last:border-b-0 hover:bg-[#EC620B]/5"
                    >

                      {/* Payment */}

                      <td className="whitespace-nowrap px-5 py-4">
                        <p className="max-w-[180px] truncate text-sm font-semibold text-[#00224A]">
                          {payment.id}
                        </p>

                        <p className="mt-1 text-xs text-[#00224A]/50">
                          Booking: {payment.bookingId}
                        </p>
                      </td>

                      {/* Service */}

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                        {serviceName}
                      </td>

                      {/* Technician */}

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                        {technicianName}
                      </td>

                      {/* Date */}

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-[#00224A]">
                        {formatDate(payment.paidAt ?? payment.createdAt)}
                      </td>

                      {/* Amount */}

                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#00224A]">
                        ${getAmount(payment.amount)}
                      </td>

                      {/* Status */}

                      <td className="whitespace-nowrap px-5 py-4">

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getPaymentStatusClass(
                            payment.status,
                          )}`}
                        >
                          <PaymentStatusIcon
                            status={payment.status}
                          />

                          {payment.status}
                        </span>

                      </td>

                      {/* Action */}

                      <td className="whitespace-nowrap px-5 py-4">

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPaymentId(payment.id)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#00224A]/15 px-3 py-2 text-xs font-semibold text-[#00224A] transition-colors hover:border-[#EC620B] hover:text-[#EC620B]"
                        >
                          <Eye className="h-3.5 w-3.5" />

                          View
                        </button>

                      </td>

                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        )}

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

      {/* =================================================
          REVIEWS
      ================================================= */}

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
                You have no completed services waiting for a
                review.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {reviewableBookings.map((booking) => {

                const isSelected =
                  selectedBooking?.id === booking.id;

                const technicianName =
                  booking.technician?.user?.name ??
                  "Technician";

                const serviceName =
                  booking.service?.name ??
                  "Service";

                return (
                  <div
                    key={booking.id}
                    className="rounded-xl border border-[#00224A]/10 p-4"
                  >

                    {/* Booking Info */}

                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-sm font-semibold text-[#00224A]">
                            {serviceName}
                          </h3>

                          <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                            Completed
                          </span>

                        </div>

                        <p className="mt-1 text-sm text-[#00224A]/60">
                          Technician: {technicianName}
                        </p>

                        <p className="mt-1 text-xs text-[#00224A]/50">
                          {formatDate(booking.scheduledAt)} •{" "}
                          {booking.id}
                        </p>

                      </div>

                      {!isSelected && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setRating(0);
                            setReviewText("");
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

                        {/* Review */}

                        <textarea
                          value={reviewText}
                          onChange={(e) =>
                            setReviewText(e.target.value)
                          }
                          rows={4}
                          placeholder="Write your review..."
                          className="mt-4 w-full resize-none rounded-lg border border-[#00224A]/15 p-3 text-sm text-[#00224A] outline-none transition-colors placeholder:text-[#00224A]/40 focus:border-[#EC620B]"
                        />

                        {/* Buttons */}

                        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedBooking(null);
                              setRating(0);
                              setReviewText("");
                            }}
                            disabled={creatingReview}
                            className="rounded-lg border border-[#00224A]/15 px-4 py-2.5 text-sm font-semibold text-[#00224A] transition-colors hover:border-[#EC620B] hover:text-[#EC620B] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            disabled={
                              rating === 0 ||
                              !reviewText.trim() ||
                              creatingReview
                            }
                            onClick={handleSubmitReview}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d95708] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {creatingReview && (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            )}

                            {creatingReview
                              ? "Submitting..."
                              : "Submit Review"}
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

      {/* =================================================
          PAYMENT DETAILS MODAL
      ================================================= */}

      {selectedPaymentId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedPaymentId(null)}
        >

          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-[#00224A]/10 p-5">

              <div>
                <h2 className="text-lg font-bold text-[#00224A]">
                  Payment Details
                </h2>

                <p className="mt-1 text-xs text-[#00224A]/50">
                  Transaction information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPaymentId(null)}
                className="rounded-lg p-2 text-[#00224A]/50 transition-colors hover:bg-[#00224A]/5 hover:text-[#00224A]"
              >
                <XCircle className="h-5 w-5" />
              </button>

            </div>

            {selectedPayment ? (

              <div className="space-y-5 p-5">

                {/* Amount */}

                <div className="rounded-xl bg-[#00224A]/5 p-4">

                  <p className="text-xs font-medium text-[#00224A]/50">
                    Amount
                  </p>

                  <p className="mt-1 text-3xl font-bold text-[#00224A]">
                    ${getAmount(selectedPayment.amount)}
                  </p>

                </div>

                {/* Status */}

                <div className="flex items-center justify-between">

                  <span className="text-sm text-[#00224A]/60">
                    Status
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getPaymentStatusClass(
                      selectedPayment.status,
                    )}`}
                  >
                    <PaymentStatusIcon
                      status={selectedPayment.status}
                    />

                    {selectedPayment.status}
                  </span>

                </div>

                {/* Service */}

                <div className="flex items-start justify-between gap-4">

                  <span className="text-sm text-[#00224A]/60">
                    Service
                  </span>

                  <span className="text-right text-sm font-semibold text-[#00224A]">
                    {selectedPayment.booking?.service?.name ??
                      "N/A"}
                  </span>

                </div>

                {/* Technician */}

                <div className="flex items-start justify-between gap-4">

                  <span className="text-sm text-[#00224A]/60">
                    Technician
                  </span>

                  <span className="text-right text-sm font-semibold text-[#00224A]">
                    {selectedPayment.booking?.technician?.user
                      ?.name ?? "N/A"}
                  </span>

                </div>

                {/* Booking */}

                <div className="flex items-start justify-between gap-4">

                  <span className="text-sm text-[#00224A]/60">
                    Booking ID
                  </span>

                  <span className="max-w-[230px] break-all text-right text-xs font-medium text-[#00224A]">
                    {selectedPayment.bookingId}
                  </span>

                </div>

                {/* Transaction */}

                <div className="flex items-start justify-between gap-4">

                  <span className="text-sm text-[#00224A]/60">
                    Transaction ID
                  </span>

                  <span className="max-w-[230px] break-all text-right text-xs font-medium text-[#00224A]">
                    {selectedPayment.transactionId ??
                      "Not available"}
                  </span>

                </div>

                {/* Paid Date */}

                <div className="flex items-start justify-between gap-4">

                  <span className="text-sm text-[#00224A]/60">
                    Paid At
                  </span>

                  <span className="text-right text-sm font-medium text-[#00224A]">
                    {selectedPayment.paidAt
                      ? formatDateTime(selectedPayment.paidAt)
                      : "Not paid yet"}
                  </span>

                </div>

              </div>

            ) : (

              <div className="flex min-h-[250px] items-center justify-center">

                <div className="flex flex-col items-center gap-3">

                  <Loader2 className="h-7 w-7 animate-spin text-[#EC620B]" />

                  <p className="text-sm text-[#00224A]/50">
                    Loading payment details...
                  </p>

                </div>

              </div>

            )}

            {/* Modal Footer */}

            <div className="border-t border-[#00224A]/10 p-5">

              <button
                type="button"
                onClick={() => setSelectedPaymentId(null)}
                className="w-full rounded-lg bg-[#00224A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#001a38]"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}