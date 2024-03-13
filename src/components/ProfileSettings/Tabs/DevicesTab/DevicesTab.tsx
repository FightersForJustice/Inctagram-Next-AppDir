'use client';

// @ts-ignore

import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { ThisDevice } from './ThisDevice';
import { ActiveSessions } from './ActiveSessions';
import {
  DevicesResponse,
  useDeleteSessionsTerminateAllMutation,
  useGetDeviceSessionsQuery,
} from '@/api/profile.api';
import { toast } from 'react-toastify';
import s from '../Tabs.module.scss';
import { userSessions } from './actions';

export const DevicesTab = () => {
  const { data: sessions, refetch } = useGetDeviceSessionsQuery();
  const [deleteAllSessions] = useDeleteSessionsTerminateAllMutation();

  const AllSessions = async () => {
    const sessions = await userSessions();
    console.log(sessions);
  };

  const sessionsDefault: DevicesResponse[] = [
    {
      deviceName: 'Apple iMac 27',
      ip: '192.168.1.10',
      lastActive: '22.09.2022',
      deviceType: 'PC',
      deviceId: 0,
      browserName: 'google',
      osName: 'MAC OS',
      browserVersion: '1.0.0',
      osVersion: 'Catalina',
    },
    {
      deviceName: 'Samsung',
      ip: '192.168.1.20',
      lastActive: '22.09.2022',
      deviceType: 'mobile',
      deviceId: 1,
      browserName: 'google',
      osName: 'WINDOWS',
      browserVersion: '1.0.0',
      osVersion: 'WINDOWS 11',
    },
  ];

  const onDeleteAllSessions = async () => {
    if (sessions) {
      if (sessions.length <= 1) {
        toast.error('You authorize only this device');
      } else {
        await deleteAllSessions();
        try {
          refetch();
          toast.success('All sessions except current was deleted');
        } catch (e: any) {
          toast.error(e.error);
        }
      }
    }
  };

  return (
    <div className={s.devices}>
      <ThisDevice session={sessions ? sessions[0] : sessionsDefault[0]} />
      <button onClick={AllSessions}>AllSessions</button>
      {sessions?.length && (
        <div className={'text-right'}>
          <TransparentBtn onClick={onDeleteAllSessions}>
            Terminate all other session
          </TransparentBtn>
        </div>
      )}
      <ActiveSessions
        refetch={refetch}
        sessions={sessions || sessionsDefault}
      />
    </div>
  );
};
