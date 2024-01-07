import Avatar from 'react-avatar-edit';

type Props = {
  setCroppedAvatar: (value: string) => void;
  userAvatar: string;
};

const Cropper = ({ setCroppedAvatar, userAvatar }: Props) => {
  return (
    <Avatar
      width={300}
      height={300}
      imageWidth={330}
      onCrop={(preview) => setCroppedAvatar(preview)}
      src={userAvatar}
    />
  );
};

export default Cropper;
