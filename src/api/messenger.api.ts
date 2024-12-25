import {Avatar} from "@/api/profile.api";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getDialogs = async (accessToken: string, cursor: number) => {
    const apiUrl = `${baseUrl}messanger?cursor=${cursor}&pageSize=9`;
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
        const data: Dialogs = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export const getDialog = async (accessToken: string, partnerId: number, cursor: number) => {
    const apiUrl = `${baseUrl}messanger/${partnerId}?cursor=${cursor}`;
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
        const data: Dialog = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export const deleteMessage = async (accessToken: string, id: number) => {
    const apiUrl = `${baseUrl}messanger/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            console.error('Error:', response.statusText);
            return response.statusText;
        }
        return response.status;
    } catch (error) {
        console.error('Error deleting:', error);
        return error;
    }
};

export const updateMessages = async (accessToken: string, ids: number[]) => {
    const apiUrl = `${baseUrl}messanger`;
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ids}),
        });
        if (!response.ok) {
            console.error('Error:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export type ItemDialogs = {
    id: number,
    ownerId: number,
    receiverId: number,
    messageText: string,
    createdAt: string,
    updatedAt: string,
    messageType: string,
    status: string,
    userName: string,
    avatars: Avatar[],
    messages: MessageItem[]
}

export type Dialogs = {
    totalCount: number,
    pageSize: number,
    items: ItemDialogs[]
}

export type Dialog = {
    totalCount: number,
    pageSize: number,
    items: MessageItem[]
}

export type MessageItem = {
    id: number,
    ownerId: number,
    receiverId: number,
    messageText: string,
    createdAt: string,
    updatedAt: string,
    messageType: string,
    status: string,
}