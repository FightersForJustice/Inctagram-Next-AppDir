'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as Popover from '@radix-ui/react-popover';
import { useTranslation } from 'react-i18next';
import fillBell from './../../../../public/img/MaskFill.svg';
import bell from './../../../../public/img/MaskOutline.svg';
import { useConnectSocket } from '@/webSocket/hooks/useConnectSocket';
import {
  getNotifications,
  NotificationItem, updateStatusNotifications,
} from '@/webSocket/webSocketActions/webSocketActions';
import { Loader } from '@/components/Loader';

import s from './HeaderNotification.module.scss';

type Props = {
  accessToken: string;
};

export const HeaderNotification = ({ accessToken }: Props) => {
  const [amount, setAmount] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isConnected = useConnectSocket({ accessToken, setNotifications, setAmount });

  const { t } = useTranslation();

  const translate = (key: string): string => t(`Header.${key}`);

  const fetchNotifications = async (cursor: number) => {
    const data = await getNotifications(accessToken, cursor);
    if (data) {
      console.log('Fetched notifications:', data.items);
      setNotifications(data.items);
      setAmount(data.items.filter((item: NotificationItem) => !item.isRead).length);
    }
    setIsLoading(!isLoading);
  };

  useEffect(() => {
    if (isConnected) {
      fetchNotifications(0);
    }
  }, [isConnected]);

  console.log('notifications: ', notifications);
  const onOpenPopup = async (open: boolean) => {
    setShowPopup(open);
    if (open) {
      // setNotifications((prevState) =>
      //   prevState.map((notification) => ({
      //     ...notification,
      //     isRead: true,
      //   })),
      // );
      setAmount(0);

      if (amount > 0) {
        const isNotReadIds = notifications.filter(notification => !notification.isRead)
          .map(notification => notification.id);
        console.log(isNotReadIds);
        const data = await updateStatusNotifications(accessToken, isNotReadIds);
      }
    }
  };

  const removeNotification = (id: number) => {



  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const getSecondsLabel = (n: number) => {
      if (n % 10 === 1 && n % 100 !== 11) {
        return 'секунду';
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return 'секунды';
      } else {
        return 'секунд';
      }
    };

    const getMinutesLabel = (n: number) => {
      if (n % 10 === 1 && n % 100 !== 11) {
        return 'минуту';
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return 'минуты';
      } else {
        return 'минут';
      }
    };

    const getHoursLabel = (n: number) => {
      if (n % 10 === 1 && n % 100 !== 11) {
        return 'час';
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return 'часа';
      } else {
        return 'часов';
      }
    };

    const getDaysLabel = (n: number) => {
      if (n % 10 === 1 && n % 100 !== 11) {
        return 'день';
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return 'дня';
      } else {
        return 'дней';
      }
    };

    if (diffInSeconds < 60) {
      return `${diffInSeconds} ${getSecondsLabel(diffInSeconds)} назад`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${getMinutesLabel(minutes)} назад`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${getHoursLabel(hours)} назад`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${getDaysLabel(days)} назад`;
    }
  };
  const formatMessage = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffInMilliseconds = expiry.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays <= 0) {
      return t('Your subscription has expired');
    } else if (diffInDays === 1) {
      return t('Your subscription will expire in 1 day');
    } else if (diffInDays === 7) {
      return t('Your subscription will expire in 7 day');
    } else {
      return t('Your subscription will expire in {{count}} days', { count: diffInDays });
    }
  };

  // if(isLoading) {
  //   return <Loader />
  // }

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
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className={s.popup__item}>
                      <div className={s.popup__item__title}>
                        <div className={s.popup__item__title}>
                          <h3>{translate('notifications.newNotifications')}</h3>
                          {notification.isRead && (
                            <h3 className={s.popup__item__title__wrapper__new}>
                              {translate('notifications.new')}
                            </h3>
                          )}
                        </div>
                        <button onClick={() => {removeNotification(notification.id)}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
                        </svg>
                        </button>
                      </div>
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
