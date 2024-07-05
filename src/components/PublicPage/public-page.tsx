import React from 'react';
import { Posts } from '@/app/(authorized)/profile/[id]/Posts/Posts';
import Counter from '@/components/Counter/counter';
import { UserProfile } from '@/app/(authorized)/profile/[id]/types';
import { getPosts, getProfile } from '@/app/(authorized)/profile/[id]/actions';
import { ApiResponsePosts } from '@/redux/reducers/MyProfile/ProfilePostReducer';

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