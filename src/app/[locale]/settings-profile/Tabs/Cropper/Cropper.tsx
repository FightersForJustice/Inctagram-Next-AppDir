import React from "react";
import Avatar from "react-avatar-edit";

type Props = {
  setCroppedAvatar: (value: string) => void;
  setUserAvatar: (value: string) => void;
  userAvatar: string;
};

const Cropper: React.FC<Props> = ({ setCroppedAvatar, userAvatar, setUserAvatar }) => {
  return (
    <Avatar
      width={316}
      height={316}
      onCrop={(preview) => setCroppedAvatar(preview)}
      onClose={() => setUserAvatar("")}
      /*onBeforeFileLoad={this.onBeforeFileLoad}*/
      imageWidth={400}
      imageHeight={400}
      src={userAvatar}
    />
  );
};

export default Cropper;
