import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export let authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://inctagram-api.vercel.app/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postAuthorization: builder.mutation<any, { userName: string; email: string; password: string }>({
      query: (user: { userName: string; email: string; password: string }) => {
        return {
          url: "auth/registration",
          method: "POST",
          body: {
            ...user,
          },
        };
      },
    }),
    postLogin: builder.mutation<any, { email: string; password: string }>({
      query: (user: { email: string; password: string }) => {
        return {
          url: "auth/login",
          method: "POST",
          body: {
            ...user,
          },
        };
      },
    }),
    postRegistrationConfirmation: builder.mutation<any, { confirmationCode: string }>({
      query: (user: { confirmationCode: string }) => {
        return {
          url: "auth/registration-confirmation",
          method: "POST",
          body: {
            ...user,
          },
        };
      },
    }),
    postRegistrationEmailResending: builder.mutation<any, { email: string }>({
      query: (user: { email: string }) => {
        return {
          url: "auth/registration-email-resending",
          method: "POST",
          body: {
            ...user,
          },
        };
      },
    }),
    postPasswordRecovery: builder.mutation<void, { email: string; recaptcha: string }>({
      query: (user: { email: string; recaptcha: string }) => {
        return {
          url: "auth/password-recovery",
          method: "POST",
          body: {
            ...user,
          },
        };
      },
    }),
    postPasswordCheckRecoveryCode: builder.mutation<any, { recoveryCode: string }>({
      query: (user: { recoveryCode: string }) => {
        return {
          url: "auth/check-recovery-code",
          method: "POST",
          body: {
            ...user,
          },
        };
      },
    }),
    postNewPassword: builder.mutation<void, { newPassword: string; recoveryCode: string }>({
      query: (user: { newPassword: string; recoveryCode: string }) => {
        return {
          url: "auth/new-password",
          method: "POST",
          body: {
            ...user,
          },
        };
      },
    }),
    postLogout: builder.mutation<void, void>({
      query: () => {
        return {
          url: "auth/logout",
          method: "POST",
        };
      },
    }),
    postUpdateTokens: builder.mutation<any, void>({
      query: () => {
        return {
          url: "auth/update-tokens",
          method: "POST",
        };
      },
    }),
    getAuthMe: builder.query<AuthMeResponse, void>({
      query: () => {
        return {
          url: "auth/me",
          method: "GET",
        };
      },
    }),
  }),
});

type ResponseMessages = {
  message: string;
  field: string;
};

type Response = {
  statusCode: number;
  messages: ResponseMessages[];
  error: string;
};

type AuthMeResponse = {
  userId: number;
  userName: string;
  email: string;
};

export const StatusCode = {
  badRequest: 400,
  unauthorized: 401,
};

export let {
  usePostAuthorizationMutation,
  usePostLoginMutation,
  usePostRegistrationConfirmationMutation,
  usePostRegistrationEmailResendingMutation,
  usePostPasswordRecoveryMutation,
  usePostPasswordCheckRecoveryCodeMutation,
  usePostNewPasswordMutation,
  usePostLogoutMutation,
  usePostUpdateTokensMutation,
  useGetAuthMeQuery,
} = authApi;
