const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const actions = {
  async getProfile(accessToken: string | null, id: number) {
    const apiUrl = `${baseUrl}/public-user/profile/${id}`;
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
  async getPosts(id: number, minId: number | null) {
    const apiUrl = `${baseUrl}public-posts/user/${id}/${minId}?pageSize=8&sortDirection=desc`;
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
