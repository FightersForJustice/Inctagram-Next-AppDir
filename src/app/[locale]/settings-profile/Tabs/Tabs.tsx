import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import s from "./Tabs.module.scss";
import Image from "next/image";
import { TransparentBtn } from "../../../../components/TransparentBtn/TransparentBtn";
import {SettingsForm} from '../SettingsForm/SettingsForm';

const TabsDemo = () => (
    <Tabs.Root className={s.TabsRoot} defaultValue="tab1">
        <Tabs.List className={s.TabsList} aria-label="Manage your account">
            <Tabs.Trigger className={s.TabsTrigger} value="tab1">
                General information
            </Tabs.Trigger>
            <Tabs.Trigger className={s.TabsTrigger} value="tab2">
                Devices
            </Tabs.Trigger>
            <Tabs.Trigger className={s.TabsTrigger} value="tab3">
                Account Management
            </Tabs.Trigger>
            <Tabs.Trigger className={s.TabsTrigger} value="tab4">
                My payments
            </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className={s.TabsContent} value="tab1">
            <div className={s.wrapper}>
                <div className={s.wrapper__left}>
                    <Image src={"/img/settings-profile/load-avatar.svg"} alt={"load-avatar"} width={192} height={192} className={s.wrapper__image}/>
                    <div className={s.wrapper__loadZone}>
                        <input type="file" className={s.wrapper__inputFile}/>
                        <div className={s.wrapper__overlay}>
                            <TransparentBtn >Add a Profile Photo</TransparentBtn>
                        </div>
                    </div>
                </div>
                <div className={s.wrapper__right}>
                    <SettingsForm />
                </div>
            </div>
        </Tabs.Content>
        <Tabs.Content className={s.TabsContent} value="tab2">
            <p className="Text">Change your password here. After saving, youll be logged out.</p>
            <fieldset className="Fieldset">
                <label className="Label" htmlFor="currentPassword">
                    Current password
                </label>
                <input className="Input" id="currentPassword" type="password" />
            </fieldset>
            <fieldset className="Fieldset">
                <label className="Label" htmlFor="newPassword">
                    New password
                </label>
                <input className="Input" id="newPassword" type="password" />
            </fieldset>
            <fieldset className="Fieldset">
                <label className="Label" htmlFor="confirmPassword">
                    Confirm password
                </label>
                <input className="Input" id="confirmPassword" type="password" />
            </fieldset>
            <div style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}>
                <button className="Button green">Change password</button>
            </div>
        </Tabs.Content>
    </Tabs.Root>
);

export default TabsDemo;
