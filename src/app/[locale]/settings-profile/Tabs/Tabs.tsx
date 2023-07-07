import React, { ChangeEvent, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import s from "./Tabs.module.scss";
import Image from "next/image";
import { TransparentBtn } from "../../../../components/TransparentBtn/TransparentBtn";
import { SettingsForm } from "../SettingsForm/SettingsForm";
import { Modal } from "../../../../components/Modal/Modal";
import { PrimaryBtn } from "../../../../components/PrimaryBtn/PrimaryBtn";

const TabsDemo = () => {
  const [showAddAvatarModal, setShowAddAvatarModal] = useState(false);
  const [userImage, setUserImage] = useState<string>("");
  const [savedUserImage, setSavedUserImage] = useState<string>("");

  const onSetUserImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setUserImage(URL.createObjectURL(file));
  };

  const onSaveUserImage = () => {
    setSavedUserImage(userImage);
    setUserImage("");
    setShowAddAvatarModal(false);
  };

  const onCloseModal = () => {
    setUserImage("");
    setShowAddAvatarModal(false);
  };

  return (
    <>
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
              {savedUserImage ? (
                <>
                  <Image
                    src={savedUserImage}
                    alt={"load-avatar"}
                    width={192}
                    height={192}
                    className={s.wrapper__image}
                  />
                  <Image
                    src={"/img/settings-profile/delete.svg"}
                    alt={"delete"}
                    width={24}
                    height={24}
                    onClick={() => setSavedUserImage("")}
                    className={s.wrapper__delete}
                  />
                </>
              ) : (
                <Image
                  src={"/img/settings-profile/load-avatar.svg"}
                  alt={"load-avatar"}
                  width={192}
                  height={192}
                  className={s.wrapper__image}
                />
              )}
              <TransparentBtn onClick={() => setShowAddAvatarModal(true)}>Add a Profile Photo</TransparentBtn>
            </div>
            <div className={s.wrapper__right}>
              <SettingsForm />
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content className={s.TabsContent} value="tab2">
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
      </Tabs.Root>
      {showAddAvatarModal && (
        <Modal title={"Add a profile photo"} onClose={onCloseModal} width={"492px"} isOkBtn={false}>
          <div className={s.modal}>
            {userImage ? (
              <Image src={userImage} alt={"load-avatar"} width={316} height={316} className={s.modal__loadImg} />
            ) : (
              <Image
                src={"/img/settings-profile/modal-img.png"}
                alt={"modal-img"}
                width={222}
                height={228}
                className={s.modal__img}
              />
            )}
            {userImage ? (
              <div className={s.modal__saveBtn}>
                <PrimaryBtn onClick={onSaveUserImage}>Save</PrimaryBtn>
              </div>
            ) : (
              <div className={s.wrapper__loadZone}>
                <input type="file" className={s.wrapper__inputFile} onChange={onSetUserImage} />
                <div className={s.wrapper__overlay}>
                  <TransparentBtn>Select from Computer</TransparentBtn>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default TabsDemo;
