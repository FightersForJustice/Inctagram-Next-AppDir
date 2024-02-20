import { headers } from 'next/headers';
import ProfileServer from './ProfileServer/ProfileServer';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/appRoutes/routes';

const Page = async ({ params }: { params: { id: string } }) => {
  const headersList = headers();
  const idHeaders = headersList.get('id') as string;
  if (idHeaders === null || idHeaders === undefined) {
    redirect(ROUTES.HOME_PAGE);
  }
  const myId = parseInt(idHeaders, 10);
  const id = parseInt(params.id, 10);

  return (
    <>
      <ProfileServer id={id} myProfile={myId === id ? true : false} />
    </>
  );
};

export default Page;
