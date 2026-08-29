import { baseApi } from "./baseApi";
// import { GetAllJobsResponse } from "@/types/jobType";

export const BookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (params) => ({
        url: "/admin/bookings",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Bookings"],
    }),

    // getCompanyAllJob: builder.query({
    //   query: (id) => ({
    //     url: `/admin/company-all-jobs/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Bookings"],
    // }),

    // getAllSkills: builder.query({
    //   query: (params) => ({
    //     url: "/skill",
    //     method: "GET",
    //     params: { ...params },
    //   }),
    //   providesTags: ["Bookings"],
    // }),

    // getSingleJobById: builder.query({
    //   query: (id) => ({
    //     url: `/admin/single-job/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Bookings"],
    // }),

    // createJob: builder.mutation({
    //   query: (data) => ({
    //     url: "/job/create",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Jobs"],
    // }),


    // deleteJobPost: builder.mutation({
    //   query: (id) => ({
    //     url: `/job/delete/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["UserData"],
    // }),
  }),
});

export const {
  useGetAllBookingsQuery,
//   useGetSingleJobByIdQuery,
 
} = BookingsApi;
