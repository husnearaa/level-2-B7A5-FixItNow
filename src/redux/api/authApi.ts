import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    socialAuth: builder.mutation({
      query: (credentials) => ({
        url: "/auth/social-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["User"],
    }),
    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/otp/resend-otp",
        method: "POST",
        body: email,
      }),
    }),
    forgetResendOtp: builder.mutation({
      query: (email) => ({
        url: "/otp/forget-resend-otp",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/verify-signup-otp",
        method: "POST",
        body: data,
      }),
    }),
    passwordVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/verify-reset-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    userAccountDelete: builder.mutation({
      query: () => ({
        url: `/user/delete-own-profile`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getDepartment: builder.query({
      query: () => "/department",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSocialAuthMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  usePasswordVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMeQuery,
  useUpdateUserMutation,
  useUserAccountDeleteMutation,
  useGetDepartmentQuery,
  useForgetResendOtpMutation,
} = authApi;
