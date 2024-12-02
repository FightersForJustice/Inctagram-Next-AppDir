import Image from 'next/image';
import { MessageItem, ItemDialogs } from '@/api/messenger.api';
import { Message } from '@/app/(authorized)/messenger/dialogs/dialog-window/message/Message';
import Link from 'next/link';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/appRoutes/routes';

import s from './DialogWindow.module.scss';

type PropsType = {
  dialog: MessageItem[];
  receiverData: ItemDialogs | null;
  id: string | null;
  sendMessage: (value: string) => void;
  showDialog: boolean;
  removeMessage: (id: number, dialogId: number) => void;
  updateMessage: (id: number, value: string) => void;
}

export const DialogWindow = ({ dialog, receiverData, id, sendMessage, showDialog, removeMessage, updateMessage }: PropsType) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Messenger.${key}`);

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
  }, [dialog, showDialog]);

  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.currentTarget.value);
  };

  const onSendMessage = () => {
    if (textareaValue && receiverData) {

      if (messageToChange) {
        updateMessage(messageToChange.id, textareaValue);
        setMessageToChange(null);
        setSelectedMessages([]);
      } else {
        sendMessage(textareaValue);
      }

      setTextareaValue('');
    }
  };

  const onDeleteMessages = async () => {
    if (!receiverData) return;

    for (const messageId of selectedMessages) {
      await removeMessage(messageId, receiverData.id);
    }
    setSelectedMessages([]);
  };

  const onEditMessage = async () => {

    if (!dialog) return;

    const message = dialog.find(message => message.id === selectedMessages[0]);

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

    const message = dialog.find(message => message.id === messageId && id && message.ownerId === +id);
    if (!message) return;

    !messageToChange && setSelectedMessages(prev =>
      prev.includes(messageId)
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const receiverId = id && +id === receiverData?.receiverId ? receiverData.ownerId : receiverData?.receiverId;

  return (
    <div className={s.window}>
      <div className={s.header}>
        {showDialog &&
          <Link href={ROUTES.PROFILE + `${'/' + receiverId}`} className={s.header_content}>
            <Image
              src={receiverData?.avatars[0]?.url ?? '/img/create-post/no-image.png'}
              alt="avatar"
              width={48}
              height={48}
              className={s.avatar}
            />
            <div className={s.name}>{receiverData?.userName}</div>
          </Link>
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
      <div className={s.messages}>
        {showDialog ?
          dialog
            .slice()
            .reverse()
            .map(message => (
              <Message
                message={message}
                key={message.id}
                receiverData={receiverData}
                id={id}
                onSelectMessage={toggleMessageSelection}
                isSelected={selectedMessages.includes(message.id)}
                messageToChange={messageToChange}
              />
            ))
          :
          <p className={s.no_dialogs}>{translate('dialog.choose')}</p>}
        <div ref={messagesEndRef} />
      </div>
      {showDialog &&
        <div className={s.footer}>
          {messageToChange &&
            <div className={s.change_message}>
              <p>{messageToChange.messageText}</p>
              <button onClick={clearMessageToChange}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                    fill="white" />
                </svg>
              </button>
            </div>}
          <div className={s.textarea}>
          <textarea
            placeholder={translate('dialog.placeholder')}
            maxLength={500}
            onChange={onTextareaHandler}
            value={textareaValue}
          />
          <button onClick={onSendMessage}>{translate(messageToChange ? 'dialog.edit' : 'dialog.send')}</button>
          </div>
        </div>}
    </div>
  );
};
