import React, { PropsWithChildren } from "react";
import Image from "next/image";

import "./FiltersModal.css";
import { useUploadPostImageMutation } from "../../api/posts.api";
import { dataURLtoFile } from "../../utils/dataUrlToFile";
import { toast } from "react-toastify";

export const FiltersModal: React.FC<PropsWithChildren<Props>> = ({
  onClose,
  title,
  width,
  children,
  buttonName,
  showSecondModal,
  showFourthModal,
  showThirdModal,
  file,
}) => {
  const [uploadPostImage] = useUploadPostImageMutation();
  const onSendPostImage = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file, file.name);

      // @ts-ignore
      uploadPostImage(formData)
        .unwrap()
        .then((res) => {
          showFourthModal?.();
          toast.success("Avatar successfully uploaded");
        })
        .catch((err) => {
          toast.error("Error");
        });
    }
  };

  return (
    <div className={"modal"} onClick={onClose}>
      <div className={"modal__content1"} style={{ width }} onClick={(e) => e.stopPropagation()}>
        <div className={"modal__header"}>
          <Image
            src={"/img/create-post/arrow-back.svg"}
            alt={"arrow-back"}
            width={24}
            height={24}
            className={"modal__arrow"}
            onClick={() => (buttonName === "Publish" ? showThirdModal?.() : showSecondModal?.())}
          />
          <div className={"modal__title"}>{title}</div>
          <button className={"modal__next"} onClick={() => (buttonName === "Next" ? onSendPostImage() : null)}>
            {buttonName}
          </button>
        </div>
        <div className={"modal__body1"}>{children}</div>
      </div>
    </div>
  );
};

type Props = {
  title: string;
  onClose?: () => void;
  width?: string;
  buttonName: string;
  showSecondModal?: () => void;
  showFourthModal?: () => void;
  showThirdModal?: () => void;
  file: File;
};
