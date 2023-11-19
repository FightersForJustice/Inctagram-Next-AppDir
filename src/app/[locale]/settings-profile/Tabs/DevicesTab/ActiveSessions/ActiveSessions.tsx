import React from 'react';
import s from './ActiveSessions.module.scss';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LogoutBtn } from '@/components/Buttons/LogoutBtn';
import {
  DevicesResponse,
  useDeleteSessionsDeviceMutation,
} from '@/api/profile.api';
import { dateToFormat } from '@/utils/dateToFormat';
import { toast } from 'react-toastify';

type Props = {
  t: (value: string) => string;
  sessions: DevicesResponse[];
  refetch: any;
};

export const ActiveSessions: React.FC<Props> = ({ t, sessions, refetch }) => {
  const logoutTranslate = useTranslations('Navigation');
  const [deleteSession] = useDeleteSessionsDeviceMutation();

  const logoutSession = async (item: DevicesResponse) => {
    if (sessions.length <= 1) {
      toast.error('You authorize only this device');
      return;
    }
    await deleteSession(item.deviceId.toString());
    try {
      refetch();
      toast.success(`session of ${item.deviceName} device was closed`);
    } catch (e: any) {}
  };

  const activeSessions = sessions.map((item, index) => {
    return (
      <div className={s.devices__wrapper} key={index}>
        <Image
          src={`${
            item.osName === 'Mac OS'
              ? '/img/settings-profile/devices-tab/desktop_mac.svg'
              : '/img/settings-profile/devices-tab/phone_iphone.svg'
          }`}
          alt={'device'}
          width={36}
          height={36}
          className={s.devices__icon}
        />
        <div className={s.devices__content}>
          <p className={s.devices__content__title}>{item.deviceName}</p>
          <p className={s.devices__content__address}>IP: {item.ip}</p>
          <p className={s.devices__content__visit}>
            Last visit: <span>{dateToFormat(item.lastActive)}</span>
          </p>
        </div>
        <div className={'mt-auto mb-auto ml-auto'}>
          <LogoutBtn
            btnCallback={() => logoutSession(item)}
            t={logoutTranslate}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <p className={s.devices__active}>{t('active')}</p>
      {sessions.length > 0 ? (
        activeSessions
      ) : (
        <p className={s.devices__notLogged}>{t('text')}</p>
      )}
    </>
  );
};
