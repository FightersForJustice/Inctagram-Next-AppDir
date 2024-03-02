export const AUTH_ROUTES = Object.freeze({
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  REGISTRATION_CONFIRMATION: '/auth/registration-confirmation',
  RECOVERY: '/auth/recovery',
  VERIFICATION: '/email-verification',
  EMAIL_EXPIRED: '/email-expired',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFICATION_INVALID: '/verification-invalid',
  PRIVACY_POLICY: '/agreements/privacy-policy',
  // PRIVACY_POLICY_PROFILE: '/agreements/privacy-policy-profile',
  TERMS_OF_SERVICE: '/agreements/terms-of-service',
  PROFILE_NULL: '/profile/null',
});

export const AUTH_ROUTES_ARRAY = Object.values(AUTH_ROUTES);

export const ROUTES = Object.freeze({
  HOME_PAGE: '/',
  PROFILE: '/profile',
});
