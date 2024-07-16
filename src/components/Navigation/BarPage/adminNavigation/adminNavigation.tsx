import clsx from 'clsx';
import Link from 'next/link';
import BarComponent from '../barComponent/BarComponent';
import s from '../../Navigation.module.scss';

type UserType = {
  prop: {
    id: number;
    pathname: string;
    el: {
      href: string;
      img: JSX.Element;
    };
    paidAccount: boolean;
    showCreatePostModal: boolean;
    t: (value: string) => string;
  };
};
export const AdminNavigation = (prop: UserType) => {
  const {
    prop: { showCreatePostModal, paidAccount, pathname, id, el, t },
  } = prop;
  const translate = t;
  const style = clsx(s.nav__item, {
    [s.nav__item__active]: pathname.startsWith('/admin/' + el.href),
  });
  const prefix = 'admin';
  return (
    <>
      {el.href === 'userslist' && (
        <Link href={'/' + prefix + '/' + el.href} className={style}>
          <BarComponent>{el.img}</BarComponent>
          <span>{translate(el.href)}</span>
        </Link>
      )}
      {el.href === 'statistics' && (
        <Link href={'/' + prefix + '/' + el.href} className={style}>
          <BarComponent>{el.img}</BarComponent>
          <span>{translate(el.href)}</span>
        </Link>
      )}
      {el.href === 'paymentslist' && (
        <Link href={'/' + prefix + '/paymentslist'} className={style}>
          <BarComponent>{el.img}</BarComponent>
          <span>{translate(el.href)}</span>
        </Link>
      )}
      {el.href === 'postslist' && (
        <Link href={'/' + prefix + '/postslist'} className={style}>
          <BarComponent>{el.img}</BarComponent>
          <span>{translate(el.href)}</span>
        </Link>
      )}
    </>
  );
};
