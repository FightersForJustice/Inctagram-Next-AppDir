import React from 'react';
import PublicUserProfile from '@/components/PublicUserProfile/public-user-profile';

import { PublicProfileType } from '@/api/public-profile.api';
import { getPublicPosts, getPublicProfile } from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import { PostItem } from '@/api/public-post.api';
import { ApiResponsePosts } from '@/app/(authorized)/profile/[id]/types';


type Props = {
  id: number;
};

const PublicPage = async ({ id }: Props) => {
  const publicProfilerData: PublicProfileType = await getPublicProfile(id);
  const publicPostData: PostItem = await getPublicPosts(id, 0);
  return (
    <>
      <PublicUserProfile publicUserData={publicProfilerData} publicPostData={publicPostData}/>
    </>
  );
};

export default PublicPage;
