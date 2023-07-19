import React, { useState } from "react";

import FirstModal from "./FirstModal";
import SecondModal from "./SecondModal/SecondModal";
import ThirdModal from "./ThirdModal";
import FourthModal from "./FourthModal";

type Props = {
  showCreatePostModal: boolean;
  setShowCreatePostModal: (value: boolean) => void;
};

export type ImageType = {
  id: string;
  image: string;
};

export const CreatePost: React.FC<Props> = ({ showCreatePostModal, setShowCreatePostModal }) => {
  const [file, setFile] = useState<File>();
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [loadedImages, setLoadedImages] = useState<ImageType[]>([]);
  const [aspectRatio, setAspectRatio] = useState<"" | "1:1" | "4:5" | "16:9">("");
  const [activeFilter, setActiveFilter] = useState("");
  const [zoomValue, setZoomValue] = useState("10");

  const showSecondModal = () => {
    setThird(false);
    setFourth(false);
  };

  const showThirdModal = () => {
    setThird(true);
    setFourth(false);
  };

  const showFourthModal = () => {
    setThird(false);
    setFourth(true);
  };

  return (
    <>
      {showCreatePostModal && !postImage && (
        <FirstModal
          setFile={setFile}
          setPostImage={setPostImage}
          setShowCreatePostModal={setShowCreatePostModal}
          setLoadedImages={setLoadedImages}
          loadedImages={loadedImages}
        />
      )}
      {postImage && (
        <SecondModal
          postImage={postImage}
          setPostImage={setPostImage}
          showThirdModal={showThirdModal}
          setAspectRatio={setAspectRatio}
          aspectRatio={aspectRatio}
          setZoomValue={setZoomValue}
          zoomValue={zoomValue}
          setShowCreatePostModal={setShowCreatePostModal}
          loadedImages={loadedImages}
          setLoadedImages={setLoadedImages}
        />
      )}
      {third && (
        <ThirdModal
          postImage={postImage}
          showSecondModal={showSecondModal}
          showFourthModal={showFourthModal}
          aspectRatio={aspectRatio}
          setActiveFilter={setActiveFilter}
          activeFilter={activeFilter}
          zoomValue={zoomValue}
          file={file!}
          setShowCreatePostModal={setShowCreatePostModal}
        />
      )}
      {fourth && (
        <FourthModal
          postImage={postImage}
          showThirdModal={showThirdModal}
          aspectRatio={aspectRatio}
          activeFilter={activeFilter}
          zoomValue={zoomValue}
          setShowCreatePostModal={setShowCreatePostModal}
        />
      )}
    </>
  );
};
