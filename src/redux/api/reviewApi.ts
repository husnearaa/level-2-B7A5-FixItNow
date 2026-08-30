import { baseApi } from "./baseApi";

export const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: (params) => ({
        url: "/reviews",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Review"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review", "Bookings"],
    }),
  }),
});

export const {
  useGetAllReviewQuery,
  useCreateReviewMutation,
} = ReviewApi;