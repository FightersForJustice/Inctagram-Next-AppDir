'use client';

import { useConnectSocket } from '@/webSocket/hooks/useConnectSocket';
import { useEffect, useState } from 'react';
import { SocketEvents } from '@/webSocket/hooks/SocketEvents';
import { getDialog, getDialogs, ItemDialog, ItemDialogs } from '@/api/messenger.api';
import { DialogList } from '@/app/(authorized)/messenger/dialogs/dialog-list/DialogList';
import { DialogWindow } from '@/app/(authorized)/messenger/dialogs/dialog-window/DialogWindow';

import s from './Dialogs.module.scss';

type PropsType = {
  accessToken: string;
  id: string | null;
}

export const Dialogs = ({ accessToken, id }: PropsType) => {

  const [dialogs, setDialogs] = useState<ItemDialogs[] | null>(null);
  const [dialog, setDialog] = useState<ItemDialog[] | null>(null);
  const [receiverData, setReceiverData] = useState<ItemDialogs | null>(null);

  const socket = useConnectSocket({ accessToken });

  const sendMessage = () => {
    if (!socket) {
      console.error('Socket не подключен.');
      return;
    }

    if (id) {
      socket.emit(SocketEvents.RECEIVE_MESSAGE, { message: 'От klonirovan89 ваываыв ыаываыа', receiverId: 1558 }, (response: any) => {
        console.log('Сообщение отправлено:', response);
      });
    }
  };

  const fetchDialogs = async () => {
    const data = await getDialogs(accessToken);
    if (data && data.items.length > 0) {
      setDialogs(data.items);
    }
  };

  const fetchDialog = async (partnerId: number) => {
    const data = await getDialog(accessToken, partnerId);
    if (data && data.items.length > 0) {
      setDialog(data.items);

      if (dialogs) {
        const foundDialog = dialogs?.find((d) => d.receiverId === partnerId || d.ownerId === partnerId);
        foundDialog && setReceiverData(foundDialog);
      }
    }
  };

  useEffect(() => {
    fetchDialogs();
  }, []);


  return (
    <div className={s.dialogs}>
      <DialogList dialogs={dialogs} fetchDialog={fetchDialog} id={id} />
      <DialogWindow dialog={dialog} receiverData={receiverData} id={id} />
    </div>
  );
};

