import React, { PropsWithChildren } from "react";
import Image from "next/image";
import "./CroppingModal.css";
import { toast } from "react-toastify";
import { ImageType } from "@/app/[locale]/my-profile/CreatePost/CreatePost";
import { useAppDispatch } from "@/redux/hooks/useDispatch";
import { postActions } from "@/redux/reducers/post/postReducer";

type Props = {
  title: string;
  onClose?: () => void;
  width?: string;
  setPostImage: (value: string) => void;
  showThirdModal: () => void;
  croppedPostImage: string;
  loadedImages: ImageType[];
};

export const CroppingModal: React.FC<PropsWithChildren<Props>> = ({
  onClose,
  title,
  children,
  width,
  setPostImage,
  showThirdModal,
  croppedPostImage,
  loadedImages,
}) => {
  const dispatch = useAppDispatch();
  const onNextBtnHandler = () => {
    // loadedImages.map((i) => {
    //   dispatch(postActions.addImage(i));
    // });
    if (!croppedPostImage) {
      toast.error("Сrop image before sending");
    } else {
      showThirdModal();
    }
  };

  return (
    <div className={"modal"} onClick={onClose}>
      <div className={"modal__content"} style={{ width }} onClick={(e) => e.stopPropagation()}>
        <div className={"modal__header"}>
          <Image
            src={"/img/create-post/arrow-back.svg"}
            alt={"arrow-back"}
            width={24}
            height={24}
            className={"modal__arrow"}
            onClick={() => setPostImage("")}
          />
          <div className={"modal__title"}>{title}</div>
          <button className={"modal__next"} onClick={onNextBtnHandler}>
            Next
          </button>
        </div>
        <div className={"modal__body2"}>{children}</div>
      </div>
    </div>
  );
};
