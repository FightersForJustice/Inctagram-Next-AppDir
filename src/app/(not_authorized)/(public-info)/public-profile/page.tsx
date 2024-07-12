import React from 'react';
import PublicUserProfile from '@/components/PublicUserProfile/public-user-profile';

import { PublicProfileType } from '@/api/public-profile.api';
import { getPublicPosts, getPublicProfile } from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import { PostItem } from '@/api/public-post.api';


// type Props = {
//   id: number;
// };

const PublicProfile = async () => {
  // const publicProfilerData: PublicProfileType = await getPublicProfile(id);
  // const publicPostData: PostItem = await getPublicPosts(id, 0);
  return (
    <>
      {/* <PublicUserProfile publicUserData={publicProfilerData} publicPostData={publicPostData}/> */}
    </>
  );
};

export default PublicProfile;
