export const actions = {
  async getProfile(accessToken: string | null) {
    const apiUrl = 'https://inctagram.work/api/v1/users/profile';
    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        console.error('Error:', response.statusText);
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  },
  async getPosts(id: number) {
    const apiUrl = `https://inctagram.work/api/v1/public-posts/user/${id}/,?sortDirection=desc`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.error('Error:', response.statusText);
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  },
};
