import s from './Profile.module.scss';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { UserProfile } from './types';
//import { ProfileInfo } from '@/components/Skeleton/Profile/ProfileInfo/ProfileInfo';
type Props = {
  userData: UserProfile;
  myProfile: boolean;
};
export const Profile2 = ({ userData, myProfile }: Props) => {
  return (
    <>
      <ProfileInfo userData={userData} myProfile={myProfile} />
    </>
  );
};
