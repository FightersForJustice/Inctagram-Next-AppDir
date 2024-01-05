import Link from 'next/link';

import { HeaderNotification } from '@/components/Header/HeaderNotification';
import { TranslationSelect } from './HeaderTranslation/TranslationSelect';
import { HeaderMenuMobile } from './HeaderMenuMobile/HeaderMenuMobile';

import s from './Header.module.scss';

export const Header = ({ isAuth }: { isAuth: boolean }) => {
  return (
    <header className={s.wrapper}>
      <div className={s.container}>
        <Link href={'/my-profile'} className={s.logo}>
          Inctagram
        </Link>

        <div className={s.notificationContainer}>
          {isAuth && <HeaderNotification />}
          <TranslationSelect />
          {isAuth && <HeaderMenuMobile />}
        </div>
      </div>
    </header>
  );
};
