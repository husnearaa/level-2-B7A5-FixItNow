import { baseApi } from "./baseApi";

export const technicianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTechnicians: builder.query({
      query: (params) => ({
        url: "/technicians",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Technician"],
    }),

    getTechnicianProfileById: builder.query({
      query: (id) => ({
        url: `/technicians/${id}`,
        method: "GET",
      }),
      providesTags: ["Technician"],
    }),

    createTechnicianProfile: builder.mutation({
      query: (data) => ({
        url: "/technicians/profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Technician"],
    }),

    updateTechnicianProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/technicians/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Technician"],
    }),
  }),
});

export const {
  useGetAllTechniciansQuery,
  useGetTechnicianProfileByIdQuery,
  useCreateTechnicianProfileMutation,
  useUpdateTechnicianProfileMutation,
} = technicianApi;
