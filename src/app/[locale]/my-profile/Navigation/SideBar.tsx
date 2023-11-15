import React, { useState } from 'react';
import s from '../MyProfile.module.scss';
import { Modal } from '@/components/Modals/Modal';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader';
import { useTranslations } from 'next-intl';
import { CreatePost } from '../CreatePost/CreatePost';
import { GetResponse } from '@/api/profile.api';
import { usePostLogoutMutation } from '@/api';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { Navigation } from './components/Navigation/Navigation';

type Props = {
  pathname: string;
  paidAccount: boolean;
  userData?: GetResponse;
};

export const SideBar: React.FC<Props> = ({
  pathname,
  paidAccount,
  userData,
}) => {
  const t = useTranslations('Navigation');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const router = useRouter();
  const [logout, { isLoading }] = usePostLogoutMutation();
  const userEmail = useAppSelector((state) => state.auth.user?.email);

  const onLogout = () => {
    setShowLogoutModal(false);
    logout()
      .unwrap()
      .then(() => {
        router.push('/sign-in');
        toast.success('Logout success');
      })
      .catch(() => {
        toast.error('Logout fail');
      });
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
      {isLoading && <Loader />}
    </>
  );
};
