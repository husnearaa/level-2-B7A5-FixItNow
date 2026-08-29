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

    // getUserById: builder.query({
    //   query: (id) => ({
    //     url: `/admin/single-user/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["UserData"],
    // }),

    // getUserProfileDetailsById: builder.query({
    //   query: (id) => ({
    //     url: `/admin/user-profile-details/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Jobs"],
    // }),

    // bannedUser: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/admin/banned-communities-user/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["UserData"],
    // }),

    // unbannedUser: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/admin/unbanned-communities-user/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["UserData"],
    // }),

    // suspendUser: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/admin/suspend-user/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["UserData"],
    // }),
  }),
});

export const {
  useGetAllUserQuery,
//   useGetUserByIdQuery,
//   useGetUserProfileDetailsByIdQuery,
//   useBannedUserMutation,
//   useUnbannedUserMutation,
//   useSuspendUserMutation,
} = userApi;
