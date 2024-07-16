import { useTranslation } from 'react-i18next';

import { LogoutBtn } from '@/components/Buttons/LogoutBtn';
import { userNavigationBar } from './Bardata';

import { Links } from './links/Links';
import s from '../Navigation.module.scss';

type NavigationType = {
  id: number;
  pathname: string;
  paidAccount: boolean;
  admin?: boolean;
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
  admin,
}: NavigationType) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Navigation.${key}`);
  const mapUserNav = userNavigationBar.map((el, i) => {
    const createHandler = () => {
      if (el.href === 'create') {
        setShowCreatePostModal(true);
      }
    };
    return (
      // <li key={el.href} onClick={createHandler}>
      <Links
        key={i}
        el={el}
        id={id}
        pathname={pathname}
        paidAccount={paidAccount}
        admin={admin}
        showCreatePostModal={showCreatePostModal}
        createHandler={createHandler}
        t={translate}
      />
      // </li>
    );
  });
  return (
    <nav className={s.nav}>
      <div className={s.nav__container}>
        <ul className={s.nav__list}>{mapUserNav}</ul>
        <LogoutBtn btnCallback={setShowLogoutModal} t={translate} />
      </div>
    </nav>
  );
};
