import Image from 'next/image';
import { MessageItem, ItemDialogs } from '@/api/messenger.api';
import { formatDialogsDate } from '@/utils/formatDialogsDate';
import { useGetLanguage } from '@/redux/hooks/useGetLanguage';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import s from './Message.module.scss';

type PropsType = {
  message: MessageItem;
  receiverData: ItemDialogs | null;
  id: string | null;
  onSelectMessage: (id: number) => void;
  isSelected: boolean;
  messageToChange: MessageItem | null;
  isMobile: boolean | null;
}

export const Message = ({
                          message,
                          receiverData,
                          id,
                          onSelectMessage,
                          isSelected,
                          messageToChange,
                          isMobile,
                        }: PropsType) => {

  const { t } = useTranslation();
  const language = useGetLanguage();
  const translateTime = (key: string): string => t(`Time.${key}`);

  return (
    <div className={clsx(s.message, id && +id === message.ownerId && s.owner)}>
      {id && +id !== message.ownerId && !isMobile && (
        <Image
          src={receiverData?.avatars[0]?.url || '/img/create-post/no-image.png'}
          alt="avatar"
          width={48}
          height={48}
          className={s.avatar}
        />
      )}
      <button onClick={() => onSelectMessage(message.id)}>
        <div className={clsx(s.text, id && +id !== message.ownerId && s.text_receiver, isSelected && s.selected, messageToChange && s.not_alowed)}>
          <p className={s.text_message}>{message.messageText}</p>
          <div className={s.status}>
          <span className={s.text_time}>{formatDialogsDate(
            message.createdAt, language, translateTime)}</span>
            {id && +id === message.ownerId &&
              (message.status === 'READ' ?
                <Image src={'/img/double_check.svg'} alt="delete" width={16} height={16} />
                :
                <Image src={'/img/check.svg'} alt="delete" width={16} height={16} />
              )}
          </div>
        </div>
      </button>
    </div>
  );
};
