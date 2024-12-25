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
}

export const Message = ({ message, receiverData, id, onSelectMessage, isSelected, messageToChange }: PropsType) => {

  const { t } = useTranslation();
  const language = useGetLanguage();
  const translateTime = (key: string): string => t(`Time.${key}`);

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
      <button onClick={() => onSelectMessage(message.id)}>
        <div className={clsx(s.text, isSelected && s.selected, messageToChange && s.not_alowed)}>
          <p className={s.text_message}>{message.messageText}</p>
          <div className={s.status}>
          <span className={s.text_time}>{formatDialogsDate(
            message.createdAt, language, translateTime)}</span>
            {id && +id === message.ownerId &&
              <svg width="12" height="14" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.57339 8.99994C4.48198 8.99965 4.39161 8.98056 4.30788 8.94386C4.22416 8.90716 4.14888 8.85363 4.08672 8.78661L0.846724 5.33994C0.725608 5.21087 0.660727 5.03897 0.666353 4.86206C0.671979 4.68515 0.747652 4.51772 0.876724 4.39661C1.0058 4.27549 1.17769 4.21061 1.3546 4.21624C1.53151 4.22186 1.69894 4.29753 1.82006 4.42661L4.56672 7.35327L10.1734 1.21994C10.2303 1.14909 10.3011 1.09062 10.3814 1.04812C10.4617 1.00562 10.5499 0.979983 10.6404 0.972793C10.731 0.965604 10.8221 0.977009 10.9081 1.00631C10.9942 1.03561 11.0733 1.08218 11.1406 1.14317C11.208 1.20416 11.2622 1.27828 11.2999 1.36097C11.3375 1.44366 11.3579 1.53318 11.3597 1.62403C11.3615 1.71488 11.3448 1.80515 11.3104 1.88928C11.2761 1.97341 11.2249 2.04964 11.1601 2.11327L5.06672 8.77994C5.00515 8.84818 4.93013 8.90294 4.84638 8.9408C4.76263 8.97866 4.67196 8.9988 4.58006 8.99994H4.57339Z"
                  fill="#73A5FF" />
              </svg>
            }
            {id && +id === message.ownerId && message.status === 'READ' &&
              <svg width="12" height="14" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.57339 8.99994C4.48198 8.99965 4.39161 8.98056 4.30788 8.94386C4.22416 8.90716 4.14888 8.85363 4.08672 8.78661L0.846724 5.33994C0.725608 5.21087 0.660727 5.03897 0.666353 4.86206C0.671979 4.68515 0.747652 4.51772 0.876724 4.39661C1.0058 4.27549 1.17769 4.21061 1.3546 4.21624C1.53151 4.22186 1.69894 4.29753 1.82006 4.42661L4.56672 7.35327L10.1734 1.21994C10.2303 1.14909 10.3011 1.09062 10.3814 1.04812C10.4617 1.00562 10.5499 0.979983 10.6404 0.972793C10.731 0.965604 10.8221 0.977009 10.9081 1.00631C10.9942 1.03561 11.0733 1.08218 11.1406 1.14317C11.208 1.20416 11.2622 1.27828 11.2999 1.36097C11.3375 1.44366 11.3579 1.53318 11.3597 1.62403C11.3615 1.71488 11.3448 1.80515 11.3104 1.88928C11.2761 1.97341 11.2249 2.04964 11.1601 2.11327L5.06672 8.77994C5.00515 8.84818 4.93013 8.90294 4.84638 8.9408C4.76263 8.97866 4.67196 8.9988 4.58006 8.99994H4.57339Z"
                  fill="#73A5FF" />
              </svg>
            }
          </div>
        </div>
      </button>
    </div>
  );
};
