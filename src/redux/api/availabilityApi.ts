import { baseApi } from "./baseApi";
// import { GetAllJobsResponse } from "@/types/jobType";

export const availabilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailability: builder.query({
      query: (params) => ({
        url: "/availability",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Availability"],
    }),
    createAvailability: builder.mutation({
      query: (data) => ({
        url: "/availability",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Availability"],
    }),
    updateAvailability: builder.mutation({
      query: ({ id, data }) => ({
        url: `/availability/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Availability"],
    }),
    deleteAvailability: builder.mutation({
      query: (id) => ({
        url: `/availability/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Availability"],
    }),
  }),
});

export const { 
    useGetAvailabilityQuery,
    useCreateAvailabilityMutation,
    useUpdateAvailabilityMutation,
    useDeleteAvailabilityMutation
 } = availabilityApi;
