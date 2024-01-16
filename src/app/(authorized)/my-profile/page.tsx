'use client';
import React, { useEffect, useState } from 'react';

import { SubscribersModal } from '@/components/Modals/SubscribersModal';
import { SubscriptionsModal } from '@/components/Modals/SubscriptionsModal';
import { Profile } from './Profile';
import { appSliceActions } from '@/redux/reducers/app/appSlice';
import { useAppDispatch } from '@/redux/hooks/useDispatch';

import s from './MyProfile.module.scss';
import { useSelector } from 'react-redux';
import { appIsLoad } from '@/redux/reducers/app/appSelectors';
import { Loader } from '@/components/Loader';
import { useAppLoad } from '@/redux/hooks/useAppLoad';

const MyProfile: React.FC = () => {
  useAppLoad(false)

  const isLoad = useSelector(appIsLoad);
  const [paidAccount] = useState(true);
  const [showSubscribersModal, setShowSubscribersModal] = useState(false);
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);

  let data; //mocked data

  return (
    <>
     {isLoad && <Loader />}
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
