import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { NotificationItem } from '@/webSocket/webSocketActions/webSocketActions';
import { SocketEvents } from './SocketEvents';

type useConnectSocketProps = {
  accessToken: string;
  setNewNotification: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

export const useConnectSocket = ({
  accessToken,
  setNewNotification,
  setAmount,
}: useConnectSocketProps) => {
  useEffect(() => {
    const socket = io('https://inctagram.work', {
      query: { accessToken },
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
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
        setNewNotification([newNotify]);
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
  }, [accessToken, setNewNotification, setAmount]);
};

type notificationWSResponseType = {
  clientId: string;
  eventType: number;
  id: number;
  isRead: boolean;
  message: string;
  notifyAt: string;
};
