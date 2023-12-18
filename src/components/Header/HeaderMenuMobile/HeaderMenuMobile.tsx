import { useTranslations } from 'next-intl';
import React from 'react';
import { MenuImage } from './MenuImage';
import s from './HeaderMenuMobile.module.scss';
import { menuOptions } from './mobileMenuData';
import Image from 'next/image';
import { usePostLogoutMutation } from '@/api/auth.api';
import { setAccessToken } from '@/accessToken';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Modal } from '@/components/Modals/Modal';
import { TransparentBtn } from '@/components/Buttons/TransparentBtn';
import { PrimaryBtn } from '@/components/Buttons/PrimaryBtn';
import { useAppSelector } from '@/redux/hooks/useSelect';

type TProps = {
  language: string;
};

export const HeaderMenuMobile = ({ language }: TProps) => {
  const t = useTranslations('Navigation');
  const userEmail = useAppSelector((state) => state.auth.user?.email);
  const [logout, { isLoading }] = usePostLogoutMutation();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const tf = useTranslations('Header');
  const router = useRouter();
  const onBlurHandler = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    if (e.relatedTarget?.id === 'mobileMenu') {
      return;
    }
    setModal(false);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setModal(!modal);
    }
  };

  const modalHandler = (e: React.MouseEvent) => {
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
    if (ref === 'logOut') {
      console.log(userEmail);
      logOutMenu();
    }
    if (ref === 'statistics') {
      console.log(2);
    }
  };
  return (
    <button className={s.container} id="mobileMenu">
      <MenuImage modal={modal} setModal={modalHandler} />
      {modal && (
        <ul className={s.settingsList}>
          {menuOptions.map(({ ref, img }) => {
            return (
              <li
                key={ref}
                className={s.settingsContainer}
                onClick={() => actionsHandler(ref)}
              >
                <Image src={img} width={24} height={24} alt={ref} />
                <span>{tf('mobileMenu.' + ref)}</span>
              </li>
            );
          })}
          <textarea
            autoFocus
            onKeyDown={keyDownHandler}
            name="post"
            onBlur={onBlurHandler}
            style={{
              opacity: '0',
              position: 'absolute',
              zIndex: '0',
              width: '0px',
              height: '0px',
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
