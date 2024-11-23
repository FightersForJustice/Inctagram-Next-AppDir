import Image from 'next/image';
import { ItemDialog, ItemDialogs } from '@/api/messenger.api';
import { Message } from '@/app/(authorized)/messenger/dialogs/dialog-window/message/Message';

import s from './DialogWindow.module.scss';
import { ChangeEvent, useState } from 'react';


type PropsType = {
  dialog: ItemDialog[];
  receiverData: ItemDialogs | null;
  id: string | null;
  sendMessage: (value: string) => void;
}

export const DialogWindow = ({ dialog, receiverData, id, sendMessage }: PropsType) => {
  const [textareaValue, setTextareaValue] = useState<string>('');

  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.currentTarget.value);
  };

  const onSendMessage = () => {
    if (textareaValue && receiverData) {
      sendMessage(textareaValue)
      setTextareaValue('');
    }
  };

  return (
    <div className={s.window}>
      <div className={s.header}>
        {dialog.length > 0 &&
          <div className={s.header_content}>
            <Image
              src={receiverData?.avatars[0]?.url ?? '/img/create-post/no-image.png'}
              alt="avatar"
              width={48}
              height={48}
              className={s.avatar}
            />
            <div className={s.name}>{receiverData?.userName}</div>
          </div>}
      </div>
      <div className={s.messages}>
        {dialog.length > 0 ?
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
          <p>Choose who you would like to talk to</p>}
      </div>
      {dialog.length > 0 &&
        <div className={s.footer}>
          <textarea
            placeholder={"Type Message"}
            maxLength={500}
            onChange={onTextareaHandler}
            value={textareaValue}
          />
          <button onClick={onSendMessage}>Send message</button>
        </div>}
    </div>
  );
};
