"use client";

import React from "react";
import s from "./SettingsProfile.module.scss";
import Tabs from "./Tabs/Tabs";
import { Navigation } from "../my-profile/Navigation/Navigation";
import { usePathname } from "next-intl/client";

const SettingsProfile = () => {
  const pathname = usePathname();

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Navigation pathname={pathname} paidAccount={false} />
        <Tabs />
      </div>
    </div>
  );
};

export default SettingsProfile;
