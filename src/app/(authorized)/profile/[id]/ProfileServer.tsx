import { Suspense } from 'react';
import { Profile } from './Profile';
import { Profile2 } from './Profile2';
import { actions } from './actions';
import { ApiResponsePosts, UserProfile } from './types';
import { headers } from 'next/headers';
import { ProfileInfo2 } from './ProfileInfo/ProfileInfo2';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
type Props = {
  id: number;
  myProfile: boolean;
};
const ProfileServer = async ({ id, myProfile }: Props) => {
  const headersList = headers();
  const accessToken = headersList.get('accessToken');
  const userdata: UserProfile = await actions.getProfile(accessToken, id);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const postsData: ApiResponsePosts = await actions.getPosts(id, 0);

  return (
    <>
      <ProfileInfo
        userData={userdata}
        postsData={postsData}
        myProfile={myProfile}
      />
    </>
  );
};

export default ProfileServer;
