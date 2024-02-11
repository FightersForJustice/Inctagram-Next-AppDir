import { Suspense } from 'react';
import { headers } from 'next/headers';
import { ProfileInfo } from './Skeleton/ProfileInfo/ProfileInfo';
import ProfileServer from './ProfileServer/ProfileServer';
import { Posts } from './Skeleton/Posts/Posts';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: { id: string } }) => {
  const headersList = headers();
  const idHeaders = headersList.get('id') as string;
  if (idHeaders === null || idHeaders === undefined) {
    redirect('/');
  }
  const myId = parseInt(idHeaders, 10);
  const id = parseInt(params.id, 10);

  return (
    <>
      <Suspense
        fallback={
          <>
            <ProfileInfo myProfile={myId === id ? true : false} />
            <Posts />
          </>
        }
      >
        <ProfileServer id={id} myProfile={myId === id ? true : false} />
      </Suspense>
    </>
  );
};

export default Page;
