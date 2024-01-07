'use client';

import { useState } from 'react';
import { Modal } from '@/components/Modals/Modal';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CreatePost } from '@/app/(authorized)/my-profile/CreatePost';
import { GetResponse } from '@/api/profile.api';
import { Navigation } from './BarPage';
import { logout } from '@/features/customHooks/useLogout';

import s from './Navigation.module.scss';

type Props = {
  id: number;
  paidAccount: boolean;
  userData?: GetResponse;
};

export const SideBar = ({ paidAccount, userData, id }: Props) => {
  const t = useTranslations('Navigation');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const userEmail = 'mocked';

  return (
    <>
      <Navigation
        id={id}
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
