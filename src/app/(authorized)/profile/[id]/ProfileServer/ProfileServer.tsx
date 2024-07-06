import { getPosts, getProfile } from '../actions';
import { UserProfile } from '../types';
import { ProfileInfo } from '../ProfileInfo/ProfileInfo';
import s from './ProfileServer.module.scss';
import { Posts } from '../Posts/Posts';

import { ApiResponsePosts } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import { getPublicProfile } from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';

type Props = {
  id: number;
  myProfile: boolean;
  isPublic?: boolean;
};

const ProfileServer = async ({ id, myProfile, isPublic = false }: Props) => {
  const userdata: UserProfile = await getProfile(id);
  const publicUserdata: UserProfile = await getPublicProfile(id);
  //await new Promise((resolve) => setTimeout(resolve, 3000));
  // const postsData: ApiResponsePosts = await getPosts(id, 0);
  console.log('sd');
  const postsData = 10
  return (
    <>
      <ProfileInfo
        userData={isPublic ? userdata : publicUserdata}
        postsData={postsData}
        myProfile={myProfile}
      />
      {/* <div className={s.posts}>
        <Posts
          id={id}
          postsData={postsData}
          userData={isPublic ? userdata : publicUserdata}
          myProfile={myProfile}
        />
      </div> */}
    </>
  );
};

export default ProfileServer;
