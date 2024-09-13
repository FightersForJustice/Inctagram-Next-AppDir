import { getPosts, getProfile } from '../actions';

import { ProfileInfo } from '../ProfileInfo/ProfileInfo';
import { Posts } from '../Posts/Posts';
import s from './ProfileServer.module.scss';

import { ApiResponsePosts } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import { getPublicProfile } from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import {
  UserFollowingDataType,
  UserProfile,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { getUserInfo } from '@/app/(authorized)/search/SearchContent/actions';

type Props = {
  id: number;
  myProfile: boolean;
  isPublic?: boolean;
};

const ProfileServer = async ({ id, myProfile, isPublic = false }: Props) => {
  const userdata: UserProfile = await getProfile(id);
  const publicUserdata: UserProfile = await getPublicProfile(id);
  const followingData: UserFollowingDataType = await getUserInfo(
    userdata.userName
  );
  const postsData: ApiResponsePosts = await getPosts(id, 0);

  return (
    <>
      <ProfileInfo
        userData={!isPublic ? userdata : publicUserdata}
        postsData={postsData}
        myProfile={myProfile}
        isPublic={isPublic}
        followingData={followingData}
      />
      <div className={s.posts}>
        <Posts
          id={id}
          postsData={postsData}
          userData={!isPublic ? userdata : publicUserdata}
          myProfile={myProfile}
          isPublic={isPublic}
        />
      </div>
    </>
  );
};

export default ProfileServer;
