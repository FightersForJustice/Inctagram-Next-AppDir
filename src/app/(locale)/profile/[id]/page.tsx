import { NextRequest } from 'next/server';
import s from './MyProfile.module.scss';
import { Profile } from './Profile';
import { actions } from './actions';
import { ApiResponsePosts, UserProfile } from './types';
import { headers } from 'next/headers';
import { SideBar } from '../../my-profile/Navigation';

const MyProfile = async ({ params }: { params: { id: string } }) => {
  const idHeaders = 60; // полученый id с headersList
  const headersList = headers();
  const accessToken = headersList.get('accessToken');
  const id = parseInt(params.id, 10);
  const userdata: UserProfile = await actions.getProfile(accessToken, id);
  const postsData: ApiResponsePosts = await actions.getPosts(id, 0);
  console.log(userdata);

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper} id={'wrapper'}>
          <SideBar pathname={'pathname'} paidAccount={true} />
          <Profile
            userData={userdata!}
            postsData={postsData}
            myProfile={idHeaders === id ? true : false}
          />
        </div>
      </div>
    </>
  );
};

export default MyProfile;
