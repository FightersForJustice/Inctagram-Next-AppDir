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
    admin?: boolean;
    showCreatePostModal: boolean;
    t: (value: string) => string;
    createHandler: () => void;
  };
};
export const UserNavigation = (prop: UserType) => {
  const {
    prop: {
      showCreatePostModal,
      createHandler,
      paidAccount,
      pathname,
      id,
      el,
      t,
    },
  } = prop;
  const translate = t;
  const style = clsx(
    s.nav__item,
    {
      [s.nav__item__active]:
        !showCreatePostModal && pathname.startsWith('/' + el.href),
    },
    {
      [s.nav__item__active]: showCreatePostModal && el.href === 'create',
    },
    {
      [s.statistics]: el.href === 'statistics',
    }
  );
  const userPath = [
    'create',
    'profile',
    'my-profile',
    'home',
    'search',
    'messenger',
  ];
  const isPayedAccount =
    (el.href === 'statistics' && paidAccount) ||
    (el.href === 'favourites' && paidAccount);
  return isPayedAccount || userPath.includes(el.href) ? (
    <li>
      {el.href === 'create' && (
        <button className={style} onClick={createHandler}>
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
        // el.href !== 'statistics' &&
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
  ) : null;
};
