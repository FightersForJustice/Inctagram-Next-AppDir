import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { NotificationItem } from '@/api/notification.api';
import { SocketEvents } from './SocketEvents';
import { MessageItem, ItemDialogs } from '@/api/messenger.api';

type useConnectSocketProps = {
  accessToken: string;
  setNotifications?: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  setAmount?: React.Dispatch<React.SetStateAction<number>>;
  setDialog?: React.Dispatch<React.SetStateAction<MessageItem[]>>;
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

  const updateDialogs = (message: MessageItem, messageUpdated?: boolean) => {

    const messageIds = [message.receiverId, message.ownerId].sort().join(';');

    if (setDialog) {
      setDialog((prevMessages) => {

        if (!prevMessages.length) return prevMessages;

        const dialogIds = [prevMessages[0].receiverId, prevMessages[0].ownerId].sort().join(';');

        if (dialogIds !== messageIds) return prevMessages;

        if (messageUpdated) {
          return prevMessages.map((m) => {
            if (m.id === message.id) {
              return message;
            }
            return m;
          })
        } else {
          return [message, ...prevMessages];
        }
      });
    }

    if (setDialogs && !messageUpdated) {
      setDialogs((prevDialogs) => {
        if (!prevDialogs) return prevDialogs;

        return prevDialogs.map((d) => {

          const dialogIds = [d.receiverId, d.ownerId].sort().join(';');

          if (dialogIds === messageIds) {
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




      const messageUpdated = message.createdAt !== message.updatedAt;

      updateDialogs(message, messageUpdated);
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

      setDialog && setDialog((prevMessages) => {
        if (!prevMessages) return prevMessages;

        return prevMessages.filter((m) => m.id !== messageId);
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
