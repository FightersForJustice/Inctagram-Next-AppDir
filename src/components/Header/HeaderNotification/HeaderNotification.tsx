'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as Popover from '@radix-ui/react-popover';
import { useTranslation } from 'react-i18next';

import fillBell from '/public/img/MaskFill.svg';
import bell from '/public/img/MaskOutline.svg';

import s from './HeaderNotification.module.scss';
import { useConnectSocket } from '@/webSocket/hooks/useConnectSocket';
import { getNotification, NotificationItem } from '@/webSocket/webSocketActions/webSocketActions';

type Props = {
  accessToken: string
};

export const HeaderNotification = ({ accessToken }: Props) => {
  const [amount, setAmount] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [initNotifications, setInitNotifications] = useState<NotificationItem[]>([])
  const [newNotification, setNewNotification] = useState<NotificationItem[]>([])

  useConnectSocket({ accessToken, setNewNotification })

  useEffect(() => {
    console.log(newNotification, 'headerNotification');
  }, [newNotification]);

  const { t } = useTranslation()

  const translate = (key: string): string => t(`Header.${key}`)

  const fetchNotifications = async (cursor: number) => {
    const data = await getNotification(accessToken, cursor)
    if (data) {
      setInitNotifications(data.items);
      setAmount(data.items.filter((item: NotificationItem) => !item.isRead).length)
    }
  };

  useEffect(() => {
    fetchNotifications(0)
  }, [])

  const onOpenPopup = async (open: boolean) => {
    setShowPopup(open);
    if (open) {
      await fetchNotifications(0);
      setAmount(0);
    }
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
                {translate('notifications.notZeroNotifications')}
              </h3>
              <div>
                {initNotifications.length > 0 ? (
                  initNotifications.map(notification => (
                    <div key={notification.id} className={s.popup__item}>
                      <p className={s.popup__item__title}>
                        {translate('notifications.newNotifications')}
                        <span className={s.popup__item__new}> {translate('notifications.new')}
                        </span>
                      </p>
                      <p className={s.popup__desc}>
                        {notification.message}
                      </p>
                      <p className={s.popup__time}>
                        {notification.notifyAt}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className={s.popup__item}>
                    <p className={s.popup__desc}>
                      {translate('notifications.zeroNotifications')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};