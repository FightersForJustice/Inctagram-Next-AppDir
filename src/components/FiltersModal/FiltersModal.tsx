import React, { PropsWithChildren } from "react";
import Image from "next/image";

import "./FiltersModal.css";
import { useUploadPostImageMutation } from "../../api/posts.api";
import { toast } from "react-toastify";
import { Loader } from "../Loader/Loader";

export const FiltersModal: React.FC<PropsWithChildren<Props>> = ({
  onClose,
  title,
  width,
  children,
  buttonName,
  showSecondModal,
  showFourthModal,
  file,
  onPublishPost,
  onDeletePostImage,
}) => {
  const [uploadPostImage, { isLoading }] = useUploadPostImageMutation();

  const onSendPostImage = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file, file.name);

      uploadPostImage(formData)
        .unwrap()
        .then((res) => {
          localStorage.setItem("uploadId", res.images[0].uploadId);
          showFourthModal?.();
          toast.success("Post image uploaded");
        })
        .catch((err) => {
          toast.error("Error");
        });
    }
  };

  return (
    <>
      <div className={"modal"} onClick={onClose}>
        <div className={"modal__content1"} style={{ width }} onClick={(e) => e.stopPropagation()}>
          <div className={"modal__header"}>
            <Image
              src={"/img/create-post/arrow-back.svg"}
              alt={"arrow-back"}
              width={24}
              height={24}
              className={"modal__arrow"}
              onClick={() => (buttonName === "Publish" ? onDeletePostImage?.() : showSecondModal?.())}
            />
            <div className={"modal__title"}>{title}</div>
            <button
              className={"modal__next"}
              onClick={() => (buttonName === "Next" ? onSendPostImage() : onPublishPost?.())}
            >
              {buttonName}
            </button>
          </div>
          <div className={"modal__body1"}>{children}</div>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

type Props = {
  title: string;
  onClose?: () => void;
  width?: string;
  buttonName: string;
  showSecondModal?: () => void;
  showFourthModal?: () => void;
  file?: File;
  onPublishPost?: () => void;
  onDeletePostImage?: () => void;
};
