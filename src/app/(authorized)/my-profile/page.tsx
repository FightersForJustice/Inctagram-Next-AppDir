'use client';
import { useState } from 'react';
import { SubscribersModal } from '@/components/Modals/SubscribersModal';
import { SubscriptionsModal } from '@/components/Modals/SubscriptionsModal';
import { Profile } from './Profile/Profile';

import s from './MyProfile.module.scss';

const MyProfile = () => {
  const [paidAccount] = useState(true);
  const [showSubscribersModal, setShowSubscribersModal] = useState(false);
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);

  let data; //mocked data

  return (
    <>
      <div className={s.container}>
        <div className={s.containerWrapper}>
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
    </>
  );
};

export default MyProfile;
