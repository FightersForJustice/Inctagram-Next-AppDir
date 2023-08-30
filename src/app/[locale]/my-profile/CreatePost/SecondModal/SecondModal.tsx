import React, { Dispatch, SetStateAction, useState } from "react";
import s from "../CreatePost.module.scss";
import { CroppingModal } from "@/components/Modals/CroppingModal";
import { AspectRatio } from "./AspectRatio";
import { Range } from "./Range/Range";
import { Gallery } from "./Gallery";
import { AreYouSureModal } from "@/components/Modals/AreYouSureModal";
import { AspectRatioType, ImageType } from "../CreatePost";
import { PostCropper } from "../PostCropper/PostCropper";

type Props = {
  postImage: string;
  setPostImage: (value: string) => void;
  showThirdModal: () => void;
  setAspectRatio: (value: AspectRatioType) => void;
  aspectRatio: AspectRatioType;
  setZoomValue: (value: string) => void;
  zoomValue: string;
  setShowCreatePostModal: (value: boolean) => void;
  loadedImages: ImageType[];
  setLoadedImages: (value: any) => void;
  setCroppedPostImage: (value: string) => void;
  croppedPostImage: string;
};

export const SecondModal: React.FC<Props> = ({
  postImage,
  setPostImage,
  showThirdModal,
  setAspectRatio,
  aspectRatio,
  setZoomValue,
  zoomValue,
  setShowCreatePostModal,
  loadedImages,
  setLoadedImages,
  setCroppedPostImage,
  croppedPostImage,
}) => {
  const [areYouSureModal, setAreYouSureModal] = useState(false);

  const onZoomImage = (value: string) => {
    setZoomValue(value);
  };

  return (
    <div className={s.cropping__wrapper}>
      <CroppingModal
        title={"Cropping"}
        setPostImage={setPostImage}
        showThirdModal={showThirdModal}
        onClose={() => setAreYouSureModal(true)}
        croppedPostImage={croppedPostImage}
        width={"492px"}
      >
        <AspectRatio setAspectRatio={setAspectRatio} aspectRatio={aspectRatio} />
        <Range onZoomImage={onZoomImage} zoomImage={zoomValue} />
        <Gallery loadedImages={loadedImages} setLoadedImages={setLoadedImages} setPostImage={setPostImage} />

        <PostCropper
          postImage={postImage}
          //@ts-ignore
          aspectRatio={aspectRatio}
          zoomValue={zoomValue}
          setCroppedPostImage={setCroppedPostImage}
          loadedImages={loadedImages}
          setLoadedImages={setLoadedImages}
        />
      </CroppingModal>
      {areYouSureModal && (
        <AreYouSureModal toggleAreYouSureModal={setAreYouSureModal} toggleModal={setShowCreatePostModal} />
      )}
    </div>
  );
};
