'use client';

import { useState } from 'react';
import { Modal } from '@/components/Modals/Modal';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { CreatePost } from '@/app/(authorized)/CreatePost';
import { GetResponse } from '@/api/profile.api';
import { Navigation } from './BarPage';
import { logout } from '@/features/customHooks/useLogout';

import s from './Navigation.module.scss';

type Props = {
  id: number;
  paidAccount: boolean;
  admin?: boolean;
  userData?: GetResponse;
  userEmail: string | null;
};

export const SideBar = ({
  userEmail = 'mocked',
  paidAccount,
  admin,
  userData,
  id,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Navigation.${key}`);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <Navigation
        id={id}
        paidAccount={paidAccount}
        admin={admin}
        pathname={pathname}
        setShowCreatePostModal={setShowCreatePostModal}
        showCreatePostModal={showCreatePostModal}
        setShowLogoutModal={setShowLogoutModal}
      />
      {showLogoutModal && (
        <Modal
          className={s.modal}
          title={translate('LogoutModal.title')}
          onClose={() => setShowLogoutModal(false)}
        >
          <div>
            {translate('LogoutModal.question')}{' '}
            <strong>{`"${userEmail}"`}</strong>?
          </div>
          <div className={s.nav__btn__modal}>
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
