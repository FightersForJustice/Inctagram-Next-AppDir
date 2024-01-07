'use client'

import React from 'react';
import s from '../Tabs.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
// @ts-ignore
import { useTranslations } from 'next-intl';

import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { ThisDevice } from './ThisDevice';
import { ActiveSessions } from './ActiveSessions';
import {
  DevicesResponse,
  useDeleteSessionsTerminateAllMutation,
  useGetDeviceSessionsQuery,
} from '@/api/profile.api';
import { toast } from 'react-toastify';

export const DevicesTab = () => {
  const t = useTranslations('SettingsProfilePage.DevicesTab');
  const { data: sessions, refetch } = useGetDeviceSessionsQuery();
  const [deleteAllSessions] = useDeleteSessionsTerminateAllMutation();

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
    <Tabs.Content className={s.TabsContent} value="devices">
      <div className={s.devices}>
        <ThisDevice
          t={t}
          session={sessions ? sessions[0] : sessionsDefault[0]}
        />

        {sessions?.length && (
          <div className={'text-right'}>
            <TransparentBtn onClick={onDeleteAllSessions}>
              Terminate all other session
            </TransparentBtn>
          </div>
        )}
        <ActiveSessions
          refetch={refetch}
          t={t}
          sessions={sessions || sessionsDefault}
        />
      </div>
    </Tabs.Content>
  );
};
