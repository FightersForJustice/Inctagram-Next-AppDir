const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getNotifications = async (accessToken: string, cursor: number) => {
  const apiUrl = `${baseUrl}notifications?cursor=${cursor}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
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
};


export const updateStatusNotifications = async (accessToken: string, id: number) => {
  const apiUrl = `${baseUrl}notifications/mark-as-read`;
  console.error('!!!!!!!!!!');
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      console.error('!!!!!!!!!!', response.statusText);
    }
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
};

export type NotificationItem = {
  id: number;
  message: string;
  isRead: boolean;
  notifyAt: string;
};

export type NotificationResponse = {
  pageSize: number;
  totalCount: number;
  items: NotificationItem[];
};
