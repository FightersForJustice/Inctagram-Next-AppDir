import { useState } from 'react';
import s from './HeaderNotification.module.scss';
import * as Popover from '@radix-ui/react-popover';
import { useTranslations } from 'next-intl';
import fillBell from '../../../../public/img/MaskFill.svg';
import bell from '../../../../public/img/MaskOutline.svg';
import Image from 'next/image';

type TProps = {
  language: string;
};

export const HeaderNotification = ({ language }: TProps) => {
  const [amount, setAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const t = useTranslations('Header');

  const onOpenPopup = () => {
    setShowPopup(!showPopup);
    setAmount(0);
  };

  return (
    <div className={s.notification}>
      <Popover.Root onOpenChange={onOpenPopup}>
        <Popover.Trigger>
          <div className={s.notification__wrapper}>
            <Image src={showPopup ? fillBell : bell} alt="user_notifications" />

            {amount > 0 && (
              <span className={s.notification__span}>{amount}</span>
            )}
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="PopoverContent" sideOffset={5}>
            <div className={s.popup}>
              <h3 className={s.popup__title}> {t('notifications')}</h3>
              {amount ? (
                'future notifications'
              ) : (
                //left marcup for future

                /* <div className={s.popup__item}>
                <p className={s.popup__item__title}>
                  Новое уведомление!{' '}
                  <span className={s.popup__item__new}>Новое</span>
                </p>
                <p className={s.popup__desc}>
                  Следующий платеж у вас спишется через 1 день
                </p>
                <p className={s.popup__time}>1 час назад</p>
              </div> */
                <div className={s.popup__item}>
                  <p className={s.popup__desc}>{t('zeroNotifications')}</p>
                </div>
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};
