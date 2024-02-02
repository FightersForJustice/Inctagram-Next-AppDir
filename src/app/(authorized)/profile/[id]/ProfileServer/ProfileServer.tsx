import { getPosts, getProfile } from '../actions';
import { ApiResponsePosts, UserProfile } from '../types';
import { ProfileInfo } from '../ProfileInfo/ProfileInfo';
import s from './ProfileServer.module.scss';
import { Posts } from '../Posts/Posts';
import { LoadMore } from '../Posts/load-more';
import { findMinId } from '@/utils/findMinId';
import { headers } from 'next/headers';
type Props = {
  id: number;
  myProfile: boolean;
};
const ProfileServer = async ({ id, myProfile }: Props) => {
  const headersList = headers();
  const accessToken = headersList.get('accessToken');
  const userdata: UserProfile = await getProfile(id);
  //await new Promise((resolve) => setTimeout(resolve, 3000));
  const postsData: ApiResponsePosts = await getPosts(id, 0);
  let minId = findMinId(postsData.items);
  return (
    <>
      <ProfileInfo
        userData={userdata}
        postsData={postsData}
        myProfile={myProfile}
      />
      <div className={s.posts}>
        <Posts
          postsData={postsData}
          userData={userdata}
          myProfile={myProfile}
        />
        <LoadMore
          id={userdata.id}
          minId={minId}
          userData={userdata}
          myProfile={myProfile}
        />
      </div>
    </>
  );
};

export default ProfileServer;
