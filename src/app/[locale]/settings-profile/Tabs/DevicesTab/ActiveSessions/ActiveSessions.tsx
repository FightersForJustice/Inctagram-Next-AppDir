import React from "react";
import s from "./ActiveSessions.module.scss";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { LogoutBtn } from "@/components/Buttons/LogoutBtn";
import { DevicesResponse, useDeleteSessionsDeviceMutation } from "@/api/profile.api";
import { dateToFormat } from "@/utils/dateToFormat";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  t: (value: string) => string;
  sessions: DevicesResponse[];
  refetch: any;
  logout: () => void;
};

export const ActiveSessions: React.FC<Props> = ({ t, sessions, refetch, logout }) => {
  const logoutTranslate = useTranslations("Navigation");
  const [deleteSession, { isSuccess }] = useDeleteSessionsDeviceMutation();
  const router = useRouter();

  const logoutSession = async (item: DevicesResponse) => {
    await deleteSession(item.deviceId.toString());
    try {
      refetch();
      console.log(sessions);
      if (sessions.length <= 1) {
        logout();
        sessionStorage.clear();
        toast.success("All sessions was deleted");
        router.push("/sign-in");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const activeSessions = sessions.map((item, index) => {
    return (
      <div className={s.devices__wrapper} key={index}>
        <Image
          src={`${
            item.osName === "Mac OS"
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
          <p className={s.devices__content__address}>IP: {item.ip}</p>
          <p className={s.devices__content__visit}>
            Last visit: <span>{dateToFormat(item.lastActive)}</span>
          </p>
        </div>
        <div className={"mt-auto mb-auto ml-auto"}>
          <LogoutBtn btnCallback={() => logoutSession(item)} t={logoutTranslate} />
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
