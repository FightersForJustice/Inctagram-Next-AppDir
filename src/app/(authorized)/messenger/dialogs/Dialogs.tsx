'use client';

import { useConnectSocket } from '@/webSocket/hooks/useConnectSocket';
import { useEffect, useState } from 'react';
import { SocketEvents } from '@/webSocket/hooks/SocketEvents';
import { deleteMessage, getDialog, getDialogs, ItemDialogs } from '@/api/messenger.api';
import { DialogList } from '@/app/(authorized)/messenger/dialogs/dialog-list/DialogList';
import { DialogWindow } from '@/app/(authorized)/messenger/dialogs/dialog-window/DialogWindow';
import { Loader } from '@/components/Loader';
import { useTranslation } from 'react-i18next';
import { getProfile } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import { UserType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { useSearchParams } from 'next/navigation';

import s from './Dialogs.module.scss';


type PropsType = {
  accessToken: string;
  id: string | null;
}

export const Dialogs = ({ accessToken, id }: PropsType) => {

  const idFromUrl = useSearchParams().get('id');

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Messenger.${key}`);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isDialogListVisible, setIsDialogListVisible] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [dialogs, setDialogs] = useState<ItemDialogs[]>([]);
  const [dialog, setDialog] = useState<ItemDialogs | null>(null);
  const [dialogsCount, setDialogsCount] = useState(-1);
  const [dialogMessagesCount, setDialogMessagesCount] = useState(-1);
  const [showDialog, setShowDialog] = useState<boolean>(false);


  const socket = useConnectSocket({ accessToken, setDialog, setDialogs });

  const sendMessage = (value: string) => {
    if (!socket) {
      console.error('Socket не подключен.');
      return;
    }

    if (id && dialog) {
      const receiverId = +id === dialog.receiverId ? dialog.ownerId : dialog.receiverId;
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
    if (dialogsCount !== -1 && dialogs.length >= dialogsCount) return;

    setLoading(true);

    const cursor = dialogs.length > 0 ? dialogs[dialogs.length - 1].id : 0;

    const data = await getDialogs(accessToken, cursor);

    if (data && data.items.length > 0) {
      const dialogs = data.items.map(dialog => {
        return {
          ...dialog,
          messages: [],
        };
      });

      setDialogs((prev) => [...prev, ...dialogs]);
      setDialogsCount(data.totalCount);
    }
    setLoading(false);
  };

  const fetchDialog = async (partnerId: number) => {
    let cursor = 0;

    const isCurrentDialog = dialog && (dialog.receiverId === partnerId || dialog.ownerId === partnerId);

    if (isCurrentDialog) {
      cursor = dialog && dialog.messages.length > 0 ? dialog.messages[dialog.messages.length - 1].id : 0;

      if (dialogMessagesCount !== -1 && dialog.messages.length >= dialogMessagesCount) return;
    }

    const data = await getDialog(accessToken, partnerId, cursor);

    if (data) {
      setDialogMessagesCount(data.totalCount);

      if (isCurrentDialog) {
        setDialog({
          ...dialog,
          messages: [...dialog.messages, ...data.items],
        });

        return;
      }

      let foundDialog = dialogs.find((d) => d.receiverId === partnerId || d.ownerId === partnerId);

      foundDialog = foundDialog ? foundDialog : await createDialog(partnerId);

      setDialog({
        ...foundDialog,
        messages: data.items,
      });
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
      messages: [],
    };

    setDialogs((prevDialogs) => {

      const foundDialog = prevDialogs.find((d) => d.receiverId === partnerId);

      if (!foundDialog) {
        return [newDialog, ...prevDialogs];
      }
      return prevDialogs;
    });

    return newDialog;
  };

  const removeMessage = async (messageId: number, dialogId: number) => {
    const data = await deleteMessage(accessToken, messageId);

    if (data === 204) {
      const messages = dialog?.messages.filter((m) => m.id !== messageId);

      if (!messages || !messages.length) {
        setDialog(dialog => {
          if (dialog) {
            dialog.messages = [];
          }
          return dialog;
        });
        setShowDialog(false);
        setDialogs((prevDialogs) => prevDialogs.filter((d) => d.id !== dialogId));
        return;
      }

      setDialog(dialog => {
        if (dialog) {
          dialog.messages = messages;
        }
        return dialog;
      });

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


  const handleDialogSelection = (partnerId: number) => {
    fetchDialog(partnerId);
    setIsDialogListVisible(false);
  };

  const handleBackToList = () => {
    setIsDialogListVisible(true);
    setShowDialog(false);
    setDialog(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchDialogs();
  }, []);

  useEffect(() => {
    if (idFromUrl && dialogs.length && !dialog) {
      fetchDialog(+idFromUrl);
    }
  }, [dialogs]);

  if (loading || isMobile === null) return <Loader />;

  return (
    <div className={s.wrapper}>
      {!isMobile && <h1 className={s.title}>{translate('messenger')}</h1>}
      <div className={s.dialogs}>
        {isMobile ? (
          isDialogListVisible ?
            <DialogList
              dialogs={dialogs}
              fetchDialog={handleDialogSelection}
              id={id}
              accessToken={accessToken}
              fetchDialogs={fetchDialogs}
            />
            :
            <DialogWindow
              dialog={dialog}
              id={id}
              sendMessage={sendMessage}
              showDialog={showDialog}
              removeMessage={removeMessage}
              updateMessage={updateMessage}
              fetchDialog={fetchDialog}
              accessToken={accessToken}
              handleBackToList={handleBackToList}
              isMobile={isMobile}
            />
        ) : (
          <>
            <DialogList
              dialogs={dialogs}
              fetchDialog={handleDialogSelection}
              id={id}
              accessToken={accessToken}
              fetchDialogs={fetchDialogs}
            />
            <DialogWindow
              dialog={dialog}
              id={id}
              sendMessage={sendMessage}
              showDialog={showDialog}
              removeMessage={removeMessage}
              updateMessage={updateMessage}
              fetchDialog={fetchDialog}
              accessToken={accessToken}
              isMobile={isMobile}
            />
          </>
        )}
      </div>
    </div>
  );
};

