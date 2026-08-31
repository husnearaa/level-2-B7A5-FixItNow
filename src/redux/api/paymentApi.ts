import { baseApi } from "./baseApi";

export const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyPayment: builder.query({
      query: (params) => ({
        url: "/payments",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Payment"],
    }),

    getPaymentById: builder.query({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),

    createPayment: builder.mutation({
      query: (data) => ({
        url: "/payments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),
    
  }),
});

export const {
  useGetMyPaymentQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
} = PaymentApi;