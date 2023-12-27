import Image from 'next/image';
import { GetResponse } from '@/api/profile.api';
import s from './MyProfile.module.scss';
import { UserProfile } from './types';
import { accessToken } from '@/accessToken';

type Props = {
  userData: UserProfile;
};
export const Profile = ({ userData }: Props) => {
  console.log(accessToken + 'kjj');
  return (
    <>
      <div className={s.profile}>
        <div className={s.profile__avatar__container}>
          {/*<Image
            src={`${
              userData?.avatars[0]
                ? userData.avatars[0].url
                : '/img/create-post/no-image.png'
            }`}
            alt={'avatar'}
            width={204}
            height={204}
            className={s.profile__avatar}
          />*/}
        </div>
        {/* ProfileWrapper */}
      </div>
      <div className={s.profile__posts}>{/* InfiniteScrollMyPosts */}</div>
    </>
  );
};
