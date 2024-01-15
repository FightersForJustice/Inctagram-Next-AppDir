export const getMyProfileOptions = (accessToken: string | null) => {
  return {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 0 },
    //please remind me in PR to remove revalidate , TY
  };
};
