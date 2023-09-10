import React from "react";
import { TransparentBtn } from "@/components/Buttons/TransparentBtn/TransparentBtn";
import { PrimaryBtn } from "@/components/Buttons/PrimaryBtn/PrimaryBtn";
import { Modal } from "../Modal/Modal";
import { Loader } from "../../Loader/Loader";

import s from "./AreYouSureModal.module.scss";
import { useAppDispatch } from "@/redux/hooks/useDispatch";
import { postActions } from "@/redux/reducers/post/postReducer";

type Props = {
  toggleAreYouSureModal: (value: boolean) => void;
  toggleModal: (value: boolean) => void;
  onDelete?: () => void;
  isDeleting?: boolean;
};

export const AreYouSureModal: React.FC<Props> = ({ toggleModal, toggleAreYouSureModal, onDelete, isDeleting }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Modal title={"Close"} onClose={() => toggleAreYouSureModal(false)}>
        <p className={s.modal__text}>
          Do you really want to close the creation of a publication? If you close everything will be deleted
        </p>
        <div className={s.modal__btns}>
          <TransparentBtn
            onClick={() => {
              dispatch(postActions.removeAllImages());
              dispatch(postActions.removeAllGalleryImages());
              onDelete?.();
              if (onDelete) {
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
