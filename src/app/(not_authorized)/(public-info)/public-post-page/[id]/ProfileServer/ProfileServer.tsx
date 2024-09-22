import { getPosts, getProfile } from '../actions';

import { ProfileInfo } from '../ProfileInfo/ProfileInfo';
import { Posts } from '../Posts/Posts';
import s from './ProfileServer.module.scss';

import { ApiResponsePosts } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import {
  UserFollowingDataType,
  UserProfile,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { getUserInfo } from '@/app/(authorized)/search/SearchContent/actions';
import { headers } from 'next/headers';

type Props = {
  id: number;
  myProfile: boolean;
  isPublic?: boolean;
};

const ProfileServer = async ({ id, myProfile, isPublic = false }: Props) => {
  const headersList = headers();
  const token = headersList.get('accessToken');
  const userdata: UserProfile = await getProfile(id);
  const followingData: UserFollowingDataType = await getUserInfo(
    userdata.userName
  );
  const postsData: ApiResponsePosts = await getPosts(id, 0);

  return (
    <>
      <ProfileInfo
        userData={userdata}
        postsData={postsData}
        myProfile={myProfile}
        isPublic={isPublic}
        followingData={!isPublic ? followingData : null}
        token={token}
      />
      <div className={s.posts}>
        <Posts
          id={id}
          postsData={postsData}
          userData={userdata}
          myProfile={myProfile}
          isPublic={isPublic}
        />
      </div>
    </>
  );
};

export default ProfileServer;
