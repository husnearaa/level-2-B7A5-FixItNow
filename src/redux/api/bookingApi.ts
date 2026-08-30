// import { baseApi } from "./baseApi";
// // import { GetAllJobsResponse } from "@/types/jobType";

// export const BookingsApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllBookings: builder.query({
//       query: (params) => ({
//         url: "/admin/bookings",
//         method: "GET",
//         params: { ...params },
//       }),
//       providesTags: ["Bookings"],
//     }),

//   }),
// });

// export const {
//   useGetAllBookingsQuery,

 
// } = BookingsApi;

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

    // TECHNICIAN - GET MY BOOKINGS
    getMyBookings: builder.query({
      query: (params) => ({
        url: "/booking/my-bookings",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Bookings"],
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
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useUpdateBookingStatusMutation,
} = BookingsApi;
