import s from './MyProfile.module.scss';
import { Profile } from './Profile';
import { actions } from './actions';
import { UserProfile } from './types';

const MyProfile = async () => {
  const data: UserProfile = await actions.getProfile();
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
