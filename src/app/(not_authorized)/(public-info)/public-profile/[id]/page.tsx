import React from 'react';

import ProfileServer from 'src/app/(not_authorized)/(public-info)/public-post-page/[id]/ProfileServer/ProfileServer';

interface Params {
  params: {
    id: number;
  };
}

const PublicProfileLayout = async ({ params }: Params) => {
  const { id } = params;

  return (
    <>
      <ProfileServer id={id} myProfile={false} isPublic />
    </>
  );
};

export default PublicProfileLayout;
