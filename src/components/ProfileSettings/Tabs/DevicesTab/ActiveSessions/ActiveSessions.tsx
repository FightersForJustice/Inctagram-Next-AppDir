import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { LogoutBtn } from '@/components/Buttons/LogoutBtn';
import {
  DevicesResponse,
  useDeleteSessionsDeviceMutation,
} from '@/api/profile.api';
import { dateToFormat } from '@/utils/dateToFormat';

import s from './ActiveSessions.module.scss';

type Props = {
  sessions: DevicesResponse[];
};

export const ActiveSessions: React.FC<Props> = ({ sessions }) => {
  const { t } = useTranslation();
  const logoutTranslate = (key: string): string => t(`Navigation.${key}`);
  const translate = (key: string): string =>
    t(`SettingsProfilePage.DevicesTab.${key}`);

  const [deleteSession] = useDeleteSessionsDeviceMutation();

  const logoutSession = async (item: DevicesResponse) => {
    if (sessions.length <= 1) {
      toast.error('You authorize only this device');
      return;
    }
    await deleteSession(item.deviceId.toString());
    try {
      toast.success(`session of ${item.deviceName} device was closed`);
    } catch (e: any) {}
  };

  const activeSessions = sessions.map((item, index) => {
    return (
      <div className={s.devices__wrapper} key={index}>
        <Image
          src={`${
            item.deviceType === 'mobile'
              ? '/img/settings-profile/devices-tab/phone_iphone.svg'
              : '/img/settings-profile/devices-tab/desktop_mac.svg'
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
          <p className={s.devices__content__visit}>
            Browser Name: <span>{item.browserName}</span>
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
      <p className={s.devices__active}>{translate('active')}</p>
      {sessions.length > 0 ? (
        activeSessions
      ) : (
        <p className={s.devices__notLogged}>{translate('text')}</p>
      )}
    </>
  );
};
