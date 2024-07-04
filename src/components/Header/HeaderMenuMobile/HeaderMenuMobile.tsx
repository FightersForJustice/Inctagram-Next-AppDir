'use client';

import { useRouter } from 'next/navigation';
import { FocusEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PrimaryBtn } from '@/components/Buttons/PrimaryBtn';
import { TransparentBtn } from '@/components/Buttons/TransparentBtn';
import { MenuImage } from '@/components/Header/HeaderMenuMobile/components/MenuImage';
import { MenuOption } from '@/components/Header/HeaderMenuMobile/components/MenuOption';
import { menuOptions } from '@/components/Header/HeaderMenuMobile/components/mobileMenuData';
import { Modal } from '@/components/Modals/Modal';
import { logout } from '@/features/customHooks/useLogout';

import s from './HeaderMenuMobile.module.scss';

export const HeaderMenuMobile = ({
  userEmail = 'mocked',
}: {
  userEmail: string | null;
}) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Navigation.${key}`);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [modal, setModal] = useState(false);

  const router = useRouter();
  const onBlurHandler = (e: FocusEvent<HTMLTextAreaElement, Element>) => {
    if (e.relatedTarget?.id === 'mobileMenu') {
      return;
    }
    setModal(false);
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setModal(!modal);
    }
  };

  const modalHandler = (e: MouseEvent) => {
    if (e.currentTarget.id === 'dots') {
      return setModal(!modal);
    }
  };

  const logOutMenu = () => {
    setShowLogoutModal(true);
    setModal(!modal);
  };

  const actionsHandler = (ref: string) => {
    if (ref === 'logOut') {
      return logOutMenu();
    }
    if (ref === 'statistics') {
      router.push('/statistics');
    }
    if (ref === 'profileSettings') {
      router.push('/profile/settings-profile/general-information');
    }
    if (ref === 'favourites') {
      router.push('/favourites');
    }
    setModal(false);
  };

  return (
    <button className={s.container} id="mobileMenu">
      <MenuImage modal={modal} setModal={modalHandler} />
      {modal && (
        <ul className={s.settingsList}>
          {menuOptions.map(({ ref, img }) => {
            return (
              <MenuOption
                key={ref}
                className={s.settingsContainer}
                textRef={ref}
                img={img}
                actionsHandler={actionsHandler}
              />
            );
          })}
          <textarea
            autoFocus
            onKeyDown={keyDownHandler}
            name="menu"
            onBlur={onBlurHandler}
            style={{
              opacity: '0',
              position: 'absolute',
              width: '0',
              height: '0',
            }}
          />
        </ul>
      )}

      {showLogoutModal && (
        <Modal
          title={translate('LogoutModal.title')}
          onClose={() => setShowLogoutModal(false)}
          className={s.modal}
        >
          <div>
            {translate('LogoutModal.question')}{' '}
            <strong>{`"${userEmail}"`}</strong>?
          </div>
          <div className={s.modal__btn}>
            <TransparentBtn
              onClick={() => logout(setShowLogoutModal, translate, router)}
            >
              {translate('LogoutModal.btnYes')}
            </TransparentBtn>
            <PrimaryBtn onClick={() => setShowLogoutModal(false)}>
              {translate('LogoutModal.btnNo')}
            </PrimaryBtn>
          </div>
        </Modal>
      )}
    </button>
  );
};
