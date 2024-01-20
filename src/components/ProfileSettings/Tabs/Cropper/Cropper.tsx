import Avatar from 'react-avatar-edit';

type Props = {
  setCroppedAvatar: (value: string) => void;
  userAvatar: string;
};

const Cropper = ({ setCroppedAvatar, userAvatar }: Props) => {
  return (
    <Avatar
      width={350}
      height={350}
      imageWidth={350}
      onCrop={(preview) => setCroppedAvatar(preview)}
      src={userAvatar}
    />
  );
};

export default Cropper;
