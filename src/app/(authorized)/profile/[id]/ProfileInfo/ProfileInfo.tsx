import Image from 'next/image';
import s from './ProfileInfo.module.scss';
import Link from 'next/link';
import { UserProfile } from '../types';

type Props = {
  userData: UserProfile;
  myProfile: boolean;
};
export const ProfileInfo = ({ userData, myProfile }: Props) => {
  return (
    <>
      <div className={s.info}>
        <div className={s.avatar}>
          <div className={s.ava}>
            <Image
              src="/img/profile/avatar.png"
              alt="avatar"
              width={204}
              height={204}
            />
          </div>
          <div className={s.name}>{userData.userName}</div>
        </div>
        <div className={s.indicators}>
          <div>
            <p>0</p>
            <p>Following</p>
          </div>
          <div>
            <p>0</p>
            <p>Followers</p>
          </div>
          <div>
            <p>0</p>
            <p>Publications</p>
          </div>
        </div>
        <div className={s.btn}>
          {myProfile ? (
            <Link href={'/settings-profile'} className={s.settings}>
              Profile Settings
            </Link>
          ) : (
            ''
          )}
        </div>
        <div className={s.descriptions}>
          <div className={s.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>
      </div>
    </>
  );
};
