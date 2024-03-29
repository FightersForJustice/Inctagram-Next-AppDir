import React from 'react';
import Image from 'next/image';

import s from './ThisDeviceTab.module.scss';
import { DevicesResponse } from '@/api/profile.api';
import { dateToFormat } from '@/utils/dateToFormat';
import { findMatchingString } from '@/utils/findBrowserName';
import { useTranslation } from 'react-i18next';

type Props = {
  session: DevicesResponse | undefined;
};

export const ThisDevice: React.FC<Props> = ({ session }) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.DevicesTab.${key}`);
  if (session) {
    return (
      <>
        <p className={s.devices__title}>
          {session?.deviceName ?? translate('currentDevice')}
        </p>
        <div className={s.devices__wrapper}>
          <Image
            src={findMatchingString(session?.browserName) ?? 'none'}
            alt={'WEB'}
            width={36}
            height={36}
            className={s.devices__icon}
          />
          <div className={s.devices__content}>
            <p className={s.devices__content__title}>{session?.browserName}</p>
            <p className={s.devices__content__address}>IP: {session?.ip}</p>
            <p className={s.devices__content__status}>
              {dateToFormat(session?.lastActive)}
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className={s.sessionDelete}>
        Текущая сессия удалена и скоро она не будет доступна
      </div>
    );
  }
};
