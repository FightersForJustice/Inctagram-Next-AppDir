import Image from 'next/image';
import { MessageItem, ItemDialogs, updateMessages } from '@/api/messenger.api';
import { Message } from '@/app/(authorized)/messenger/dialogs/dialog-window/message/Message';
import Link from 'next/link';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/appRoutes/routes';

import s from './DialogWindow.module.scss';

type PropsType = {
  dialog: ItemDialogs | null;
  id: string | null;
  sendMessage: (value: string) => void;
  showDialog: boolean;
  removeMessage: (id: number, dialogId: number) => void;
  updateMessage: (id: number, value: string) => void;
  fetchDialog: (partnerId: number) => void;
  accessToken: string;
  handleBackToList?: () => void;
  isMobile: boolean | null;
}

export const DialogWindow = ({
                               dialog,
                               id,
                               sendMessage,
                               showDialog,
                               removeMessage,
                               updateMessage,
                               fetchDialog,
                               accessToken,
                               handleBackToList,
                               isMobile,
                             }: PropsType) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Messenger.${key}`);

  const dialogMassagesRef = useRef<HTMLDivElement | null>(null);

  const [textareaValue, setTextareaValue] = useState<string>('');
  const [messageToChange, setMessageToChange] = useState<MessageItem | null>(null);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (showDialog) {
      scrollToBottom();
    }
  }, [dialog?.id, showDialog]);

  useEffect(() => {
    let scrollTimeout: string | number | NodeJS.Timeout | undefined;
    const handleScroll = () => {
      if (!dialog) return;

      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (dialogMassagesRef.current) {
          const scrollTop = dialogMassagesRef.current.scrollTop;

          if (scrollTop <= 100) {
            fetchDialog(id && +id === dialog.receiverId ? dialog.ownerId : dialog.receiverId);
          }
        }
      }, 200);
    };

    const scrollableElement = dialogMassagesRef.current;
    scrollableElement?.addEventListener('scroll', handleScroll);

    return () => {
      scrollableElement?.removeEventListener('scroll', handleScroll);
    };
  }, [dialog]);


  useEffect(() => {

    if (!id || !dialog) return;
    const notReadMessages = dialog.messages
      .filter(message => message.status === 'SENT' && message.receiverId === +id)
      .map(message => message.id);

    if (!notReadMessages.length) return;

    updateMessages(accessToken, notReadMessages);

  }, [dialog]);


  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.currentTarget.value);
  };

  const onSendMessage = () => {
    if (textareaValue && dialog) {

      if (messageToChange) {
        updateMessage(messageToChange.id, textareaValue);
        setMessageToChange(null);
        setSelectedMessages([]);
      } else {
        sendMessage(textareaValue);
      }

      setTextareaValue('');


      setTimeout(() => {
        scrollToBottom();
      }, 500)
    }
  };

  const onTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const onDeleteMessages = async () => {
    if (!dialog) return;

    for (const messageId of selectedMessages) {
      await removeMessage(messageId, dialog.id);
    }
    setSelectedMessages([]);
  };

  const onEditMessage = async () => {

    if (!dialog) return;

    const message = dialog.messages.find(message => message.id === selectedMessages[0]);

    if (!message) return;

    setMessageToChange(message);

    setTextareaValue(message.messageText);
  };

  const clearMessageToChange = () => {
    setMessageToChange(null);
    setTextareaValue('');
    setSelectedMessages([]);
  };

  const toggleMessageSelection = (messageId: number) => {

    const message = dialog?.messages.find(message => message.id === messageId && id && message.ownerId === +id);
    if (!message) return;

    !messageToChange && setSelectedMessages(prev =>
      prev.includes(messageId)
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId],
    );
  };

  const receiverId = id && +id === dialog?.receiverId ? dialog.ownerId : dialog?.receiverId;

  return (
    <div className={s.window}>
      <div className={s.header}>
        {showDialog &&
          <div className={s.header_content}>
            <Link href={ROUTES.PROFILE + `${'/' + receiverId}`}>
              <Image
                src={dialog?.avatars[0]?.url ?? '/img/create-post/no-image.png'}
                alt="avatar"
                width={48}
                height={48}
                className={s.avatar}
              />
            </Link>
            <Link href={ROUTES.PROFILE + `${'/' + receiverId}`}>
              <div className={s.name}>{dialog?.userName}</div>
            </Link>
            {handleBackToList &&
              <button onClick={handleBackToList}>
                <Image src={'/img/arrow-left.svg'} onClick={handleBackToList} alt="back" width={24} height={24} />
              </button>
            }
          </div>
        }
        {selectedMessages.length > 0 && !messageToChange &&
          <div className={s.button_block}>
            <button className={s.button} onClick={onDeleteMessages}>
              {translate('dialog.delete')} {selectedMessages.length}
            </button>
            {selectedMessages.length === 1 &&
              <button className={s.button} onClick={onEditMessage}>
                {translate('dialog.edit')}
              </button>}
          </div>
        }
      </div>
      <div className={s.messages} ref={dialogMassagesRef}>
        {showDialog ?
          dialog?.messages
            .slice()
            .reverse()
            .map(message => (
              <Message
                message={message}
                key={message.id}
                receiverData={dialog}
                id={id}
                onSelectMessage={toggleMessageSelection}
                isSelected={selectedMessages.includes(message.id)}
                messageToChange={messageToChange}
                isMobile={isMobile}
              />
            ))
          :
          <p className={s.no_dialogs}>{translate('dialog.choose')}</p>
        }
        <div ref={messagesEndRef} />
      </div>
      {showDialog &&
        <div className={s.footer}>
          {messageToChange &&
            <div className={s.change_message}>
              <p>{messageToChange.messageText}</p>
              <button onClick={clearMessageToChange}>
                <Image src={'/img/close.svg'} alt="close" width={24} height={24} />
              </button>
            </div>}
          <div className={s.textarea}>
          <textarea
            placeholder={translate('dialog.placeholder')}
            maxLength={500}
            onChange={onTextareaHandler}
            onKeyDown={onTextareaKeyDown}
            value={textareaValue}
          />
            <button onClick={onSendMessage}>{translate(messageToChange ? 'dialog.edit' : 'dialog.send')}</button>
          </div>
        </div>}
    </div>
  );
};
