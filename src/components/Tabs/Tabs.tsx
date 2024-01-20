'use client';

import { ProfileTabsList } from './TabsList';
import { Tab } from './Tab';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import s from './Tabs.module.scss';

export default function ProfileTabs() {
  const pathname = usePathname();

  const { t } = useTranslation();
  const translate = (key: string): string => t(`SettingsProfilePage.${key}`);

  const renderTabList = () => {
    return ProfileTabsList.map((tab) => (
      <Tab
        className={clsx(s.tab, {
          [s.tabActive]: pathname === tab.link,
        })}
        key={tab.name}
        link={tab.link}
        tabName={translate(tab.name)}
        icon={tab.icon}
      />
    ));
  };

  return <div className={s.tabsContainer}>{renderTabList()}</div>;
}
