import React, { ChangeEvent, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import s from "./Tabs.module.scss";
import { useLazyGetProfileQuery, usePostProfileAvatarMutation } from "@/api/profile.api";
import { toast } from "react-toastify";
import { dataURLtoFile } from "@/utils/dataUrlToFile";
import { GeneralInformationTab } from "./GeneralInformationTab/GeneralInformationTab";
import { DevicesTab } from "./DevicesTab/DevicesTab";
import { Loader } from "@/components/Loader/Loader";
import { useTranslations } from "next-intl";
import { ShowAddAvatarModal } from "./ShowAddAvatarModal/ShowAddAvatarModal";
import { AccountManagementTab } from "./AccountManagementTab/AccountManagementTab";
import { MyPayments } from "@/app/[locale]/settings-profile/Tabs/MyPayments";
import { useAppSelector } from "@/redux/hooks/useSelect";

const TabsDemo = () => {
  const t = useTranslations("SettingsProfilePage");
  const userID = useAppSelector((state) => state.app.userID);

  const [showAddAvatarModal, setShowAddAvatarModal] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [croppedAvatar, setCroppedAvatar] = useState("");
  const [loadedAvatar, setLoadedAvatar] = useState("");
  const [file, setFile] = useState<File>();
  const [fileError, setFileError] = useState("");

  const [saveAvatar, { isLoading }] = usePostProfileAvatarMutation();
  const [getUserProfile] = useLazyGetProfileQuery();

  const onSetUserAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    // Check for 10mb size of photo
    const maxSize = 10 * 1024 * 1024;
    if (file.size <= maxSize) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        setFile(file);
        setUserAvatar(URL.createObjectURL(file));
      } else {
        setFileError("Only .JPEG and .PNG format");
      }
    } else {
      setFileError("Max size of photo 10 Mb");
    }
  };

  const onCloseModal = () => {
    setUserAvatar("");
    setShowAddAvatarModal(false);
    setFileError("");
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
          toast.error(err.error);
        });
    }
    setUserAvatar("");
    setCroppedAvatar("");
    setShowAddAvatarModal(false);
  };

  return (
    <div style={{ gridArea: "profile", width: "100%" }}>
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
        <AccountManagementTab />
        <MyPayments />
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
          fileError={fileError}
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default TabsDemo;
