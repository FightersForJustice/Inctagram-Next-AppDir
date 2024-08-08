import React from 'react';
import {
  getPublicPostsPage,
} from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';

import s from '@/app/(not_authorized)/(public-info)/public-post-page/public-page.module.scss';
import { Post } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/Post';
import { UserProfile } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';



const PublicPostList = async () => {

  const publicPostPageData = await getPublicPostsPage();

  const posts = publicPostPageData.items.slice(0, 4);

  return (
    <>
      {posts.map((i: any) => {
        const mockedProfile = {id: i.id} as UserProfile
        return (
          <div key={i.id} style={{'width': '234px', 'height': '391px'}}>
            <Post post={i} userData={mockedProfile} myProfile={false} />
            <div className={s.userNameContainer}>
              {i.userName}
            </div>
            <div className={s.textContainer}>
              {i.description}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PublicPostList;
