import Avatar from 'react-avatar-edit';
import s from './Cropper.module.scss';

type Props = {
  setCroppedAvatar: (value: string) => void;
  userAvatar: string;
};

const Cropper = ({ setCroppedAvatar, userAvatar }: Props) => {
  return (
    <div className={s.cropperContainer}>
      <Avatar
        width={400}
        height={400}
        imageHeight={400}
        onCrop={(preview) => setCroppedAvatar(preview)}
        src={userAvatar}
      />
    </div>
  );
};

export default Cropper;
