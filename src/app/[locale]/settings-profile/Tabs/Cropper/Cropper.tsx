import React from 'react';
import Avatar from 'react-avatar-edit';

type Props = {
  setCroppedAvatar: (value: string) => void;
  setUserAvatar: (value: string) => void;
  userAvatar: string;
};

const Cropper: React.FC<Props> = ({
  setCroppedAvatar,
  userAvatar,
  setUserAvatar,
}) => {
  return (
    <Avatar
      width={300}
      height={300}
      onCrop={(preview) => setCroppedAvatar(preview)}
      onClose={() => setUserAvatar('')}
      src={userAvatar}
    />
  );
};

export default Cropper;
