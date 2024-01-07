'use client';

import { Root, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useTranslations } from 'next-intl';
import {
  InfoCircledIcon,
  DesktopIcon,
  GearIcon,
  BackpackIcon,
} from '@radix-ui/react-icons';

import { GeneralInformationTab } from './GeneralInformationTab/GeneralInformationTab';
import { DevicesTab } from './DevicesTab/DevicesTab';
import { AccountManagementTab } from './AccountManagementTab/AccountManagementTab';
import { MyPayments } from '@/components/ProfileSettings/Tabs/MyPaymentsTab/MyPaymentsTab';

import s from './Tabs.module.scss';

const TabsDemo = () => {
  const t = useTranslations('SettingsProfilePage');
  return (
    <div className={s.container}>
      <Root className={s.TabsRoot} defaultValue="generalInformation">
        <TabsList className={s.TabsList} aria-label="Manage your account">
          <TabsTrigger className={s.TabsTrigger} value="generalInformation">
            <p className={s.TabsText}>{t('GeneralInformationTab.titleTab')}</p>
            <InfoCircledIcon className={s.TabsIcon} />
          </TabsTrigger>
          <TabsTrigger className={s.TabsTrigger} value="devices">
            <p className={s.TabsText}>{t('DevicesTab.titleTab')}</p>
            <DesktopIcon className={s.TabsIcon} />
          </TabsTrigger>
          <TabsTrigger className={s.TabsTrigger} value="accountManagement">
            <p className={s.TabsText}>{t('AccountManagementTab.titleTab')}</p>
            <GearIcon className={s.TabsIcon} />
          </TabsTrigger>
          <TabsTrigger className={s.TabsTrigger} value="myPayments">
            <p className={s.TabsText}>{t('MyPaymentsTab.titleTab')}</p>
            <BackpackIcon className={s.TabsIcon} />
          </TabsTrigger>
        </TabsList>
        <GeneralInformationTab />
        <DevicesTab />
        <AccountManagementTab />
        <MyPayments />
      </Root>
    </div>
  );
};

export default TabsDemo;
