import React, { useState } from "react";

import FirstModal from "./FirstModal";
import SecondModal from "./SecondModal/SecondModal";
import ThirdModal from "./ThirdModal";
import FourthModal from "./FourthModal";

type Props = {
  showCreatePostModal: boolean;
  setShowCreatePostModal: (value: boolean) => void;
};

export const CreatePost: React.FC<Props> = ({ showCreatePostModal, setShowCreatePostModal }) => {
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [postImage, setPostImage] = useState("");
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
        <FirstModal setShowCreatePostModal={setShowCreatePostModal} setPostImage={setPostImage} />
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
        />
      )}
      {fourth && (
        <FourthModal
          postImage={postImage}
          showThirdModal={showThirdModal}
          aspectRatio={aspectRatio}
          activeFilter={activeFilter}
          zoomValue={zoomValue}
        />
      )}
    </>
  );
};
