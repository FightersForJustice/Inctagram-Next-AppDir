import Avatar from 'react-avatar-edit';

type Props = {
  setCroppedAvatar: (value: string) => void;
  setUserAvatar: (value: string) => void;
  userAvatar: string;
};

const Cropper = ({ setCroppedAvatar, userAvatar, setUserAvatar }: Props) => {
  return (
    <Avatar
      width={350}
      height={350}
      onCrop={(preview) => setCroppedAvatar(preview)}
      onClose={() => setUserAvatar('')}
      src={userAvatar}
    />
  );
};

export default Cropper;
