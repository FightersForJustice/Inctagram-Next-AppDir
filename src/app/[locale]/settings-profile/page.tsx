"use client";

import React from "react";
import s from "./SettingsProfile.module.scss";
import Tabs from "./Tabs/Tabs";
import { useTranslations } from "next-intl";

const SettingsProfile = () => {
  const t = useTranslations("SignInPage");

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Tabs />
      </div>
    </div>
  );
};

export default SettingsProfile;
