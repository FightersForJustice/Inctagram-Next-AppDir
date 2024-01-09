const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const auth = 'auth'

export const routes = Object.freeze({
  //AUTH
  LOGIN: `${baseUrl + auth}/login`,
  ME: `${baseUrl + auth}/me`,
  UPDATE_TOKENS: `${baseUrl + auth}/update-tokens`,
  LOGOUT: `${baseUrl + auth + auth}/logout`,
  GITHUB_LOGIN: `${baseUrl + auth}/github/login`,
  GOOGLE_LOGIN: `${baseUrl + auth}/google/login`,
  PASSWORD_RECOVERY: `${baseUrl + auth}/password-recovery`,
  CHECK_RECOVERY_CODE: `${baseUrl + auth}/check-recovery-code`,
  NEW_PASSWORD: `${baseUrl + auth}/new-password`,
  SIGN_UP: `${baseUrl + auth}/registration`,
  //SESSIONS
  TERMINATE_ALL_SESSIONS: `${baseUrl}sessions/terminate-all`,
});
