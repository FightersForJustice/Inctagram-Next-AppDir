'use client';

import { useConnectSocket } from '@/webSocket/hooks/useConnectSocket';
import { useEffect, useState } from 'react';
import { SocketEvents } from '@/webSocket/hooks/SocketEvents';
import { deleteMessage, getDialog, getDialogs, MessageItem, ItemDialogs } from '@/api/messenger.api';
import { DialogList } from '@/app/(authorized)/messenger/dialogs/dialog-list/DialogList';
import { DialogWindow } from '@/app/(authorized)/messenger/dialogs/dialog-window/DialogWindow';
import { Loader } from '@/components/Loader';
import { useTranslation } from 'react-i18next';

import s from './Dialogs.module.scss';
import { getProfile } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import { UserType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

type PropsType = {
  accessToken: string;
  id: string | null;
}

export const Dialogs = ({ accessToken, id }: PropsType) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Messenger.${key}`);

  const [loading, setLoading] = useState(false);
  const [dialogs, setDialogs] = useState<ItemDialogs[]>([]);
  const [dialog, setDialog] = useState<MessageItem[]>([]);
  const [receiverData, setReceiverData] = useState<ItemDialogs | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const socket = useConnectSocket({ accessToken, setDialog, setDialogs });

  const sendMessage = (value: string) => {
    if (!socket) {
      console.error('Socket не подключен.');
      return;
    }

    if (id && receiverData) {
      const receiverId = +id === receiverData.receiverId ? receiverData.ownerId : receiverData.receiverId;
      socket.emit(SocketEvents.RECEIVE_MESSAGE, { message: value, receiverId }, (response: any) => {
        console.log('Сообщение отправлено:', response);
      });
    }
  };

  const updateMessage = (messageId: number, value: string) => {
    if (!socket) {
      console.error('Socket не подключен.');
      return;
    }

    socket.emit(SocketEvents.UPDATE_MESSAGE, { id: messageId, message: value }, (response: any) => {
      console.log('Сообщение изменено:', response);
    });
  };

  const fetchDialogs = async () => {
    setLoading(true);
    const data = await getDialogs(accessToken);
    if (data && data.items.length > 0) {
      setDialogs(data.items);
    }
    setLoading(false);
  };

  const fetchDialog = async (partnerId: number) => {
    const data = await getDialog(accessToken, partnerId);
    if (data) {
      setDialog(data.items);

      const foundDialog = dialogs.find((d) => d.receiverId === partnerId || d.ownerId === partnerId);

      setReceiverData(foundDialog ? foundDialog : await createDialog(partnerId));
    }

    setShowDialog(true);
  };

  const createDialog = async (partnerId: number) => {

    const userData: UserType = await getProfile(partnerId);

    const newDialog: ItemDialogs = {
      id: Math.round(Math.random() * 1000000),
      ownerId: id ? +id : 0,
      receiverId: partnerId,
      messageText: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageType: 'text',
      status: 'pending',
      userName: userData.userName,
      avatars: userData.avatars,
    }

    setDialogs((prevDialogs) => [newDialog, ...prevDialogs]);

    return newDialog;
  }

  const removeMessage = async (messageId: number, dialogId: number) => {
    const data = await deleteMessage(accessToken, messageId);

    if (data === 204) {
      const messages = dialog.filter((m) => m.id !== messageId);

      if (!messages.length) {
        setDialog([]);
        setShowDialog(false);
        setDialogs((prevDialogs) => prevDialogs.filter((d) => d.id !== dialogId));
        return;
      }

      setDialog(messages);

      setDialogs((prevDialogs) => {
        return prevDialogs.map((d) => {
          if (d.id === dialogId) {
            d.messageText = messages[0].messageText;
          }

          return d;
        });
      });
    } else {
      console.error('Ошибка при удалении сообщения:', data);
    }
  };

  useEffect(() => {
    fetchDialogs();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>{translate('messenger')}</h1>
      <div className={s.dialogs}>
        <DialogList dialogs={dialogs} fetchDialog={fetchDialog} id={id} accessToken={accessToken} />
        <DialogWindow dialog={dialog} receiverData={receiverData} id={id} sendMessage={sendMessage}
                      showDialog={showDialog} removeMessage={removeMessage} updateMessage={updateMessage} />
      </div>
    </div>
  );
};

