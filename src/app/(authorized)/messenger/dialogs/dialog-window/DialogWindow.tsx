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
}

export const DialogWindow = ({ dialog, receiverData, id, sendMessage, showDialog }: PropsType) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Messenger.${key}`);

  const [textareaValue, setTextareaValue] = useState<string>('');

  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.currentTarget.value);
  };

  const onSendMessage = () => {
    if (textareaValue && receiverData) {
      sendMessage(textareaValue);
      setTextareaValue('');
    }
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
          </Link>}
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
