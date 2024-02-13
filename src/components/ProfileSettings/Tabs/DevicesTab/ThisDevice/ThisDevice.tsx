import React from 'react';
import Image from 'next/image';

import s from './ThisDeviceTab.module.scss';
import { DevicesResponse } from '@/api/profile.api';
import { dateToFormat } from '@/utils/dateToFormat';
import { findMatchingString } from '@/utils/findBrowserName';

type Props = {
  session: DevicesResponse;
};

export const ThisDevice: React.FC<Props> = ({ session }) => {
  if (session) {
    return (
      <>
        <p className={s.devices__title}>{session?.deviceName ?? 'No device'}</p>
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
    return <div></div>;
  }
};
