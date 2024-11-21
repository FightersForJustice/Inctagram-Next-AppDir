import {useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {NotificationItem} from '@/api/notification.api';
import {SocketEvents} from './SocketEvents';

type useConnectSocketProps = {
    accessToken: string;
    setNotifications?: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
    setAmount?: React.Dispatch<React.SetStateAction<number>>;
};

export const useConnectSocket = ({
                                     accessToken,
                                     setNotifications,
                                     setAmount,
                                 }: useConnectSocketProps) => {

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = io('https://inctagram.work', {
            query: {accessToken},
        });

        socketInstance.on('connect', () => {
            console.log('WebSocket connected');
        });

        socketInstance.on(
            SocketEvents.NOTIFICATIONS,
            (response: notificationWSResponseType) => {
                console.log('Received notifications: ', response);
                const newNotify = {
                    id: response.id,
                    message: response.message,
                    isRead: response.isRead,
                    notifyAt: response.notifyAt,
                };
                setNotifications &&
                setNotifications
                ((prevNotifications) => {

                    const notified = prevNotifications.find(notification => notification.id === newNotify.id);

                    if (!notified) {
                        setAmount && setAmount((prevState) => ++prevState);
                        return [newNotify, ...prevNotifications]
                    }

                    return prevNotifications
                });
            }
        );

        socketInstance.on(SocketEvents.ERROR, (response) => {
            console.error('Socket error', response);
        });

        socketInstance.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [accessToken, setNotifications, setAmount]);

    return socket;
};

type notificationWSResponseType = {
    clientId: string;
    eventType: number;
    id: number;
    isRead: boolean;
    message: string;
    notifyAt: string;
};
