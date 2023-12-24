const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const routes = Object.freeze({
    LOGIN: `${baseUrl}auth/login`,
    ME: `${baseUrl}auth/me`,
    UPDATE_TOKENS: `${baseUrl}auth/update-tokens`,
    LOGOUT: `${baseUrl}auth/logout`,
    GITHUB_LOGIN: `${baseUrl}auth/github/login`,
    GOOGLE_LOGIN: `${baseUrl}auth/google/login`,
})