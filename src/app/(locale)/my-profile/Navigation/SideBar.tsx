'use client';

import React, { useState } from 'react';
import s from '../MyProfile.module.scss';
import { Modal } from '@/components/Modals/Modal';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CreatePost } from '../CreatePost/CreatePost';
import { GetResponse } from '@/api/profile.api';
import { Navigation } from './BarPage';
import Cookies from 'js-cookie';
import { logOutAction } from '@/app/actions';

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
          width={'450px'}
          title={t('LogoutModal.title')}
          onClose={() => setShowLogoutModal(false)}
        >
          {t('LogoutModal.question')} <strong>{`"${userEmail}"`}</strong>?
          <div className={s.nav__btn__modal}>
            <TransparentBtn onClick={onLogout}>
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
