import { baseApi } from "./baseApi";
// import { GetAllJobsResponse } from "@/types/jobType";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (params) => ({
        url: "/admin/categories",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Category"],
    }),

    // getSingleJobById: builder.query({
    //   query: (id) => ({
    //     url: `/admin/single-job/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Jobs"],
    // }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/admin/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
} = categoriesApi;
