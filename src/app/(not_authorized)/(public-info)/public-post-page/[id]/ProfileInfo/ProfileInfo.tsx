'use client';
import Image from 'next/image';
import s from './ProfileInfo.module.scss';
import Link from 'next/link';
import { ApiResponsePosts, UserFollowingDataType, UserProfile } from '../types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_ROUTES } from '@/appRoutes/routes';
import { SubscriptionsModal } from '@/components/Modals/SubscriptionsModal';
import { SubscribersModal } from '@/components/Modals/SubscribersModal';
import {
  followToUser,
  unfollowByUser,
} from '@/app/(authorized)/search/SearchContent/actions';

type Props = {
  myId?: number;
  userData: UserProfile;
  myProfile: boolean;
  postsData: ApiResponsePosts;
  isPublic: boolean;
  followingData: UserFollowingDataType | null;
};
export const ProfileInfo = ({
  myId,
  userData,
  myProfile,
  postsData,
  isPublic,
  followingData,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const router = useRouter();

  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [isUserFollowing, setIsUserFollowing] = useState(
    followingData?.isFollowing
  );
  const [followingCount, setFollowingCount] = useState(
    followingData?.followingCount || 0
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

    router.refresh();
  }, []);

  const followUnfollowHandler = async () => {
    if (!isPublic) {
      let resIsOk: boolean | null;
      if (isUserFollowing) {
        resIsOk = await unfollowByUser(userData.id);
        if (resIsOk) {
          setIsUserFollowing(false);
          setFollowersCount((prev) => prev - 1);
        }
      } else {
        resIsOk = await followToUser(userData.id);
        if (resIsOk) {
          setIsUserFollowing(true);
          setFollowersCount((prev) => prev + 1);
        }
      }
    }
  };

  const followUnfollowForModal = async (
    userId: number,
    isFollowing: boolean
  ) => {
    let resIsOk: boolean | null;
    if (isFollowing) {
      resIsOk = await unfollowByUser(userId);
      resIsOk && myProfile && setFollowingCount((prev) => prev - 1);
    } else {
      resIsOk = await followToUser(userId);
      resIsOk && myProfile && setFollowingCount((prev) => prev + 1);
    }
  };

  const subBtnName = isUserFollowing
    ? 'SubscribersModal.unsubscribe'
    : 'SubscribersModal.subscribe';

  const openFollowingModal = () => {
    setShowFollowingModal(true);
  };

  const openFollowersModal = () => {
    setShowFollowersModal(true);
  };

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
                <div className={s.following} onClick={openFollowingModal}>
                  <p>{!isPublic && followingCount}</p>
                  <p>{translate('subscriptions')}</p>
                </div>
                <div className={s.followers} onClick={openFollowersModal}>
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
                <Link href={'/profile/settings-profile'} className={s.settings}>
                  {translate('btnName')}
                </Link>
              ) : !isPublic ? (
                <>
                  <Link
                    href="#"
                    onClick={followUnfollowHandler}
                    className={isUserFollowing ? s.btnSecondary : s.btnPrimary}
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
        {showFollowingModal && (
          <SubscriptionsModal
            myId={myId}
            userName={userData.userName}
            followUnfollow={followUnfollowForModal}
            setShowSubscriptionsModal={setShowFollowingModal}
          />
        )}
        {showFollowersModal && (
          <SubscribersModal
            myId={myId}
            isMyProfile={myProfile}
            userName={userData.userName}
            followUnfollow={followUnfollowForModal}
            setShowSubscribersModal={setShowFollowersModal}
          />
        )}
      </div>
    </div>
  );
};
