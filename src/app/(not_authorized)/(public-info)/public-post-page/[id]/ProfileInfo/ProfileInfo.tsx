'use client';
import Image from 'next/image';
import s from './ProfileInfo.module.scss';
import Link from 'next/link';
import { ApiResponsePosts, UserProfile } from '../types';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_ROUTES } from '@/appRoutes/routes';

type Props = {
  userData: UserProfile;
  myProfile: boolean;
  postsData: ApiResponsePosts;
  isPublic: boolean;
};
export const ProfileInfo = ({
  userData,
  myProfile,
  postsData,
  isPublic,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const router = useRouter();

  useEffect(() => {
    const handler = (event: PopStateEvent) => {
      event.preventDefault();
      router.push(AUTH_ROUTES.PUBLIC_POST_PAGE);
    };

    if (isPublic) {
      window.addEventListener('popstate', handler);

      return () => {
        console.log('I was worked');
        window.removeEventListener('popstate', handler);
      };
    }
  }, []);

  return (
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
                    <p>{translate('subscriptions')}</p>
                  </div>
                  <div>
                    <p>0</p>
                    <p>{translate('subscribers')}</p>
                  </div>
                  <div>
                    <p>{postsData.totalCount}</p>
                    <p>{translate('publications')}</p>
                  </div>
                </div>
              </div>
              <div className={s.btn}>
                {myProfile ? (
                  <Link
                    href={'/profile/settings-profile'}
                    className={s.settings}
                  >
                    {translate('btnName')}
                  </Link>
                ) : (
                  <>
                    <Link href="#" className={s.btnPrimary}>
                      {translate('SubscribersModal.subBtn')}
                    </Link>
                    <Link href="#" className={s.message}>
                      {translate('btnSendMessage')}
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className={myProfile ? s.descriptions : s.descriptionsPublic}>
              {userData?.aboutMe ?? translate('aboutMe')}
            </div>
          </div>
        </div>
      </div>
  );
};
