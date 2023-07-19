import React from "react";
import s from "./AreYouSureModal.module.scss";
import { TransparentBtn } from "../../TransparentBtn/TransparentBtn";
import { PrimaryBtn } from "../../PrimaryBtn/PrimaryBtn";
import { Modal } from "../Modal/Modal";

type Props = {
  toggleAreYouSureModal: (value: boolean) => void;
  toggleModal: (value: boolean) => void;
};

export const AreYouSureModal: React.FC<Props> = ({ toggleModal, toggleAreYouSureModal }) => {
  return (
    <Modal title={"Close"} onClose={() => toggleAreYouSureModal(false)}>
      <p className={s.modal__text}>
        Do you really want to close the creation of a publication? If you close everything will be deleted
      </p>
      <div className={s.modal__btns}>
        <TransparentBtn
          onClick={() => {
            toggleModal(false);
            toggleAreYouSureModal(false);
          }}
        >
          Yes
        </TransparentBtn>
        <PrimaryBtn onClick={() => toggleAreYouSureModal(false)}>No</PrimaryBtn>
      </div>
    </Modal>
  );
};
