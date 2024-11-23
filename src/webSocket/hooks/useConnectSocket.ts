import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { NotificationItem } from '@/api/notification.api';
import { SocketEvents } from './SocketEvents';
import { ItemDialog, ItemDialogs } from '@/api/messenger.api';

type useConnectSocketProps = {
  accessToken: string;
  setNotifications?: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  setAmount?: React.Dispatch<React.SetStateAction<number>>;
  setDialog?: React.Dispatch<React.SetStateAction<ItemDialog[]>>;
  setDialogs?: React.Dispatch<React.SetStateAction<ItemDialogs[]>>;
};

export const useConnectSocket = ({
                                   accessToken,
                                   setNotifications,
                                   setAmount,
                                   setDialog,
                                   setDialogs
                                 }: useConnectSocketProps) => {

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io('https://inctagram.work', {
      query: { accessToken },
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
            return [newNotify, ...prevNotifications];
          }

          return prevNotifications;
        });
      },
    );

    socketInstance.on(SocketEvents.RECEIVE_MESSAGE, (dialog: ItemDialog) => {
      console.log('Новое сообщение получено: ', dialog);

      if (setDialog) {
        setDialog((prevMessages) => [dialog, ...prevMessages]);
      }

      if (setDialogs) {
        setDialogs((prevDialogs) => {
          if (!prevDialogs) return prevDialogs;

          const updatedDialogs = prevDialogs.map((d) => {
            if (d.receiverId === dialog.receiverId) {

              return {
                ...d,
                messageText: dialog.messageText,
                createdAt: dialog.createdAt,
              };
            }
            return d;
          });

          return updatedDialogs;
        });
      }
    });


    socketInstance.on(
      SocketEvents.NOTIFICATIONS,
      (response: any) => {
      },
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
