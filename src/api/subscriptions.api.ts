import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/helpers";

export const subscriptionsApi = createApi({
  reducerPath: "subscriptionsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPayments: builder.query<GetPaymentsResponse[], void>({
      query: () => {
        return {
          url: "subscriptions/my-payments",
          method: "GET",
        };
      },
    }),
    getCurrentSubscription: builder.query<GetCurrentSubscription, void>({
      query: () => {
        return {
          url: "subscriptions/current-subscriptions",
          method: "GET",
        };
      },
    }),
    getCostOfSubscription: builder.query<GetCostOfSubscription, void>({
      query: () => {
        return {
          url: "subscriptions/cost-of-subscriptions",
          method: "GET",
        };
      },
    }),
    createSubscription: builder.mutation<any, CreateSubscription>({
      query: (arg: CreateSubscription) => {
        return {
          url: "subscriptions",
          method: "POST",
          body: arg, //maybe mistake
        };
      },
    }),
    cancelAutoRenewal: builder.mutation<void, void>({
      query: () => {
        return {
          url: "subscriptions/canceled-auto-renewal",
          method: "POST",
        };
      },
    }),
  }),
});

export const { useGetPaymentsQuery, useCreateSubscriptionMutation, useGetCurrentSubscriptionQuery } = subscriptionsApi;

type CreateSubscription = {
  typeSubscription: string;
  paymentType: string;
  amount: number;
  baseUrl: string;
};

export type GetCostOfSubscription = {
  data: [
    {
      amount: number;
      typeDescription: string;
    },
  ];
};

export type GetCurrentSubscription = {
  data: Subscription[];
  hasAutoRenewal: boolean;
};

type Subscription = {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  autoRenewal: boolean;
};

export type GetPaymentsResponse = {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  price: number;
  subscriptionType: string;
  paymentType: string;
};
