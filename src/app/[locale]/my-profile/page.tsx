'use client';
import React, { useState } from 'react';
import s from './MyProfile.module.scss';
import { usePathname } from 'next-intl/client';
import { SubscribersModal } from '@/components/Modals/SubscribersModal';
import { SideBar } from './Navigation';
import { SubscriptionsModal } from '@/components/Modals/SubscriptionsModal';
import { Profile } from './Profile';
import { Loader } from '@/components/Loader';
import { useGetProfileQuery } from '@/api';

const MyProfile = () => {
  const [paidAccount] = useState(true);
  const [showSubscribersModal, setShowSubscribersModal] = useState(false);
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);
  const pathname = usePathname();

  const { data, isLoading } = useGetProfileQuery();

  if (isLoading) return <Loader />;

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper} id={'wrapper'}>
          <SideBar
            pathname={pathname}
            paidAccount={paidAccount}
            userData={data!}
          />
          <Profile
            setShowSubscriptionsModal={setShowSubscriptionsModal}
            setShowSubscribersModal={setShowSubscribersModal}
            paidAccount={paidAccount}
            userData={data!}
          />
        </div>
      </div>
      {showSubscribersModal && (
        <SubscribersModal setShowSubscribersModal={setShowSubscribersModal} />
      )}
      {showSubscriptionsModal && (
        <SubscriptionsModal
          setShowSubscriptionsModal={setShowSubscriptionsModal}
        />
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default MyProfile;
