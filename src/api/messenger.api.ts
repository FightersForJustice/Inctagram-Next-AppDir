import {Avatar} from "@/api/profile.api";
import { accessToken } from '@/utils/serverActions';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getDialogs = async (accessToken: string) => {
    const apiUrl = `${baseUrl}messanger`;
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

export const getDialog = async (accessToken: string, partnerId: number) => {
    const apiUrl = `${baseUrl}messanger/${partnerId}`;
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
    avatars: Avatar[]
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