'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next-intl/client';

import { HeaderNotification } from '@/components/Header/HeaderNotification';

import { TranslationSelect } from './HeaderTranslation/TranslationSelect';
import { HeaderMenuMobile } from './HeaderMenuMobile/HeaderMenuMobile';
import { useRouter } from 'next/navigation';
import s from './Header.module.scss';

export const Header = () => {
  const [isPending, startTransition] = useTransition();
  const [language, setLanguage] = useState(
    /\/ru/.test(location.pathname) ? 'ru' : 'en'
  );
  useEffect(() => {
    setLanguage(/\/ru/.test(location.pathname) ? 'ru' : 'en');
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (value: string) => {
    startTransition(() => {
      router.replace(`/${value}${pathname}`);
    });
  };
  return (
    <header className={s.wrapper}>
      <div className={s.container}>
        <Link href={'/my-profile'} className={s.logo}>
          Inctagram
        </Link>

        <div className={s.notificationContainer}>
          <HeaderNotification language={language} />
          <TranslationSelect
            language={language}
            onSelectChange={onSelectChange}
          />
          <HeaderMenuMobile language={language} />
        </div>
      </div>
    </header>
  );
};
