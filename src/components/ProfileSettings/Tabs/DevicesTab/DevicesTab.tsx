'use client';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { ThisDevice } from './ThisDevice';
import s from '../Tabs.module.scss';
import UAParser from 'ua-parser-js';
import { ActiveSessions } from './ActiveSessions';
import { deleteAllSessions } from './actions';
import { toast } from 'react-toastify';

type Props = {
  userAgent: string;
  sessions: any;
};

export const DevicesTab = ({ userAgent, sessions }: Props) => {
  // console.log(userAgent);
  console.log(sessions);

  const parser = new UAParser();
  const userAgentArray = parser.setUA(userAgent).getResult();

  const currentDevice = sessions.find(
    (item: any) =>
      item.browserName === userAgentArray.browser.name &&
      item.browserVersion === userAgentArray.browser.version &&
      item.osName === userAgentArray.os.name &&
      item.osVersion === userAgentArray.os.version
  );
  //console.log(currentDevice);
  const otherDevice = sessions.filter(
    (item: any) =>
      item.browserName !== userAgentArray.browser.name ||
      item.browserVersion !== userAgentArray.browser.version ||
      item.osName !== userAgentArray.os.name ||
      item.osVersion !== userAgentArray.os.version
  );

  //console.log(otherDevice);
  const onDeleteAllSessions = async () => {
    const statusCode = await deleteAllSessions(userAgent);
    if (statusCode === 204) {
      toast.success('Все сессии закрыты');
    }
  };

  return (
    <div className={s.devices}>
      <ThisDevice session={currentDevice} />
      {sessions?.length && (
        <div className={'text-right'}>
          <TransparentBtn onClick={onDeleteAllSessions}>
            Terminate all other session
          </TransparentBtn>
        </div>
      )}
      <ActiveSessions sessions={otherDevice} />
    </div>
  );
};
