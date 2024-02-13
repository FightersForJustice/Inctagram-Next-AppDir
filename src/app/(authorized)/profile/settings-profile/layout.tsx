import { ReactNode } from 'react';
import ProfileTabs from '@/components/Tabs/Tabs';

import s from './SettingsProfile.module.scss';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={s.container}>
      <ProfileTabs />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
