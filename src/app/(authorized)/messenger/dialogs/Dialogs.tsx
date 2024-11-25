'use client';

import { useConnectSocket } from '@/webSocket/hooks/useConnectSocket';
import { useEffect, useState } from 'react';
import { SocketEvents } from '@/webSocket/hooks/SocketEvents';
import { deleteMessage, getDialog, getDialogs, ItemDialog, ItemDialogs } from '@/api/messenger.api';
import { DialogList } from '@/app/(authorized)/messenger/dialogs/dialog-list/DialogList';
import { DialogWindow } from '@/app/(authorized)/messenger/dialogs/dialog-window/DialogWindow';
import { Loader } from '@/components/Loader';
import { useTranslation } from 'react-i18next';

import s from './Dialogs.module.scss';

type PropsType = {
  accessToken: string;
  id: string | null;
}

export const Dialogs = ({ accessToken, id }: PropsType) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Messenger.${key}`);

  const [loading, setLoading] = useState(false);
  const [dialogs, setDialogs] = useState<ItemDialogs[]>([]);
  const [dialog, setDialog] = useState<ItemDialog[]>([]);
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
    if (data && data.items.length > 0) {
      setDialog(data.items);

      if (dialogs.length > 0) {
        const foundDialog = dialogs.find((d) => d.receiverId === partnerId || d.ownerId === partnerId);
        foundDialog && setReceiverData(foundDialog);
      }
    }

    setShowDialog(true);
  };

  const removeMessage = async (messageId: number) => {
    const data = await deleteMessage(accessToken, messageId);

    if (data === '204') {
      
      // await fetchDialog(partnerId);
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
                      showDialog={showDialog} removeMessage={removeMessage}/>
      </div>
    </div>
  );
};

