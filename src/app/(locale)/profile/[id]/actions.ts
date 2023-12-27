export const actions = {
  async getProfile() {
    const apiUrl = `https://inctagram.work/api/v1/users/profile`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  },
};
