import { ROUTES } from '@/appRoutes/routes';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function IndexPage() {
  const headersList = headers();
  const id = headersList.get('id');

  if (id === null || id === undefined) {
    redirect(ROUTES.HOME_PAGE);
  }

  redirect(`${ROUTES.PROFILE}${id}`);
}
