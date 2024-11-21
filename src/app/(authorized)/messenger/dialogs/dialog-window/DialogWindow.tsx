import Image from 'next/image';
import { ItemDialog, ItemDialogs } from '@/api/messenger.api';
import { Message } from '@/app/(authorized)/messenger/dialogs/dialog-window/message/Message';

import s from './DialogWindow.module.scss';

type PropsType = {
  dialog: ItemDialog[] | null;
  receiverData: ItemDialogs | null;
  id: string | null;
}

export const DialogWindow = ({ dialog, receiverData, id }: PropsType) => {

  return (
    <div className={s.window}>
      <div className={s.header}>
        {dialog &&
          <div className={s.header_content}>
            <Image
              src={receiverData?.avatars[0]?.url ??'/img/create-post/no-image.png'}
              alt="avatar"
              width={48}
              height={48}
              className={s.avatar}
            />
            <div className={s.name}>{receiverData?.userName}</div>
          </div>}
      </div>
      <div className={s.messages}>
        {dialog ?
          dialog.map(message => (
            <Message message={message} key={message.id} receiverData={receiverData} id={id}/>
          ))
          :
          <p>Choose who you would like to talk to</p>}
      </div>
    </div>
  );
};
