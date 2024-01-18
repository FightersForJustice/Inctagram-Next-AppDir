'use client';
import Image from 'next/image';
import s from './ProfileInfo.module.scss';
import Link from 'next/link';
import { ApiResponsePosts, UserProfile } from '../types';
import { useTranslations } from 'next-intl';

type Props = {
  userData: UserProfile;
  myProfile: boolean;
  postsData: ApiResponsePosts;
};
export const ProfileInfo = ({ userData, myProfile, postsData }: Props) => {
  const t = useTranslations('MyProfilePage');
  return (
    <>
      <div className={s.profile}>
        <div className={s.left}>
          <Image
            src={
              userData?.avatars[0]
                ? userData.avatars[0].url
                : '/img/create-post/no-image.png'
            }
            alt="avatar"
            width={204}
            height={204}
            className={s.avatar}
          />
        </div>
        <div className={s.right}>
          <div className={s.info}>
            <div className={myProfile ? s.topMyProfile : s.top}>
              <div className={s.blockUser}>
                <div className={s.name}>{userData?.userName}</div>
                <div className={s.statistics}>
                  <div>
                    <p>0</p>
                    <p>{t('subscriptions')}</p>
                  </div>
                  <div>
                    <p>0</p>
                    <p>{t('subscribers')}</p>
                  </div>
                  <div>
                    <p>{postsData.totalCount}</p>
                    <p>{t('publications')}</p>
                  </div>
                </div>
              </div>
              <div className={s.btn}>
                {myProfile ? (
                  <Link href={'/settings-profile'} className={s.settings}>
                    {t('btnName')}
                  </Link>
                ) : (
                  <>
                    <Link href="#" className={s.btnPrimary}>
                      {t('SubscribersModal.subBtn')}
                    </Link>
                    <Link href="#" className={s.message}>
                      {t('btnSendMessage')}
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className={myProfile ? s.descriptions : s.descriptionsPublic}>
              {userData?.aboutMe ??
                "Fill in the information about yourself, it's empty now 👁️"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
