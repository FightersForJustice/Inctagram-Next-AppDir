'use client';
import s from './Posts.module.scss';
import { ApiResponsePosts, UserProfile } from '../types';
import { PostImg } from './Post';
import { useTranslation } from 'react-i18next';

type Props = {
  postsData: ApiResponsePosts;
  userData: UserProfile;
  myProfile: boolean;
};

export const Posts = ({ postsData, userData, myProfile }: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const postsImages = () => {
    return postsData?.items.map((i) => {
      return (
        <div key={i.id} className={s.imageContainer}>
          <PostImg post={i} userData={userData} myProfile={myProfile} />
        </div>
      );
    });
  };

  return (
    <>
      {postsData.items.length > 0 ? (
        postsImages()
      ) : (
        <div className={s.container}>
          <p className={s.text}>{translate('noPosts')}</p>
        </div>
      )}
    </>
  );
};
