// all cookie expires after 14days

export const setCookieExpires = () => {
    return new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toUTCString()
}