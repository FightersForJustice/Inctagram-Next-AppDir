import React from "react";
import s from "../Tabs.module.scss";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";

export const DevicesTab = () => {
  return (
    <Tabs.Content className={s.TabsContent} value="devices">
      <div className={s.devices}>
        <p className={s.devices__title}>This devices</p>
        <div className={s.devices__wrapper}>
          <Image
            src={"/img/settings-profile/chrome.svg"}
            alt={"chrome"}
            width={36}
            height={36}
            className={s.devices__icon}
          />
          <div className={s.devices__content}>
            <p className={s.devices__content__title}>Chrome</p>
            <p className={s.devices__content__address}>IP: 22.345.345.12</p>
            <p className={s.devices__content__status}>Online</p>
          </div>
        </div>
        <p className={s.devices__active}>Active sessions</p>
        <div>
          <p className={s.devices__notLogged}>You have not yet logged in from other devices</p>
        </div>
      </div>
    </Tabs.Content>
  );
};
