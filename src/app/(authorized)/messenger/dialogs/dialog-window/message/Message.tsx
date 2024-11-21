import Image from 'next/image';
import { ItemDialog, ItemDialogs } from '@/api/messenger.api';
import clsx from 'clsx';

import s from './Message.module.scss';

type PropsType = {
  message: ItemDialog;
  receiverData: ItemDialogs | null;
  id: string | null;
}

export const Message = ({ message, receiverData, id }: PropsType) => {

  return (
    <div className={clsx(s.message, id && +id === message.ownerId && s.owner)}>
      {id && +id !== message.ownerId && (
        <Image
          src={
            receiverData?.avatars[0]?.url || '/img/create-post/no-image.png'
          }
          alt="avatar"
          width={48}
          height={48}
          className={s.avatar}
        />
      )}
      <div className={s.text}>
        <p>{message.messageText}</p>
        <span>12:53</span>
      </div>
    </div>
  );
};
