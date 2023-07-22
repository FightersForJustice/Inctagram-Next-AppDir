"use client";

import React, { useState } from "react";
import s from "./MyProfile.module.scss";
import { usePathname } from "next-intl/client";
import { SubscribersModal } from "../../../components/Modals/SubscribersModal/SubscribersModal";
import { Navigation } from "./Navigation/Navigation";
import { SubscriptionsModal } from "../../../components/Modals/SubscriptionsModal/SubscriptionsModal";
import { Profile } from "./Profile/Profile";
import { useGetProfileQuery } from "../../../api/profile.api";
import { toast } from "react-toastify";
import { Loader } from "../../../components/Loader/Loader";

const MyProfile = () => {
  const [paidAccount, setPaidAccount] = useState(true);
  const [showSubscribersModal, setShowSubscribersModal] = useState(false);
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);
  const pathname = usePathname();

  const { data, isLoading, isError } = useGetProfileQuery();

  if (isError) {
    toast.error("Auth error");
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper} id={"wrapper"}>
          <Navigation
            pathname={pathname}
            paidAccount={paidAccount}
            userName={data?.userName!}
            userAvatar={data?.avatars[1].url!}
          />
          <Profile
            setShowSubscriptionsModal={setShowSubscriptionsModal}
            setShowSubscribersModal={setShowSubscribersModal}
            paidAccount={paidAccount}
            userData={data!}
          />
        </div>
      </div>
      {showSubscribersModal && <SubscribersModal setShowSubscribersModal={setShowSubscribersModal} />}
      {showSubscriptionsModal && <SubscriptionsModal setShowSubscriptionsModal={setShowSubscriptionsModal} />}
      {isLoading && <Loader />}
    </>
  );
};

export default MyProfile;
