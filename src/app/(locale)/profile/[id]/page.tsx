import { NextRequest } from 'next/server';
import s from './MyProfile.module.scss';
import { Profile } from './Profile';
import { actions } from './actions';
import { UserProfile } from './types';
import { headers } from 'next/headers';
type Props = {
  request: NextRequest;
};
const MyProfile = async ({ request }: Props) => {
  const headersList = headers();
  const accessToken = headersList.get('accessToken');

  const data: UserProfile = await actions.getProfile(accessToken);

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper} id={'wrapper'}>
          {/* SideBar */}
          <Profile userData={data!} />
        </div>
      </div>
    </>
  );
};

export default MyProfile;
