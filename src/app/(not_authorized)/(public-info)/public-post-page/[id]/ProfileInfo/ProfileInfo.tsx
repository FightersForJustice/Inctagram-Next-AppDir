'use client';
import Image from 'next/image';
import s from './ProfileInfo.module.scss';
import Link from 'next/link';
import { ApiResponsePosts, UserFollowingDataType, UserProfile } from '../types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_ROUTES } from '@/appRoutes/routes';
import {
  followToUser,
  unfollowByUser,
} from '@/app/(authorized)/search/SearchContent/data';

type Props = {
  userData: UserProfile;
  myProfile: boolean;
  postsData: ApiResponsePosts;
  isPublic: boolean;
  followingData: UserFollowingDataType | null;
  token: string | null;
};
export const ProfileInfo = ({
  userData,
  myProfile,
  postsData,
  isPublic,
  followingData,
  token,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const router = useRouter();

  const [isUserFollowing, setIsUserFollowing] = useState(
    followingData?.isFollowing
  );
  const [followersCount, setFollowersCount] = useState(
    followingData?.followersCount || 0
  );

  useEffect(() => {
    const handler = (event: PopStateEvent) => {
      event.preventDefault();
      router.push(AUTH_ROUTES.PUBLIC_POST_PAGE);
    };

    if (isPublic) {
      window.addEventListener('popstate', handler);
      return () => {
        window.removeEventListener('popstate', handler);
      };
    }
  }, []);

  const followUnfollowHandler = async () => {
    if (!isPublic) {
      let resIsOk: boolean | null;
      if (isUserFollowing) {
        resIsOk = await unfollowByUser(userData.id, token);
        if (resIsOk) {
          setIsUserFollowing(false);
          setFollowersCount((prev) => prev - 1);
        }
      } else {
        resIsOk = await followToUser(userData.id, token);
        if (resIsOk) {
          setIsUserFollowing(true);
          setFollowersCount((prev) => prev + 1);
        }
      }
    }
  };

  const subBtnName = isUserFollowing
    ? 'SubscribersModal.unsubBtn'
    : 'SubscribersModal.subBtn';

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
                    <p>{!isPublic && followingData?.followingCount}</p>
                    <p>{translate('subscriptions')}</p>
                  </div>
                  <div>
                    <p>{!isPublic && followersCount}</p>
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
                ) : !isPublic ? (
                  <>
                    <Link
                      href="#"
                      onClick={followUnfollowHandler}
                      className={
                        isUserFollowing ? s.btnSecondary : s.btnPrimary
                      }
                    >
                      {translate(subBtnName)}
                    </Link>
                    <Link href="#" className={s.message}>
                      {translate('btnSendMessage')}
                    </Link>
                  </>
                ) : null}
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
