'use client';

import { usePathname } from 'next-intl/client';
import { SearchContent } from './SearchContent';

import s from './Search.module.scss';

const Page = () => {
  const pathname = usePathname();

  return (
    <div className={s.container}>
      <div className={s.wrapper} id={'wrapper'}>
        <SearchContent />
      </div>
    </div>
  );
};

export default Page;
