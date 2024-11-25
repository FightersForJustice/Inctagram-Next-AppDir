import Image from 'next/image';
import { ItemDialog, ItemDialogs } from '@/api/messenger.api';
import { Message } from '@/app/(authorized)/messenger/dialogs/dialog-window/message/Message';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/appRoutes/routes';

import s from './DialogWindow.module.scss';

type PropsType = {
  dialog: ItemDialog[];
  receiverData: ItemDialogs | null;
  id: string | null;
  sendMessage: (value: string) => void;
  showDialog: boolean;
  removeMessage: (id: number) => void;
}

export const DialogWindow = ({ dialog, receiverData, id, sendMessage, showDialog, removeMessage }: PropsType) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Messenger.${key}`);

  const [textareaValue, setTextareaValue] = useState<string>('');
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);

  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.currentTarget.value);
  };

  const onSendMessage = () => {
    if (textareaValue && receiverData) {
      sendMessage(textareaValue);
      setTextareaValue('');
    }
  };

  const onDeleteMessages = async () => {

    for (const messageId of selectedMessages) {
      await removeMessage(messageId);
    }
    setSelectedMessages([]);
  };

  const toggleMessageSelection = (messageId: number) => {
    setSelectedMessages(prev =>
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
        {selectedMessages.length > 0 && (
          <button className={s.delete_button} onClick={onDeleteMessages}>
            УДАЛИТЬ {selectedMessages.length}
          </button>
        )}
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
              />
            ))
          :
          <p className={s.no_dialogs}>{translate('dialog.chose')}</p>}
      </div>
      {showDialog &&
        <div className={s.footer}>
          <textarea
            placeholder={translate('dialog.placeholder')}
            maxLength={500}
            onChange={onTextareaHandler}
            value={textareaValue}
          />
          <button onClick={onSendMessage}>{translate('dialog.send')}</button>
        </div>}
    </div>
  );
};
