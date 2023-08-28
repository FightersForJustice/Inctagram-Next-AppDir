import React from "react";
import s from "../Tabs.module.scss";
import * as Tabs from "@radix-ui/react-tabs";
import { useTranslations } from "next-intl";

import { TransparentBtn } from "src/components/Buttons/TransparentBtn";
import { ThisDevice } from "./ThisDevice";
import { ActiveSessions } from "./ActiveSessions";

export const DevicesTab = () => {
  const t = useTranslations("SettingsProfilePage.DevicesTab");

  const sessions: SessionsType[] = [
    { deviceName: "Apple iMac 27", ipAddress: "192.168.1.10", lastVisit: "22.09.2022", type: "PC" },
    { deviceName: "Samsung", ipAddress: "192.168.1.20", lastVisit: "22.09.2022", type: "mobile" },
  ];

  return (
    <Tabs.Content className={s.TabsContent} value="devices">
      <div className={s.devices}>
        <ThisDevice t={t} />

        <div className={"text-right"}>
          <TransparentBtn>Terminate all other session</TransparentBtn>
        </div>

        <ActiveSessions t={t} sessions={sessions} />
      </div>
    </Tabs.Content>
  );
};

export type SessionsType = {
  deviceName: string;
  ipAddress: string;
  lastVisit: string;
  type: "PC" | "mobile";
};
