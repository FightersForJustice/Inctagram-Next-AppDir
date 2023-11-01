import {
  ILoginWithGoogleOAuthRequest,
  ILoginWithGoogleOAuthResponse,
  IUserLoginRequest,
  IUserLoginResponse,
  IUserModel,
  IUserRegisterRequest,
} from "@/types/userTypes";
import { api } from "@/api/api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postAuthorization: builder.mutation<void, IUserRegisterRequest>({
      query: (credentials: IUserRegisterRequest) => {
        return {
          url: "auth/registration",
          method: "POST",
          body: credentials,
        };
      },
    }),
    postLogin: builder.mutation<IUserLoginResponse, IUserLoginRequest>({
      query: (credentials: IUserLoginRequest) => {
        return {
          url: "auth/login",
          method: "POST",
          body: credentials,
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
    getAuthMe: builder.query<IUserModel, void>({
      query: () => {
        return {
          url: "auth/me",
          method: "GET",
        };
      },
    }),
    loginWithGoogleOAuth: builder.mutation<ILoginWithGoogleOAuthResponse, ILoginWithGoogleOAuthRequest>({
      query: (code) => {
        return {
          url: "auth/google/login",
          method: "POST",
          body: code,
        };
      },
    }),
    loginWithGitHubOAuth: builder.query<void, void>({
      query: () => {
        return {
          url: "auth/github/login",
          method: "GET",
        };
      },
    }),
  }),
});

export const StatusCode = {
  badRequest: 400,
  unauthorized: 401,
  noAddress: 404,
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
  useLoginWithGoogleOAuthMutation,
} = authApi;
