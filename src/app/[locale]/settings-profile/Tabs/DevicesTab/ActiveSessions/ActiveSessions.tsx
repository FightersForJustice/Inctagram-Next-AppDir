import React from "react";
import s from "./ActiveSessions.module.scss";

import Image from "next/image";
import { SessionsType } from "../DevicesTab";
import { useTranslations } from "next-intl";
import { LogoutBtn } from "@/components/Buttons/LogoutBtn";

type Props = {
  t: (value: string) => string;
  sessions: SessionsType[];
};

export const ActiveSessions: React.FC<Props> = ({ t, sessions }) => {
  const logoutTranslate = useTranslations("Navigation");

  const activeSessions = sessions.map((item, index) => {
    return (
      <div className={s.devices__wrapper} key={index}>
        <Image
          src={`${
            item.type === "PC"
              ? "/img/settings-profile/devices-tab/desktop_mac.svg"
              : "/img/settings-profile/devices-tab/phone_iphone.svg"
          }`}
          alt={"device"}
          width={36}
          height={36}
          className={s.devices__icon}
        />
        <div className={s.devices__content}>
          <p className={s.devices__content__title}>{item.deviceName}</p>
          <p className={s.devices__content__address}>IP: {item.ipAddress}</p>
          <p className={s.devices__content__visit}>
            Last visit: <span>{item.lastVisit}</span>
          </p>
        </div>
        <div className={"mt-auto mb-auto ml-auto"}>
          <LogoutBtn btnCallback={() => {}} t={logoutTranslate} />
        </div>
      </div>
    );
  });

  return (
    <>
      <p className={s.devices__active}>{t("active")}</p>
      {sessions.length > 0 ? activeSessions : <p className={s.devices__notLogged}>{t("text")}</p>}
    </>
  );
};
