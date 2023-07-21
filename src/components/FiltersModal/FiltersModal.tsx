import React, { MutableRefObject, PropsWithChildren } from "react";

import "./FiltersModal.css";
import { useUploadPostImageMutation } from "../../api/posts.api";
import { Loader } from "../Loader/Loader";
import { toast } from "react-toastify";
import { applyImageFilter } from "../../utils/applyImageFilter";
import { dataURLToBlob } from "blob-util";

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
  changedPostImage,
  aspectRatio,
  activeFilter,
  zoomValue,
}) => {
  const [uploadPostImage, { isLoading }] = useUploadPostImageMutation();

  const onSendPostImage = () => {
    const photoEditingBeforeSending = applyImageFilter(
      changedPostImage?.current,
      activeFilter!,
      aspectRatio!,
      zoomValue!,
    );

    if (file) {
      const formData = new FormData();
      formData.append("file", dataURLToBlob(photoEditingBeforeSending), file.name);

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
            <img
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
  changedPostImage?: MutableRefObject<any>;
  activeFilter?: string;
  aspectRatio?: string;
  zoomValue?: string;
};
