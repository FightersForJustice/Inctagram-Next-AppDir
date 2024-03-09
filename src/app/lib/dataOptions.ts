export const getMyProfileOptions = (accessToken: string | null) => {
  return {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      revalidate: 3600,
      tags: ['myProfile']
    }
  };
};
