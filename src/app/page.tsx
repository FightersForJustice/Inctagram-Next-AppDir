import { AUTH_ROUTES, ROUTES } from '@/appRoutes/routes';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function IndexPage() {
  const headersList = headers();
  const id = headersList.get('id');

  if (id === null || id === undefined) {
    redirect(AUTH_ROUTES.SIGN_IN);
  }

  redirect(`${ROUTES.PROFILE}/${id}`);
}
