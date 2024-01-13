import { Profile } from './Profile';
import { actions } from './actions';
import { ApiResponsePosts, UserProfile } from './types';
import { headers } from 'next/headers';

const MyProfile = async ({ params }: { params: { id: string } }) => {
  const headersList = headers();
  const accessToken = headersList.get('accessToken');
  const idHeaders = headersList.get('id') as string;
  const myId = parseInt(idHeaders, 10);
  const id = parseInt(params.id, 10);
  const userdata: UserProfile = await actions.getProfile(accessToken, id);
  //await new Promise((resolve) => setTimeout(resolve, 1000000));
  const postsData: ApiResponsePosts = await actions.getPosts(id, 0);

  return (
    <>
      <Profile
        userData={userdata!}
        postsData={postsData}
        myProfile={myId === id ? true : false}
      />
    </>
  );
};

export default MyProfile;
