import React, { MutableRefObject, PropsWithChildren, useRef } from "react";

import "./FiltersModal.css";
import { useUploadPostImageMutation } from "@/api";
import { Loader } from "../../Loader/Loader";
import { toast } from "react-toastify";
import { applyImageFilter } from "@/utils";
import { dataURLToBlob } from "blob-util";
import { useAppDispatch } from "@/redux/hooks/useDispatch";
import { postActions } from "@/redux/reducers/post/postReducer";
import { useAppSelector } from "@/redux/hooks/useSelect";
import { postImages } from "@/redux/reducers/post/postSelectors";
import { AspectRatioType } from "@/app/[locale]/my-profile/CreatePost/CreatePost";

export const FiltersModal: React.FC<PropsWithChildren<Props>> = ({
  onClose,
  title,
  width,
  children,
  buttonName,
  showSecondModal,
  showFourthModal,
  onPublishPost,
  onDeletePostImage,
  aspectRatio,
  activeFilter,
  zoomValue,
}) => {
  const [uploadPostImage, { isLoading }] = useUploadPostImageMutation();
  const dispatch = useAppDispatch();
  const images = useAppSelector(postImages);
  const onSendPostImage = () => {
    if (images) {
      images.map((file) => {
        let reff = document.createElement("img");
        reff.src = file.image;
        reff.alt = "err";
        reff.style.filter = activeFilter ?? "";
        reff.width = 490;
        reff.height = 503;

        const photoEditingBeforeSending = applyImageFilter(reff, activeFilter!, `${aspectRatio!}`, zoomValue!);
        const formData = new FormData();
        formData.append("file", dataURLToBlob(photoEditingBeforeSending), file.id);
        uploadPostImage(formData)
          .unwrap()
          .then((res) => {
            dispatch(postActions.addImageId(res.images[0]));
            showFourthModal?.();
            toast.success("Post image uploaded");
          })
          .catch((err) => {
            toast.error("Error");
          });
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
  file?: File[];
  onPublishPost?: () => void;
  onDeletePostImage?: () => void;
  changedPostImage?: MutableRefObject<any>;
  activeFilter?: string;
  aspectRatio?: AspectRatioType;
  zoomValue?: string;
};
