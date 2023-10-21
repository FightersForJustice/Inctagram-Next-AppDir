import React, { useState } from "react";
import s from "../CreatePost.module.scss";
import { CroppingModal } from "@/components/Modals/CroppingModal";
import { AspectRatio } from "./AspectRatio";
import { Range } from "./Range/Range";
import { Gallery } from "./Gallery";
import { AreYouSureModal } from "@/components/Modals/AreYouSureModal";
import { AspectRatioType, ImageStateType } from "../CreatePost";
import { PostCropper } from "../PostCropper/PostCropper";
import { useAppSelector } from "@/redux/hooks/useSelect";
import { imagesGallery } from "@/redux/reducers/post/postSelectors";

type Props = {
  postImage: ImageStateType;
  setPostImage: (value: string) => void;
  showThirdModal: () => void;
  aspectRatio: AspectRatioType;
  setZoomValue: (value: string) => void;
  zoomValue: string;
  setShowCreatePostModal: (value: boolean) => void;
  loadedImages: ImageStateType[];
  setLoadedImages: (value: any) => void;
  setCroppedPostImage: (value: string) => void;
  croppedPostImage: string;
};

export const SecondModal: React.FC<Props> = ({
  postImage,
  setPostImage,
  showThirdModal,
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
  const imagesGalleryImages = useAppSelector(imagesGallery);
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
        loadedImages={loadedImages}
      >
        <AspectRatio />
        <Range onZoomImage={onZoomImage} zoomImage={zoomValue} />
        <Gallery
          loadedImages={imagesGalleryImages}
          setLoadedImages={setLoadedImages}
          setPostImage={setPostImage}
          currentImage={postImage}
          croppedPostImage={croppedPostImage}
        />

        <PostCropper
          postImage={postImage}
          aspectRatio={aspectRatio}
          zoomValue={zoomValue}
          setCroppedPostImage={setCroppedPostImage}
          loadedImages={imagesGalleryImages}
          setLoadedImages={setLoadedImages}
        />
      </CroppingModal>
      {areYouSureModal && (
        <AreYouSureModal toggleAreYouSureModal={setAreYouSureModal} toggleModal={setShowCreatePostModal} />
      )}
    </div>
  );
};
