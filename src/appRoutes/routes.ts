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
  PUBLIC_PROFILE: '/public-profile',
  PUBLIC_POST_PAGE: '/public-post-page',
  PUBLIC_PROFILE_PAGE: '/public-post-page',
  ADMIN_USERS_LIST: '/admin/userslist',
  ADMIN_STATISTICS: '/admin/statistics',
  ADMIN_PAYMENTS_LIST: '/admin/paymentslist',
  ADMIN_POSTS_LIST: '/admin/postslist',
  ADMIN_USER_PROFILE: '/admin/profile',
});

export const ROUTES = Object.freeze({
  HOME_PAGE: '/',
  PROFILE: '/profile',
});

export const ADMIN_ROUTES = Object.freeze({
  ADMIN_USERS_LIST: '/admin/userslist',
  ADMIN_STATISTICS: '/admin/statistics',
  ADMIN_PAYMENTS_LIST: '/admin/paymentslist',
  ADMIN_POSTS_LIST: '/admin/postslist',
  ADMIN_USER_PROFILE: '/admin/profile',
  ADMIN_USER_PHOTOS: '/admin/photos',
  ADMIN_USER_PAYMENTS: '/admin/payments',
  ADMIN_USER_FOLLOWERS: '/admin/followers',
  ADMIN_USER_FOLLOWING: '/admin/following',
});

export const AUTH_ROUTES_ARRAY = Object.values(AUTH_ROUTES);
export const ADMIN_ROUTES_ARRAY = Object.values(ADMIN_ROUTES);
