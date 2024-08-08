'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as Popover from '@radix-ui/react-popover';
import { useTranslation } from 'react-i18next';
import fillBell from '/public/img/MaskFill.svg';
import bell from '/public/img/MaskOutline.svg';
import s from './HeaderNotification.module.scss';
import { useConnectSocket } from '@/webSocket/hooks/useConnectSocket';
import {
  getNotification,
  NotificationItem,
} from '@/webSocket/webSocketActions/webSocketActions';

type Props = {
  accessToken: string;
};

export const HeaderNotification = ({ accessToken }: Props) => {
  const [amount, setAmount] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [initNotifications, setInitNotifications] = useState<NotificationItem[]>([]);
  const [newNotification, setNewNotification] = useState<NotificationItem[]>([]);

  useConnectSocket({ accessToken, setNewNotification, setAmount })

  useEffect(() => {
    console.log('newNotification: ', newNotification)
    setInitNotifications((prevState) => [...newNotification, ...prevState])
  }, [newNotification])

  const { t } = useTranslation()

  useEffect(() => {
    console.log('initNotifications: ', initNotifications)
  }, [initNotifications])

  const translate = (key: string): string => t(`Header.${key}`);

  const fetchNotifications = async (cursor: number) => {
    const data = await getNotification(accessToken, cursor);
    if (data) {
      console.log("Fetched notifications:", data.items)
      setInitNotifications(data.items)
      setAmount(data.items.filter((item: NotificationItem) => !item.isRead).length)
    }
  };

  // useEffect(() => {
  //   fetchNotifications(0)
  // }, [])

  const onOpenPopup = async (open: boolean) => {
    setShowPopup(open)
    if (open) {
      setInitNotifications((prevState) =>
        prevState.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
      setAmount(0)
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const getSecondsLabel = (n: number) => {
      if (n % 10 === 1 && n % 100 !== 11) {
        return 'секунду'
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return 'секунды'
      } else {
        return 'секунд'
      }
    }

    const getMinutesLabel = (n: number) => {
      if (n % 10 === 1 && n % 100 !== 11) {
        return 'минуту'
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return 'минуты'
      } else {
        return 'минут'
      }
    }

    const getHoursLabel = (n: number) => {
      if (n % 10 === 1 && n % 100 !== 11) {
        return 'час'
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return 'часа'
      } else {
        return 'часов'
      }
    }

    const getDaysLabel = (n: number) => {
      if (n % 10 === 1 && n % 100 !== 11) {
        return 'день'
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return 'дня'
      } else {
        return 'дней'
      }
    }

    if (diffInSeconds < 60) {
      return `${diffInSeconds} ${getSecondsLabel(diffInSeconds)} назад`
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} ${getMinutesLabel(minutes)} назад`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} ${getHoursLabel(hours)} назад`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} ${getDaysLabel(days)} назад`
    }
  };
  const formatMessage = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const now = new Date()
    const diffInMilliseconds = expiry.getTime() - now.getTime()
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24))

    if (diffInDays <= 0) {
      return t('Your subscription has expired')
    } else if (diffInDays === 1) {
      return t('Your subscription will expire in 1 day');
    } else if (diffInDays === 7) {
      return t('Your subscription will expire in 7 day');
    } else {
      return t('Your subscription will expire in {{count}} days', { count: diffInDays });
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
                  initNotifications.map((notification) => (
                    <div key={notification.id} className={s.popup__item}>
                      <p className={s.popup__item__title}>
                        {translate('notifications.newNotifications')}
                        {!notification.isRead && (
                          <span className={s.popup__item__new}>
                            {' '}
                            {translate('notifications.new')}
                          </span>
                        )}
                      </p>
                      <p className={s.popup__desc}>{formatMessage(notification.message)}</p>
                      <p className={s.popup__time}>
                        {formatDate(notification.notifyAt)}
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
