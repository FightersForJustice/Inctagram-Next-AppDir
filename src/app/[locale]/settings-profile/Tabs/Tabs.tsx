import React, { ChangeEvent, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import s from "./Tabs.module.scss";
import Image from "next/image";
import { TransparentBtn } from "../../../../components/TransparentBtn/TransparentBtn";
import { Modal } from "../../../../components/Modals/Modal/Modal";
import { PrimaryBtn } from "../../../../components/PrimaryBtn/PrimaryBtn";
import { usePostProfileAvatarMutation } from "../../../../api/profile.api";
import { toast } from "react-toastify";
import { dataURLtoFile } from "../../../../utils/dataUrlToFile";
import { GeneralInformationTab } from "./GeneralInformationTab/GeneralInformationTab";
import { DevicesTab } from "./DevicesTab/DevicesTab";
import { Loader } from "../../../../components/Loader/Loader";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const DynamicCropper = dynamic(() => import("./Cropper/Cropper"), {
  ssr: false,
});

const TabsDemo = () => {
  const t = useTranslations("SettingsProfilePage");

  const [showAddAvatarModal, setShowAddAvatarModal] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [croppedAvatar, setCroppedAvatar] = useState("");
  const [loadedAvatar, setLoadedAvatar] = useState("");
  const [file, setFile] = useState<File>();

  const [saveAvatar, { isLoading }] = usePostProfileAvatarMutation();

  const onSetUserAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFile(file);
    setUserAvatar(URL.createObjectURL(file));
  };

  const onCloseModal = () => {
    setUserAvatar("");
    setShowAddAvatarModal(false);
  };

  const onSaveUserAvatar = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", dataURLtoFile(croppedAvatar), file.name);

      saveAvatar(formData)
        .unwrap()
        .then((res) => {
          setLoadedAvatar(res.avatars[0].url);
          toast.success("Avatar successfully uploaded");
        })
        .catch((err) => {
          toast.error("Error");
        });
    }

    setUserAvatar("");
    setCroppedAvatar("");
    setShowAddAvatarModal(false);
  };

  return (
    <>
      <Tabs.Root className={s.TabsRoot} defaultValue="generalInformation">
        <Tabs.List className={s.TabsList} aria-label="Manage your account">
          <Tabs.Trigger className={s.TabsTrigger} value="generalInformation">
            {t("GeneralInformationTab.titleTab")}
          </Tabs.Trigger>
          <Tabs.Trigger className={s.TabsTrigger} value="devices">
            {t("DevicesTab.titleTab")}
          </Tabs.Trigger>
          <Tabs.Trigger className={s.TabsTrigger} value="accountManagement">
            {t("AccountManagementTab.titleTab")}
          </Tabs.Trigger>
          <Tabs.Trigger className={s.TabsTrigger} value="myPayments">
            {t("MyPaymentsTab.titleTab")}
          </Tabs.Trigger>
        </Tabs.List>
        <GeneralInformationTab
          setShowAddAvatarModal={setShowAddAvatarModal}
          setLoadedAvatar={setLoadedAvatar}
          loadedAvatar={loadedAvatar}
        />
        <DevicesTab />
      </Tabs.Root>
      {showAddAvatarModal && (
        <Modal title={t("AddPhotoModal.title")} onClose={onCloseModal} width={"492px"} isOkBtn={false}>
          <div className={s.modal}>
            {userAvatar ? (
              <div className={s.modal__loadImg}>
                <DynamicCropper
                  setUserAvatar={setUserAvatar}
                  userAvatar={userAvatar}
                  setCroppedAvatar={setCroppedAvatar}
                />
              </div>
            ) : (
              <Image
                src={"/img/settings-profile/modal-img.png"}
                alt={"modal-img"}
                width={222}
                height={228}
                className={s.modal__img}
              />
            )}
            {userAvatar ? (
              <div className={s.modal__saveBtn}>
                <PrimaryBtn onClick={onSaveUserAvatar}>{t("AddPhotoModal.saveBtn")}</PrimaryBtn>
              </div>
            ) : (
              <div className={s.wrapper__loadZone}>
                <input type="file" className={s.wrapper__inputFile} onChange={onSetUserAvatar} />
                <div className={s.wrapper__overlay}>
                  <TransparentBtn>{t("AddPhotoModal.selectBtn")}</TransparentBtn>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default TabsDemo;
