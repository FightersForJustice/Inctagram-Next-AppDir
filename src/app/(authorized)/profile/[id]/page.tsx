import { Profile } from './Profile';
import { actions } from './actions';
import { ApiResponsePosts, UserProfile } from './types';
import { headers } from 'next/headers';

const MyProfile = async ({ params }: { params: { id: string } }) => {
  const idHeaders = 60; // полученый id с headersList.
  const headersList = headers();
  const accessToken = headersList.get('accessToken');
  const id = parseInt(params.id, 10);
  const userdata: UserProfile = await actions.getProfile(accessToken, id);
  const postsData: ApiResponsePosts = await actions.getPosts(id, 0);

  return (
    <>
      <Profile
        userData={userdata!}
        postsData={postsData}
        myProfile={idHeaders === id ? true : false}
      />
    </>
  );
};

export default MyProfile;
