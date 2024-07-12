import React from 'react';
import { Posts } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/Posts';
import Counter from '@/components/Counter/counter';
import { getPosts, getProfile } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import { ApiResponsePosts } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import { UserProfile } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

type Props = {
  id: number
}

const PublicPage = async ({id}: Props) => {
  const userData: UserProfile = await getProfile(id);
  const postsData: ApiResponsePosts = await getPosts(id, 0);
  return (
    <div>
      <Counter />
      <Posts postsData={postsData} userData={userData} myProfile={false} id={id} />
    </div>
  );
};

export default PublicPage;