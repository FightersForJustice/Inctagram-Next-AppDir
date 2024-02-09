import Link from 'next/link';

import { HeaderNotification } from '@/components/Header/HeaderNotification';
import { TranslationSelect } from './HeaderTranslation/TranslationSelect';
import { HeaderMenuMobile } from './HeaderMenuMobile/HeaderMenuMobile';

import s from './Header.module.scss';
import { headers } from 'next/headers';

export const Header = ({ isAuth }: { isAuth: boolean }) => {
  const headersList = headers();
  const idHeaders = headersList.get('id') as string;
  const myId = parseInt(idHeaders, 10);

  return (
    <header className={s.wrapper}>
      <div className={s.container}>
        <Link href={isAuth ? `/profile/${myId}` : 'sign-in'} className={s.logo}>
          Inctagram
        </Link>

        <div className={s.notificationContainer}>
          {isAuth && <HeaderNotification />}
          <TranslationSelect />
          {isAuth && (
            <HeaderMenuMobile userEmail={headers().get('userEmail')} />
          )}
        </div>
      </div>
    </header>
  );
};
