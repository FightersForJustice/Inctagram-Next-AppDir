import React from "react";
import Image from "next/image";

import s from "./ThisDeviceTab.module.scss";

type Props = {
  t: (value: string) => string;
};

export const ThisDevice: React.FC<Props> = ({ t }) => {
  return (
    <>
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
    </>
  );
};
