export const getRefreshToken = (fullHeaders: string | null) => {

  return fullHeaders
    ? fullHeaders.split('=')[1].split(';')[0]
    : ""
};
