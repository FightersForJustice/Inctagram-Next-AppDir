'use client';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { ThisDevice } from './ThisDevice';
import s from '../Tabs.module.scss';
import UAParser from 'ua-parser-js';
import { ActiveSessions } from './ActiveSessions';
import { deleteAllSessions, userSessions } from './actions';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { findDevice } from './utils/findDevice';
import { useState } from 'react';
import { DevicesResponse } from '@/api/profile.api';

type Props = {
  userAgent: string;
  sessions: DevicesResponse[];
};

export const DevicesTab = ({ userAgent, sessions }: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.DevicesTab.${key}`);

  console.log(sessions);

  const [stateSessions, setStateSessions] = useState(sessions);

  const parser = new UAParser();
  const userAgentArray = parser.setUA(userAgent).getResult();

  const currentDevice = findDevice(stateSessions, userAgentArray);
  const otherDevice = stateSessions.filter(
    (item: DevicesResponse) =>
      item.browserName !== userAgentArray.browser.name ||
      item.browserVersion !== userAgentArray.browser.version ||
      item.osName !== userAgentArray.os.name ||
      item.osVersion !== userAgentArray.os.version
  );

  const onDeleteAllSessions = async () => {
    const statusCode = await deleteAllSessions(userAgent);
    if (statusCode === 204) {
      toast.success(translate('AllSessionsClosed'));
      const sessions = await userSessions();
      setStateSessions(sessions);
    }
  };

  return (
    <div className={s.devices}>
      <ThisDevice session={currentDevice} />
      {sessions?.length && (
        <div className={'text-right'}>
          <TransparentBtn onClick={onDeleteAllSessions}>
            {translate('allSession')}
          </TransparentBtn>
        </div>
      )}
      <ActiveSessions
        sessions={otherDevice}
        setStateSessions={setStateSessions}
      />
    </div>
  );
};
