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

type Props = {
  myId?: number;
  id: number;
  myProfile: boolean;
  isPublic?: boolean;
};

const ProfileServer = async ({
  id,
  myProfile,
  isPublic = false,
  myId,
}: Props) => {
  const userdata: UserProfile = await getProfile(id);
  const followingData: UserFollowingDataType | null = await getUserInfo(
    userdata.userName || ''
  );
  const postsData: ApiResponsePosts = await getPosts(id, 0);

  return (
    <>
      <ProfileInfo
        myId={myId}
        userData={userdata}
        postsData={postsData}
        myProfile={myProfile}
        isPublic={isPublic}
        followingData={!isPublic ? followingData : null}
      />
      <div className={s.posts}>
        <Posts
          myId={myId}
          id={id}
          postsData={postsData}
          myProfile={myProfile}
          isPublic={isPublic}
        />
      </div>
    </>
  );
};

export default ProfileServer;
