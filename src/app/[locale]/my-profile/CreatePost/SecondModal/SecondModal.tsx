import React, { Dispatch, SetStateAction, useState } from "react";
import s from "../CreatePost.module.scss";
import { CroppingModal } from "../../../../../components/CroppingModal/CroppingModal";
import { AspectRatio } from "./AspectRatio/AspectRatio";
import { Range } from "./Range/Range";
import { Gallery } from "./Gallery/Gallery";
import { AreYouSureModal } from "../../../../../components/Modals/AreYouSureModal/AreYouSureModal";
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
  setLoadedImages: Dispatch<SetStateAction<ImageType[]>>;
  setCroppedPostImage: (value: string) => void;
};

const SecondModal: React.FC<Props> = ({
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
        width={"492px"}
      >
        <AspectRatio setAspectRatio={setAspectRatio} aspectRatio={aspectRatio} />
        <Range onZoomImage={onZoomImage} zoomImage={zoomValue} />
        <Gallery loadedImages={loadedImages} setLoadedImages={setLoadedImages} setPostImage={setPostImage} />

        <PostCropper
          postImage={postImage}
          aspectRatio={aspectRatio}
          zoomValue={zoomValue}
          setCroppedPostImage={setCroppedPostImage}
        />
        {/*<Image*/}
        {/*  src={`${postImage ? postImage : "/img/create-post/test-image.png"}`}*/}
        {/*  alt={"test-image"}*/}
        {/*  width={754}*/}
        {/*  height={504}*/}
        {/*  className={s.cropping__image}*/}
        {/*  style={{*/}
        {/*    aspectRatio: aspectRatio.replace(":", "/"),*/}
        {/*    transform: `scale(${+zoomValue / 10})`,*/}
        {/*  }}*/}
        {/*  onChange={(e) => console.log(e)}*/}
        {/*/>*/}
      </CroppingModal>
      {areYouSureModal && (
        <AreYouSureModal toggleAreYouSureModal={setAreYouSureModal} toggleModal={setShowCreatePostModal} />
      )}
    </div>
  );
};

export default SecondModal;
