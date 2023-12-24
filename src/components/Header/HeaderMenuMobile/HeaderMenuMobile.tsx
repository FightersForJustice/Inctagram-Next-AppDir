'use client';

import { useState, FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { MenuImage } from '@/components/Header/HeaderMenuMobile/components/MenuImage';
import { menuOptions } from '@/components/Header/HeaderMenuMobile/components/mobileMenuData';
import { usePostLogoutMutation } from '@/api/auth.api';
import { Modal } from '@/components/Modals/Modal';
import { TransparentBtn } from '@/components/Buttons/TransparentBtn';
import { PrimaryBtn } from '@/components/Buttons/PrimaryBtn';
import { MenuOption } from '@/components/Header/HeaderMenuMobile/components/MenuOption';
import { logOutAction } from '@/app/actions';

import s from './HeaderMenuMobile.module.scss';

export const HeaderMenuMobile = () => {
  const t = useTranslations('Navigation');
  const userEmail = 'mocked'; //mocked
  const [logout, { isLoading }] = usePostLogoutMutation();
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

  const onLogout = async () => {
    setShowLogoutModal(false);
    const refreshToken = Cookies.get('refreshToken');
    //don`t forget handle bad response
    const res = await logOutAction(refreshToken);

    Cookies.remove('refreshToken');
    Cookies.remove('accessToken');

    router.push('/sign-in');
    toast.success('Logout success');
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
      router.push('/my-profile');
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
          title={t('LogoutModal.title')}
          onClose={() => setShowLogoutModal(false)}
          className={s.modal}
        >
          <div>
            {t('LogoutModal.question')} <strong>{`"${userEmail}"`}</strong>?
          </div>
          <div className={s.modal__btn}>
            <TransparentBtn onClick={onLogout}>
              {t('LogoutModal.btnYes')}
            </TransparentBtn>
            <PrimaryBtn onClick={() => setShowLogoutModal(false)}>
              {t('LogoutModal.btnNo')}
            </PrimaryBtn>
          </div>
        </Modal>
      )}
    </button>
  );
};
