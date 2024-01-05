import Image from 'next/image';

import s from './AvatarProfile.module.scss';

export const AvatarProfile = ({ avatar }: { avatar: string | undefined }) => {
  return (
    <div className={s.profileAvatarContainer}>
      <Image
        src={`${avatar ? avatar : '/img/create-post/no-image.png'}`}
        alt={'avatar'}
        width={204}
        height={204}
        className={s.profileAvatar}
      />
    </div>
  );
};
