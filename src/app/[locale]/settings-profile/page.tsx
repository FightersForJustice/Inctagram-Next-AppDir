"use client";

import React from "react";
import s from "./SettingsProfile.module.scss";
import Tabs from "./Tabs/Tabs";

const SettingsProfile = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Tabs />
      </div>
    </div>
  );
};

export default SettingsProfile;
