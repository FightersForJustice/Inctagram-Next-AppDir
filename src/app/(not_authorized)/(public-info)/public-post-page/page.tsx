'use strict';

import React from 'react';
import { getPublicPostsPage } from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import { Post } from '@/app/(authorized)/profile/[id]/Posts/Post';
import { UserProfile } from '@/app/(authorized)/profile/[id]/types';
import s from './PublicPage.module.scss';
import Counter from '@/components/Counter/counter';
import Link from 'next/link';
import { AUTH_ROUTES } from '@/appRoutes/routes';

const PublicPostPage = async () => {
  const publicPostPageData = await getPublicPostsPage();

  const postsImages = () => {
    return publicPostPageData.items.slice(0, 4).map((i: any) => {
      const mockedProfile = { id: i.ownerId } as UserProfile;
      return (
        <div key={i.id} className={s.postContainer}>
          <div key={i.id}>
            <Post post={i} userData={mockedProfile} myProfile={false} />
          </div>
          <Link href={AUTH_ROUTES.PUBLIC_PROFILE_PAGE + `${'/' + i.ownerId}`}>
            <div className={s.userNameContainer}>{i.userName}</div>
          </Link>
          <div className={s.textContainer}>{i.description}</div>
        </div>
      );
    });
  };

  return (
    <>
      <Counter />
      <div className={s.container}>
        <div className={s.publicImage}>{postsImages()}</div>
      </div>
    </>
  );
};

export default PublicPostPage;
