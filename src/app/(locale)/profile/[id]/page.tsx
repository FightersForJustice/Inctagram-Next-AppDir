import { NextRequest } from 'next/server';
import s from './MyProfile.module.scss';
import { Profile } from './Profile';
import { actions } from './actions';
import { ApiResponsePosts, UserProfile } from './types';
import { headers } from 'next/headers';

const MyProfile = async ({ params }: { params: { id: string } }) => {
  const headersList = headers();
  const accessToken = headersList.get('accessToken');
  const id = parseInt(params.id, 10);
  const userdata: UserProfile = await actions.getProfile(accessToken);
  const postsData: ApiResponsePosts = await actions.getPosts(id);

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper} id={'wrapper'}>
          {/* SideBar */}
          <Profile userData={userdata!} postsData={postsData} />
        </div>
      </div>
    </>
  );
};

export default MyProfile;