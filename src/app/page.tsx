import { ADMIN_ROUTES, AUTH_ROUTES, ROUTES } from '@/appRoutes/routes';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function IndexPage() {
  const headersList = headers();
  const cookiesList = cookies();
  const id = headersList.get('id');
  const corn = cookiesList.get('corn');

  if (corn) {
    redirect(ADMIN_ROUTES.ADMIN_USERS_LIST);
  }
  if (id === null || id === undefined) {
    redirect(AUTH_ROUTES.PUBLIC_POST_PAGE);
  }

  redirect(`${ROUTES.PROFILE}/${id}`);
}
