import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function IndexPage() {
  const headersList = headers();
  const id = headersList.get('id');

  redirect(`/profile/${id}`);
}
