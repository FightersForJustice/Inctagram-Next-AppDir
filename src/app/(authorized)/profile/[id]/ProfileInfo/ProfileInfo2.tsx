'use client';
import Image from 'next/image';
import s from './ProfileInfo2.module.scss';
import Link from 'next/link';
import { UserProfile } from '../types';
import { useTranslations } from 'next-intl';

type Props = {
  userData: UserProfile;
  myProfile: boolean;
};
export const ProfileInfo2 = ({ myProfile }: Props) => {
  const t = useTranslations('MyProfilePage');
  return (
    <>
      <div className={s.profile}>
        <div className={s.left}></div>
        <div className={s.right}>
          <div className={s.info}>
            <div className={myProfile ? s.topMyProfile : s.top}>
              <div className={s.blockUser}>
                <div className={s.name}></div>
                <div className={s.statistics}>
                  <div>
                    <p></p>
                    <p></p>
                  </div>
                  <div>
                    <p></p>
                    <p></p>
                  </div>
                  <div>
                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
              <div className={s.btn}>
                {myProfile ? (
                  <div className={s.settings}></div>
                ) : (
                  <>
                    <div className={s.btnPrimary}></div>
                    <div className={s.message}></div>
                  </>
                )}
              </div>
            </div>
            <div className={myProfile ? s.descriptions : s.descriptionsPublic}>
              <div className={s.text}></div>
              <div className={s.text}></div>
              <div className={s.text}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
