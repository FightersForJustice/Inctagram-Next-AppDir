import Image from 'next/image';
import s from './MyProfile.module.scss';
import { ApiResponsePosts, UserProfile } from './types';
import { ProfileWrapper } from './ProfileWrapper';
import { Posts } from './Posts';
import { LoadMore } from './load-more';
import { findMinId } from '@/utils/findMinId';

type Props = {
  userData: UserProfile;
  postsData: ApiResponsePosts;
};
export const Profile = ({ userData, postsData }: Props) => {
  let minId = findMinId(postsData);

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
        <ProfileWrapper data={userData} postsData={postsData} />
      </div>
      <div className={s.profile__posts}>
        <Posts postsData={postsData} />
        <LoadMore id={userData.id} minIdProps={minId} />
      </div>
    </>
  );
};
