import React, { ChangeEvent, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import s from "./Tabs.module.scss";
import { useLazyGetProfileQuery, usePostProfileAvatarMutation } from "../../../../api/profile.api";
import { toast } from "react-toastify";
import { dataURLtoFile } from "../../../../utils/dataUrlToFile";
import { GeneralInformationTab } from "./GeneralInformationTab/GeneralInformationTab";
import { DevicesTab } from "./DevicesTab/DevicesTab";
import { Loader } from "../../../../components/Loader/Loader";
import { useTranslations } from "next-intl";
import { ShowAddAvatarModal } from "./ShowAddAvatarModal/ShowAddAvatarModal";

const TabsDemo = () => {
  const t = useTranslations("SettingsProfilePage");

  const [showAddAvatarModal, setShowAddAvatarModal] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [croppedAvatar, setCroppedAvatar] = useState("");
  const [loadedAvatar, setLoadedAvatar] = useState("");
  const [file, setFile] = useState<File>();

  const [saveAvatar, { isLoading }] = usePostProfileAvatarMutation();
  const [getUserProfile] = useLazyGetProfileQuery();

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
          getUserProfile();
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
        <ShowAddAvatarModal
          t={t}
          onCloseModal={onCloseModal}
          userAvatar={userAvatar}
          setUserAvatar={setUserAvatar}
          setCroppedAvatar={setCroppedAvatar}
          onSaveUserAvatar={onSaveUserAvatar}
          onSetUserAvatar={onSetUserAvatar}
        />
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default TabsDemo;
