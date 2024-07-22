import Link from 'next/link';

import { HeaderNotification } from '@/components/Header/HeaderNotification';
import { HeaderMenuMobile } from './HeaderMenuMobile/HeaderMenuMobile';
import { headers } from 'next/headers';
import { HeaderClient } from './HeaderCleint';
import HeaderButton from '@/components/Header/HeaderButton/HeaderButton';
import s from './Header.module.scss';

export const Header = ({
  isAuth,
  isPublicInfo = false,
  isAdmin = false,
}: {
  isAuth: boolean;
  isAdmin?: boolean;
  isPublicInfo?: boolean;
}) => {
  const headersList = headers();
  const idHeaders = headersList.get('id') as string;
  const myId = parseInt(idHeaders, 10);
  const usersLink = isAuth ? `/profile/${myId}` : 'sign-in';
  return (
    <header className={s.wrapper}>
      <div className={s.container}>
        <Link
          href={isAdmin ? '/admin/userslist' : usersLink}
          className={s.logo}
        >
          Inctagram{isAdmin && <span className={s.title}>{'SuperAdmin'}</span>}
        </Link>

        <div className={s.notificationContainer}>
          {isAuth && <HeaderNotification />}
          <HeaderClient />
          {isAuth && (
            <HeaderMenuMobile userEmail={headers().get('userEmail')} />
          )}
          {isPublicInfo && <HeaderButton />}
        </div>
      </div>
    </header>
  );
};
