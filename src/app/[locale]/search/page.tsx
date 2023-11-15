'use client';

import React from 'react';
import s from './Search.module.scss';
import { SideBar } from '../my-profile/navigation';
import { usePathname } from 'next-intl/client';
import { SearchContent } from './SearchContent';

const Page = () => {
  const pathname = usePathname();

  return (
    <div className={s.container}>
      <div className={s.wrapper} id={'wrapper'}>
        <SideBar pathname={pathname} paidAccount={false} />
        <SearchContent />
      </div>
    </div>
  );
};

export default Page;
