'use strict';

import React from 'react';
import {
  getCountRegisterUsers,
  getPublicPostsPage,
  getPublicProfile,
} from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import { PostType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import s from './PublicPage.module.scss';
import { PublicPost } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/PublicPost/PublicPost';
import CounterRegisterUser from '@/components/CounterRegisterUser/CounterRegisterUser';
import { CountRegisterUser } from '@/api/public-profile.api';

const PublicPostPage = async () => {
  const publicPostPageData = await getPublicPostsPage();
  const publicCountRegisterUsers: CountRegisterUser =
    await getCountRegisterUsers();

  const postsImages = () => {
    return publicPostPageData.items.slice(0, 4).map(async (i: PostType) => {
      const userProfile = await getPublicProfile(i.ownerId);

      return (
        <div key={i.id} className={s.postContainer}>
          <PublicPost post={i} userProfile={userProfile} />
        </div>
      );
    });
  };

  return (
    <div className={s.wrapper}>
      <CounterRegisterUser count={publicCountRegisterUsers.totalCount} />
      <div className={s.container}>{postsImages()}</div>
    </div>
  );
};

export default PublicPostPage;
