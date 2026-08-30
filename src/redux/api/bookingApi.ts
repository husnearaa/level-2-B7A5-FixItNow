import { baseApi } from "./baseApi";

// import { GetAllJobsResponse } from "@/types/jobType";

export const BookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ADMIN - GET ALL BOOKINGS
    getAllBookings: builder.query({
      query: (params) => ({
        url: "/admin/bookings",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Bookings"],
    }),

    // customer - GET MY BOOKINGS
    getMyBookings: builder.query({
      query: (params) => ({
        url: "/booking/my-bookings",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Bookings"],
    }),

    // TECHNICIAN

    getTechnicianBookings: builder.query({
      query: (params) => ({
        url: "/booking/technician-bookings",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Bookings"],
    }),


  getBookingById: builder.query({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),

       createBooking: builder.mutation({
      query: (data) => ({
        url: "/booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),

    // TECHNICIAN - UPDATE BOOKING STATUS
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/booking/${id}/status`,
        method: "PATCH",
        body: {
          status,
        },
      }),
      invalidatesTags: ["Bookings"],
    }),

    // TECHNICIAN - cancel BOOKING 
     cancelBooking: builder.mutation({
      query: ({ id }) => ({
        url: `/booking/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useGetTechnicianBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingStatusMutation,
  useGetBookingByIdQuery,
  useCancelBookingMutation,
} = BookingsApi;
