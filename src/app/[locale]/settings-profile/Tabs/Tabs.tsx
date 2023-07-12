import React, { ChangeEvent, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import s from "./Tabs.module.scss";
import Image from "next/image";
import { TransparentBtn } from "../../../../components/TransparentBtn/TransparentBtn";
import { Modal } from "../../../../components/Modal/Modal";
import { PrimaryBtn } from "../../../../components/PrimaryBtn/PrimaryBtn";
import { usePostProfileAvatarMutation } from "../../../../api/profile.api";
import { toast } from "react-toastify";
import Avatar from "react-avatar-edit";
import { dataURLtoFile } from "../../../../utils/dataUrlToFile";
import { GeneralInformationTab } from "./GeneralInformationTab/GeneralInformationTab";
import { DevicesTab } from "./DevicesTab/DevicesTab";

const TabsDemo = () => {
  const [showAddAvatarModal, setShowAddAvatarModal] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [croppedAvatar, setCroppedAvatar] = useState("");
  const [loadedAvatar, setLoadedAvatar] = useState("");
  const [file, setFile] = useState<File>();

  const [saveAvatar] = usePostProfileAvatarMutation();

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
            General information
          </Tabs.Trigger>
          <Tabs.Trigger className={s.TabsTrigger} value="devices">
            Devices
          </Tabs.Trigger>
          <Tabs.Trigger className={s.TabsTrigger} value="accountManagement">
            Account Management
          </Tabs.Trigger>
          <Tabs.Trigger className={s.TabsTrigger} value="myPayments">
            My payments
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
        <Modal title={"Add a profile photo"} onClose={onCloseModal} width={"492px"} isOkBtn={false}>
          <div className={s.modal}>
            {userAvatar ? (
              <div className={s.modal__loadImg}>
                <Avatar
                  width={316}
                  height={316}
                  onCrop={(preview) => setCroppedAvatar(preview)}
                  onClose={() => setUserAvatar("")}
                  /*onBeforeFileLoad={this.onBeforeFileLoad}*/
                  imageWidth={400}
                  imageHeight={400}
                  src={userAvatar}
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
                <PrimaryBtn onClick={onSaveUserAvatar}>Save</PrimaryBtn>
              </div>
            ) : (
              <div className={s.wrapper__loadZone}>
                <input type="file" className={s.wrapper__inputFile} onChange={onSetUserAvatar} />
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
