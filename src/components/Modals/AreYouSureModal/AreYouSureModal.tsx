import React from "react";
import { TransparentBtn } from "../../TransparentBtn/TransparentBtn";
import { PrimaryBtn } from "../../PrimaryBtn/PrimaryBtn";
import { Modal } from "../Modal/Modal";
import { Loader } from "../../Loader/Loader";

import s from "./AreYouSureModal.module.scss";

type Props = {
  toggleAreYouSureModal: (value: boolean) => void;
  toggleModal: (value: boolean) => void;
  onDeletePostImage?: () => void;
  isDeleting?: boolean;
};

export const AreYouSureModal: React.FC<Props> = ({
  toggleModal,
  toggleAreYouSureModal,
  onDeletePostImage,
  isDeleting,
}) => {
  return (
    <>
      <Modal title={"Close"} onClose={() => toggleAreYouSureModal(false)}>
        <p className={s.modal__text}>
          Do you really want to close the creation of a publication? If you close everything will be deleted
        </p>
        <div className={s.modal__btns}>
          <TransparentBtn
            onClick={() => {
              onDeletePostImage?.();
              if (onDeletePostImage) {
                setTimeout(() => {
                  toggleModal(false);
                  toggleAreYouSureModal(false);
                }, 1000);
              } else {
                toggleModal(false);
                toggleAreYouSureModal(false);
              }
            }}
          >
            Yes
          </TransparentBtn>
          <PrimaryBtn onClick={() => toggleAreYouSureModal(false)}>No</PrimaryBtn>
        </div>
      </Modal>
      {isDeleting && <Loader />}
    </>
  );
};
