import { Suspense } from 'react';
import { headers } from 'next/headers';
import { ProfileInfo2 } from './ProfileInfo/ProfileInfo2';
import ProfileServer from './ProfileServer';

const Page = async ({ params }: { params: { id: string } }) => {
  const headersList = headers();
  const idHeaders = headersList.get('id') as string;
  const myId = parseInt(idHeaders, 10);
  const id = parseInt(params.id, 10);

  return (
    <>
      <Suspense
        fallback={<ProfileInfo2 myProfile={myId === id ? true : false} />}
      >
        <ProfileServer id={id} myProfile={myId === id ? true : false} />
      </Suspense>
    </>
  );
};

export default Page;
