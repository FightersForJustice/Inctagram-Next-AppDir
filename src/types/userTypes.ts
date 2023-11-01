export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  accessToken: string;
}

export interface IUserRegisterRequest extends IUserLoginRequest {
  userName: string;
}

export interface ILoginWithGoogleOAuthResponse extends IUserLoginResponse {
  email: string;
}

export interface ILoginWithGoogleOAuthRequest {
  code: string;
}

export interface IUserModel {
  userId: number;
  userName: string;
  email: string;
}

export interface IUserMeResponseData {
  userId: number;
  userName: string;
  email: string;
}
