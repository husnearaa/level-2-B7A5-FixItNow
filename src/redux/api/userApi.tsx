import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (params) => ({
        url: "/admin/users",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["UserData"],
    }),

    
    updateUserStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["UserData"],
    }),

  }),
});

export const {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} = userApi;
