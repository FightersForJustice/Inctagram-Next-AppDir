import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { NotificationItem } from '@/webSocket/webSocketActions/webSocketActions';
import { SocketEvents } from './SocketEvents';

type useConnectSocketProps = {
  accessToken: string;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

export const useConnectSocket = ({
  accessToken,
  setNotifications,
  setAmount,
}: useConnectSocketProps) => {

  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = io('https://inctagram.work', {
      query: { accessToken },
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    });

    socket.on(
      SocketEvents.NOTIFICATIONS,
      (response: notificationWSResponseType) => {
        console.log('Received notifications: ', response);
        const newNotify = {
          id: response.id,
          message: response.message,
          isRead: response.isRead,
          notifyAt: response.notifyAt,
        };
        setNotifications([newNotify]);
        setAmount((prevState) => ++prevState);
      }
    );

    socket.on(SocketEvents.ERROR, (response) => {
      console.error('Socket error', response);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [accessToken, setNotifications, setAmount]);

  return isConnected
};

type notificationWSResponseType = {
  clientId: string;
  eventType: number;
  id: number;
  isRead: boolean;
  message: string;
  notifyAt: string;
};
