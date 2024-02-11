import { Suspense } from 'react';
import { headers } from 'next/headers';
import { ProfileInfo } from './Skeleton/ProfileInfo/ProfileInfo';
import ProfileServer from './ProfileServer/ProfileServer';
import { Posts } from './Skeleton/Posts/Posts';

const Page = async ({ params }: { params: { id: string } }) => {
  const headersList = headers();
  const idHeaders = headersList.get('id') as string;
  const myId = parseInt(idHeaders, 10);
  const id = parseInt(params.id, 10);

  return (
    <>
      <ProfileServer id={id} myProfile={myId === id ? true : false} />
    </>
  );
};

export default Page;
