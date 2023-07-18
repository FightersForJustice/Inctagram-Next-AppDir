"use client";

import React, { useState } from "react";
import s from "./MyProfile.module.scss";
import { usePathname } from "next-intl/client";
import { SubscribersModal } from "./SubscribersModal/SubscribersModal";
import { Navigation } from "./Navigation/Navigation";
import { SubscriptionsModal } from "./SubscriptionsModal/SubscriptionsModal";
import { Profile } from "./Profile/Profile";

const MyProfile = () => {
  const [paidAccount, setPaidAccount] = useState(true);
  const [showSubscribersModal, setShowSubscribersModal] = useState(false);
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper}>
          <Navigation pathname={pathname} paidAccount={paidAccount} />
          <Profile
            setShowSubscriptionsModal={setShowSubscriptionsModal}
            setShowSubscribersModal={setShowSubscribersModal}
            paidAccount={paidAccount}
          />
        </div>
      </div>
      {showSubscribersModal && <SubscribersModal setShowSubscribersModal={setShowSubscribersModal} />}
      {showSubscriptionsModal && <SubscriptionsModal setShowSubscriptionsModal={setShowSubscriptionsModal} />}
    </>
  );
};

export default MyProfile;
