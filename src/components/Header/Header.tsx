import Link from 'next/link';

import { HeaderNotification } from '@/components/Header/HeaderNotification';
import { HeaderMenuMobile } from './HeaderMenuMobile/HeaderMenuMobile';
import { headers } from 'next/headers';
import { HeaderClient } from './HeaderCleint';
import HeaderButton from '@/components/Header/HeaderButton/HeaderButton';
import s from './Header.module.scss';
import { ADMIN_ROUTES, AUTH_ROUTES, ROUTES } from '@/appRoutes/routes';

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
  const usersLink = isAuth
    ? ROUTES.PROFILE + `/${myId}`
    : AUTH_ROUTES.PUBLIC_POST_PAGE;
  const accessToken = headersList.get('accessToken') as string;

  return (
    <header className={s.wrapper}>
      <div className={s.container}>
        <Link
          href={isAdmin ? ADMIN_ROUTES.ADMIN_USERS_LIST : usersLink}
          className={s.logo}
        >
          Inctagram{isAdmin && <span className={s.title}>{'SuperAdmin'}</span>}
        </Link>

        <div className={s.notificationContainer}>
          {isAuth && <HeaderNotification accessToken={accessToken} />}
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
