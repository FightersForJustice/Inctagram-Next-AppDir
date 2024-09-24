'use client';
import Image from 'next/image';

import s from './PublicPost.module.scss';
import k from '../../PostFix/PostContent/PostContent.module.scss';
import { useGetLanguage } from '@/redux/hooks/useGetLanguage';
import { useTranslation } from 'react-i18next';
import { getTimeAgoText } from '@/utils';
import { PostType, UserProfile } from '../../types';
import Link from 'next/link';
import { AUTH_ROUTES } from '@/appRoutes/routes';
import { Post } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/Post';
import React from 'react';
import { ReadMoreButton } from '@/components/ReadMoreButton/ReadMoreButton';
import { ImagesAmount } from '@/components/ImagesAmount';

type Props = {
  post: PostType;
  userProfile: UserProfile;
  isOpenByLink: boolean;
};

export const PublicPost = ({ post, userProfile, isOpenByLink }: Props) => {
  const language = useGetLanguage();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Time.${key}`);
  const translateReadMoreButton = (key: string): string => t(`ReadMore.${key}`);
  const time = getTimeAgoText(post.createdAt, language, translate);

  console.log(post.images);

  return (
    <>
      <div className={s.postWrapper}>
        <div className={s.imageContainer}>
          <Post
            post={post}
            userData={userProfile}
            myProfile={false}
            type={'publicPage'}
            isOpenByLink={isOpenByLink}
          />
          {post.images.length > 1 && (
            <ImagesAmount imagesLength={post.images.length} />
          )}
        </div>

        <Link href={AUTH_ROUTES.PUBLIC_PROFILE + `${'/' + post.ownerId}`}>
          <div className={s.userContainer}>
            <Image
              src={post.avatarOwner ?? '/img/create-post/no-image.png'}
              alt={'ava'}
              width={36}
              height={36}
              className={k.post__avatar}
            />
            <h3 className={s.userName}>{post.userName} </h3>
          </div>
        </Link>
        <p className={s.time}>{time}</p>
      </div>
      <div className={s.description}>
        <ReadMoreButton
          text={post.description}
          maxLength={80}
          moreText={translateReadMoreButton('showMore')}
          lessText={translateReadMoreButton('hide')}
        />
      </div>
    </>
  );
};
