import React, { useState } from "react";
import s from "../CreatePost.module.scss";
import Image from "next/image";
import { CroppingModal } from "../../../../../components/CroppingModal/CroppingModal";
import { AspectRatio } from "./AspectRatio/AspectRatio";
import { Range } from "./Range/Range";
import { Gallery } from "./Gallery/Gallery";
import { AreYouSureModal } from "../../../../../components/Modals/AreYouSureModal/AreYouSureModal";

type Props = {
  postImage: string;
  setPostImage: (value: string) => void;
  showThirdModal: () => void;
  setAspectRatio: (value: "" | "1:1" | "4:5" | "16:9") => void;
  aspectRatio: "" | "1:1" | "4:5" | "16:9";
  setZoomValue: (value: string) => void;
  zoomValue: string;
  setShowCreatePostModal: (value: boolean) => void;
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
}) => {
  const [areYouSureModal, setAreYouSureModal] = useState(false);

  const onZoomImage = (value: string) => {
    setZoomValue(value);
  };

  return (
    <>
      <CroppingModal
        title={"Cropping"}
        setPostImage={setPostImage}
        showThirdModal={showThirdModal}
        onClose={() => setAreYouSureModal(true)}
      >
        <div className={s.cropping}>
          <Image
            src={`${postImage ? postImage : "/img/create-post/test-image.png"}`}
            alt={"test-image"}
            width={754}
            height={504}
            className={s.cropping__image}
            style={{
              aspectRatio: aspectRatio.replace(":", "/"),
              transform: `scale(${+zoomValue / 10})`,
            }}
          />
          <AspectRatio setAspectRatio={setAspectRatio} aspectRatio={aspectRatio} />
          <Range onZoomImage={onZoomImage} zoomImage={zoomValue} />
          <Gallery />
        </div>
      </CroppingModal>
      {areYouSureModal && (
        <AreYouSureModal toggleAreYouSureModal={setAreYouSureModal} toggleModal={setShowCreatePostModal} />
      )}
    </>
  );
};

export default SecondModal;
