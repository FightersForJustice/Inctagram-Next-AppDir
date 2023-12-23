export const routes = Object.freeze({
    LOGIN: `${process.env.NEXT_PUBLIC_BASE_URL}auth/login`,
    ME: `${process.env.NEXT_PUBLIC_BASE_URL}auth/me`,
    UPDATE_TOKENS: `${process.env.NEXT_PUBLIC_BASE_URL}auth/update-tokens`,
    LOGOUT: `${process.env.NEXT_PUBLIC_BASE_URL}auth/logout`,
    GITHUB_LOGIN: `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login`,
    GOOGLE_LOGIN: `${process.env.NEXT_PUBLIC_BASE_URL}auth/google/login`,
})