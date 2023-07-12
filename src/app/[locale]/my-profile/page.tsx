"use client";

import React, { useState } from "react";

import s from "./MyProfile.module.scss";
import { usePathname } from "next-intl/client";
import { SubscribersModal } from "./SubscribersModal/SubscribersModal";
import { Navigation } from "./Navigation/Navigation";
import { SubscriptionsModal } from "./SubscriptionsModal/SubscriptionsModal";
import { Profile } from "./Profile/Profile";
import { Loader } from "../../../components/Loader/Loader";
import { useRouter } from "next/navigation";
import { usePostLogoutMutation } from "../../../api/auth.api";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [paidAccount, setPaidAccount] = useState(true);
  const [showSubscribersModal, setShowSubscribersModal] = useState(false);
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [logout, { isLoading }] = usePostLogoutMutation();

  const onLogout = () => {
    setShowLogoutModal(false);
    logout()
      .unwrap()
      .then(() => {
        router.push("/sign-in");
        toast.success("Logout success");
      })
      .catch(() => {
        toast.error("Logout fail");
      });
  };

  //временное решение пока не решен вопрос с authMe запросом:
  //Вызывает ошибку при build!!!!!!   if (!sessionStorage.getItem("accessToken")) redirect("/sign-in");

  if (isLoading) {
    return (
      <div className={"flex justify-center items-center h-[30vh]"}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper}>
          <Navigation
            pathname={pathname}
            paidAccount={paidAccount}
            setShowLogoutModal={setShowLogoutModal}
            onLogout={onLogout}
            showLogoutModal={showLogoutModal}
          />
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
