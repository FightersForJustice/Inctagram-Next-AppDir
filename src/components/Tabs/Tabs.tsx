'use client';

import { AdminProfileTabsList, ProfileTabsList } from './TabsList';
import { Tab } from './Tab';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import s from './Tabs.module.scss';

let prefix = '';
let tabs = ProfileTabsList;

export default function ProfileTabs() {
  const pathname = usePathname();

  if (pathname.slice(1, 6) === 'admin') {
    tabs = AdminProfileTabsList;
    const currentId = pathname.split('/')
    prefix = currentId[currentId.length - 1];
  }
  const { t } = useTranslation();
  const translate = (key: string): string => t(`SettingsProfilePage.${key}`);
  const renderTabList = () => {
    return tabs.map((tab) => {
      return <Tab
        className={clsx(s.tab, {
          [s.tabActive]: pathname === tab.link + prefix,
        })}
        key={tab.name}
        link={tab.link + prefix}
        tabName={translate(tab.name)}
        icon={tab.icon}
      />}
    );
  };

  return <div className={s.tabsContainer}>{renderTabList()}</div>;
}
