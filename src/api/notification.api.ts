const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getNotifications = async (accessToken: string, cursor: number, pageSize: number = 30) => {
  const apiUrl = `${baseUrl}notifications?cursor=${cursor}&pageSize=${pageSize}`;
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


export const updateStatusNotifications = async (accessToken: string, body: number[]) => {
  const apiUrl = `${baseUrl}notifications/mark-as-read`;
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: body }),
    });
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    console.log(response.status);
    return response.status;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const deleteNotification = async (accessToken: string, id: number) => {
  const apiUrl = `${baseUrl}notifications/${id}`;
  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return response;
    }
    console.log(response.status);
    return response.status;
  } catch (error) {
    console.error('Error remove:', error);
    return error;
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
