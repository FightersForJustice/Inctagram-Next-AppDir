import Image from 'next/image';
import s from './MyProfile.module.scss';
import { UserProfile } from './types';
import { ProfileWrapper } from './ProfileWrapper';

type Props = {
  userData: UserProfile;
};
export const Profile = ({ userData }: Props) => {
  return (
    <>
      <div className={s.profile}>
        <div className={s.profile__avatar__container}>
          <Image
            src={`${
              userData?.avatars[0]
                ? userData.avatars[0].url
                : '/img/create-post/no-image.png'
            }`}
            alt={'avatar'}
            width={204}
            height={204}
            className={s.profile__avatar}
          />
        </div>
        <ProfileWrapper data={userData} />
      </div>
      <div className={s.profile__posts}>{/* InfiniteScrollMyPosts */}</div>
    </>
  );
};
