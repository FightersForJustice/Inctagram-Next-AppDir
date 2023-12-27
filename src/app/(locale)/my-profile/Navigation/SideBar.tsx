'use client';

import { useState } from 'react';
import { Modal } from '@/components/Modals/Modal';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CreatePost } from '../CreatePost/CreatePost';
import { GetResponse } from '@/api/profile.api';
import { Navigation } from './BarPage';
import { logout } from '@/features/customHooks/useLogout';

import s from '../MyProfile.module.scss';

type Props = {
  pathname: string;
  paidAccount: boolean;
  userData?: GetResponse;
};

export const SideBar = ({ pathname, paidAccount, userData }: Props) => {
  const t = useTranslations('Navigation');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const router = useRouter();
  const userEmail = 'mocked';

  return (
    <>
      <Navigation
        paidAccount={paidAccount}
        pathname={pathname}
        setShowCreatePostModal={setShowCreatePostModal}
        setShowLogoutModal={setShowLogoutModal}
      />
      {showLogoutModal && (
        <Modal
          className={s.modal}
          title={t('LogoutModal.title')}
          onClose={() => setShowLogoutModal(false)}
        >
          <div>
            {t('LogoutModal.question')} <strong>{`"${userEmail}"`}</strong>?
          </div>
          <div className={s.nav__btn__modal}>
            <TransparentBtn
              onClick={() => logout(setShowLogoutModal, t, router)}
            >
              {t('LogoutModal.btnYes')}
            </TransparentBtn>
            <PrimaryBtn onClick={() => setShowLogoutModal(false)}>
              {t('LogoutModal.btnNo')}
            </PrimaryBtn>
          </div>
        </Modal>
      )}
      {showCreatePostModal && (
        <CreatePost
          setShowCreatePostModal={setShowCreatePostModal}
          showCreatePostModal={showCreatePostModal}
          userData={userData!}
        />
      )}
    </>
  );
};
