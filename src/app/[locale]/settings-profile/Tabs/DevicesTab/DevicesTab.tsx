import React from "react";
import s from "../Tabs.module.scss";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import { useTranslations } from "next-intl";

export const DevicesTab = () => {
  const t = useTranslations("SettingsProfilePage.DevicesTab");

  return (
    <Tabs.Content className={s.TabsContent} value="devices">
      <div className={s.devices}>
        <p className={s.devices__title}>{t("title")}</p>
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
            <p className={s.devices__content__status}>{t("status")}</p>
          </div>
        </div>
        <p className={s.devices__active}>{t("active")}</p>
        <div>
          <p className={s.devices__notLogged}>{t("text")}</p>
        </div>
      </div>
    </Tabs.Content>
  );
};
