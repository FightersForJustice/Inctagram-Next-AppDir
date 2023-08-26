import React, { ChangeEvent } from "react";
import s from "../Tabs.module.scss";
import Image from "next/image";
import { PrimaryBtn } from "@/components/PrimaryBtn";
import { TransparentBtn } from "@/components/TransparentBtn";
import { Modal } from "@/components/Modals/Modal";
import dynamic from "next/dynamic";

type Props = {
  t: (value: string) => string;
  onCloseModal: () => void;
  userAvatar: string;
  setUserAvatar: (value: string) => void;
  setCroppedAvatar: (value: string) => void;
  onSaveUserAvatar: () => void;
  onSetUserAvatar: (e: ChangeEvent<HTMLInputElement>) => void;
};

const DynamicCropper = dynamic(() => import("../Cropper/Cropper"), {
  ssr: false,
});

export const ShowAddAvatarModal: React.FC<Props> = ({
  setCroppedAvatar,
  userAvatar,
  setUserAvatar,
  onSaveUserAvatar,
  onSetUserAvatar,
  onCloseModal,
  t,
}) => {
  return (
    <Modal title={t("AddPhotoModal.title")} onClose={onCloseModal} width={"492px"} isOkBtn={false}>
      <div className={s.modal}>
        {userAvatar ? (
          <div className={s.modal__loadImg}>
            <DynamicCropper setUserAvatar={setUserAvatar} userAvatar={userAvatar} setCroppedAvatar={setCroppedAvatar} />
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
  );
};
