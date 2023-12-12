import Link from 'next/link';
import s from '../../MyProfile.module.scss';
import { useTranslations } from 'next-intl';
import { LogoutBtn } from '@/components/Buttons/LogoutBtn';
import { navigationBar } from './Bardata';
import BarComponent from './BarComponent';
import clsx from 'clsx';

type NavigationType = {
  pathname: string;
  paidAccount: boolean;
  setShowCreatePostModal: (value: boolean) => void;
  setShowLogoutModal: (value: boolean) => void;
};

export const Navigation = ({
  pathname,
  setShowCreatePostModal,
  setShowLogoutModal,
  paidAccount,
}: NavigationType) => {
  const t = useTranslations('Navigation');

  const mapNav = navigationBar.map((el) => {
    const style = clsx(
      s.nav__item,
      {
        [s.nav__item__active]: pathname === '/' + el.href,
      },
      {
        [s.statistics]: el.href === 'statistics',
      }
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
            {t('create')}
          </button>
        )}
        {el.href !== 'create' && el.href !== 'statistics' && (
          <Link href={'/' + el.href} className={style}>
            <BarComponent>{el.img}</BarComponent>
            {t(el.href === 'my-profile' ? 'myProfile' : el.href)}
          </Link>
        )}
        {el.href === 'statistics' && paidAccount && (
          <Link href={'/' + el.href} className={style}>
            <BarComponent>{el.img}</BarComponent>
            {t(el.href)}
          </Link>
        )}
      </li>
    );
  });
  return (
    <nav className={s.nav}>
      <ul className={s.nav__list}>{mapNav}</ul>
      <LogoutBtn btnCallback={setShowLogoutModal} t={t} />
    </nav>
  );
};
