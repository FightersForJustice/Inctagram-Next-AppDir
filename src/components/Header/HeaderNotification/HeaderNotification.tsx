'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as Popover from '@radix-ui/react-popover';
import { useTranslation } from 'react-i18next';

import fillBell from '/public/img/MaskFill.svg';
import bell from '/public/img/MaskOutline.svg';

import s from './HeaderNotification.module.scss';

export const HeaderNotification = () => {
  const [amount, setAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

 

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Header.${key}`);
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
              <h3 className={s.popup__title}>
                {' '}
                {t('notifications.notZeroNotifications')}
              </h3>
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
                  <p className={s.popup__desc}>
                    {t('notifications.zeroNotifications')}
                  </p>
                </div>
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};
