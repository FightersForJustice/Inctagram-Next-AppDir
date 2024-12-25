import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { NotificationItem } from '@/api/notification.api';
import { SocketEvents } from './SocketEvents';
import { MessageItem, ItemDialogs } from '@/api/messenger.api';

type useConnectSocketProps = {
  accessToken: string;
  setNotifications?: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  setAmount?: React.Dispatch<React.SetStateAction<number>>;
  setDialog?: React.Dispatch<React.SetStateAction<ItemDialogs | null>>;
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

  const updateDialogs = (message: MessageItem) => {

    const messageIds = [message.receiverId, message.ownerId].sort().join(';');

    const messageUpdated = Date.now() - new Date(message.createdAt).getTime() > 2000;

    if (setDialog) {
      setDialog((dialog) => {

        if (!dialog) return dialog;

        const dialogIds = [dialog.receiverId, dialog.ownerId].sort().join(';');

        if (dialogIds !== messageIds) return dialog;

        let messages = dialog.messages;

        if (messageUpdated) {
          messages = messages.map((m) => {
            if (m.id === message.id) {
              return message;
            }
            return m;
          });
        } else {
          messages = [message, ...messages];
        }

        return {
          ...dialog,
          messages,
        };
      });
    }

    if (setDialogs) {
      setDialogs((prevDialogs) => {
        if (!prevDialogs) return prevDialogs;

        return prevDialogs.map((d) => {

          const dialogIds = [d.receiverId, d.ownerId].sort().join(';');

          if (dialogIds === messageIds) {

            if (messageUpdated && message.createdAt !== d.createdAt) {
              return d;
            }

            return {
              ...d,
              messageText: message.messageText,
              createdAt: message.createdAt,
            };
          }
          return d;
        });
      });
    }
  }

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

    socketInstance.on(SocketEvents.RECEIVE_MESSAGE, (message: MessageItem) => {
      console.log('Новое сообщение отправлено: ', message);

      updateDialogs(message);
    });

    socketInstance.on(SocketEvents.MESSAGE_SENT, (message: MessageItem, acknowledge) => {
      console.log('Новое сообщение получено: ', message);

      if (acknowledge) {
        acknowledge({
          message: message.messageText,
          receiverId: message.receiverId,
        });
      }

      updateDialogs(message);
    });

    socketInstance.on(SocketEvents.MESSAGE_DELETED , (messageId: number) => {
      console.log('Сообщение удалено: ', messageId);

      setDialog && setDialog((dialog) => {
        if (!dialog || !dialog.messages) return dialog;

        const messages = dialog.messages.filter((m) => m.id !== messageId);

        return {
          ...dialog,
          messages,
        }
      });
    });

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
