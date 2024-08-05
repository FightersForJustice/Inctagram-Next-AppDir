import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { NotificationItem } from '@/webSocket/webSocketActions/webSocketActions';

type useConnectSocketProps = {
  accessToken: string;
  setNewNotification: React.Dispatch<NotificationItem[]>;
}

const socketEvents = {
  notifications: 'notifications',
  updateMessage: 'update-message',
  error: 'error',
} as const;

export const useConnectSocket = ({ accessToken, setNewNotification }: useConnectSocketProps) => {
  useEffect(() => {
    const socket = io('https://inctagram.work', {
      query: { accessToken },
    });

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on(socketEvents.notifications, response => {
      console.log('notifications', response);
      setNewNotification(response);
    });

    socket.on(socketEvents.updateMessage, response => {
      console.log('socketEvents.updateMessage', response);
    });

    socket.on(socketEvents.error, response => {
      console.log('SocketEvents.ERROR', response);
    });

    socket.on('disconnect', () => {
      console.log('Web Socket Disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [accessToken, setNewNotification]);
};
