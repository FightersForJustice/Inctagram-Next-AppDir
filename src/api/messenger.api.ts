import {Avatar} from "@/api/profile.api";

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