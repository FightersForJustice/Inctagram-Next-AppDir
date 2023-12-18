import { useState, FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/redux/hooks/useSelect';
import { MenuImage } from '@/components/Header/HeaderMenuMobile/components/MenuImage';
import { menuOptions } from '@/components/Header/HeaderMenuMobile/components/mobileMenuData';
import { usePostLogoutMutation } from '@/api/auth.api';
import { setAccessToken } from '@/accessToken';
import { Modal } from '@/components/Modals/Modal';
import { TransparentBtn } from '@/components/Buttons/TransparentBtn';
import { PrimaryBtn } from '@/components/Buttons/PrimaryBtn';
import { MenuOption } from '@/components/Header/HeaderMenuMobile/components/MenuOption';

import s from './HeaderMenuMobile.module.scss';

type TProps = {
  language: string;
};

export const HeaderMenuMobile = ({ language }: TProps) => {
  const t = useTranslations('Navigation');
  const userEmail = useAppSelector((state) => state.auth.user?.email);
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

  const onLogout = () => {
    setShowLogoutModal(false);
    logout()
      .unwrap()
      .then(() => {
        setAccessToken('');
        router.push('/sign-in');
        toast.success('Logout success');
      })
      .catch(() => {
        toast.error('Logout fail');
      });
  };

  const logOutMenu = () => {
    setShowLogoutModal(true);
    setModal(!modal);
  };

  const actionsHandler = (ref: string) => {
    console.log(ref);
    if (ref === 'logOut') {
      return logOutMenu();
      // console.log(3)
    }
    if (ref === 'statistics') {
      setShowLogoutModal(false);
      router.push('/statistics');
      console.log(2);
      return;
    }
    if (ref === 'profileSettings') {
      console.log(1);
      setShowLogoutModal(false);
      router.push('/my-profile');
      return;
    }
    if (ref === 'favourites') {
      console.log(4);
      setShowLogoutModal(false);
      router.push('/favourites');
      return;
    }
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
              height: '0'
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
