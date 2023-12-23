export const getRefreshToken = (fullHeaders: string[]) => {
    return fullHeaders[0].split("=")[1].split(";")[0]
} 