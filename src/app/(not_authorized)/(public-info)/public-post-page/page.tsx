'use strict';

import React from 'react';
import { getPublicPostsPage } from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import s from './PublicPage.module.scss';
import Counter from '@/components/Counter/counter';
import { UserProfile } from './[id]/types';
import {
  PublicPost,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/PublicPost/PublicPost';

const PublicPostPage = async () => {
  const publicPostPageData = await getPublicPostsPage();

  const postsImages = () => {
    return publicPostPageData.items.slice(0, 4).map((i: any) => {
      const mockedProfile = { id: i.ownerId } as UserProfile;

      return (
        <div key={i.id} className={s.postContainer}>
          <PublicPost post={i} mockedProfile={mockedProfile}/>
        </div>
      );
    });
  };

  return (
    <div className={s.wrapper}>
      <Counter />
        <div className={s.container}>{postsImages()}</div>
    </div>
  );
};

export default PublicPostPage;
