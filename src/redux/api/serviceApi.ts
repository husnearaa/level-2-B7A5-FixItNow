import { baseApi } from "./baseApi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: (params) => ({
        url: "/services",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Service"],
    }),

    getServiceById: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),

    createService: builder.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
  query: ({ id }) => ({
    url: `/services/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Service"],
}),
  }),
});

export const {
useGetAllServiceQuery,
useGetServiceByIdQuery,
useCreateServiceMutation,
useUpdateServiceMutation,
useDeleteServiceMutation,
} = serviceApi;
