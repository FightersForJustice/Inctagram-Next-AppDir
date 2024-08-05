import Link from 'next/link';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { LogoutBtn } from '@/components/Buttons/LogoutBtn';
import { navigationBar } from './Bardata';
import BarComponent from './BarComponent';

import s from '../Navigation.module.scss';
import { useEffect, useState } from 'react';

type NavigationType = {
  id: number;
  pathname: string;
  paidAccount: boolean;
  setShowCreatePostModal: (value: boolean) => void;
  setShowLogoutModal: (value: boolean) => void;
  showCreatePostModal: boolean;
};

export const Navigation = ({
  id,
  pathname,
  setShowCreatePostModal,
  showCreatePostModal,
  setShowLogoutModal,
  paidAccount,
}: NavigationType) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Navigation.${key}`);
  const [isMyProfilePage, setIsMyProfilePage] = useState<boolean>(true)

  useEffect(() => {
      const idMatch = pathname.match(/\/(\d+)(\/|$)/);
      const currentUserId = idMatch ? +idMatch[1] : null;
      setIsMyProfilePage(currentUserId === id);
  }, [pathname]);

  const mapNav = navigationBar.map((el) => {
    const style = clsx(
      s.nav__item,
      {
        [s.nav__item__active]: !showCreatePostModal && pathname.startsWith('/' + el.href),
      },
      {
        [s.nav__item__active]: showCreatePostModal && el.href === 'create',
      },
      {
        [s.statistics]: el.href === 'statistics',
      },
      {
        [s.nav__item__not__active]: !isMyProfilePage && el.href === 'profile',
      },

    );
    const createHandler = () => {
      if (el.href === 'create') {
        setShowCreatePostModal(true);
      }
    };
    return (
      <li key={el.href} onClick={createHandler}>
        {el.href === 'create' && (
          <button className={style}>
            <BarComponent>{el.img}</BarComponent>
            <span>{translate('create')}</span>
          </button>
        )}
        {el.href === 'profile' && (
          <Link href={'/profile/' + id} className={style}>
            <BarComponent>{el.img}</BarComponent>
            <span>
              {translate(el.href === 'profile' ? 'myProfile' : el.href)}
            </span>
          </Link>
        )}
        {el.href !== 'create' &&
          el.href !== 'statistics' &&
          el.href !== 'profile' && (
            <Link href={'/' + el.href} className={style}>
              <BarComponent>{el.img}</BarComponent>
              <span>
                {translate(el.href === 'my-profile' ? 'myProfile' : el.href)}
              </span>
            </Link>
          )}
        {el.href === 'statistics' && paidAccount && (
          <Link href={'/' + el.href} className={style}>
            <BarComponent>{el.img}</BarComponent>
            <span>{translate(el.href)}</span>
          </Link>
        )}
      </li>
    );
  });

  return (
    <nav className={s.nav}>
      <div className={s.nav__container}>
        <ul className={s.nav__list}>{mapNav}</ul>
        <LogoutBtn btnCallback={setShowLogoutModal} t={translate} />
      </div>
    </nav>
  );
};
