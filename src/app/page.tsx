import { redirect } from 'next/navigation';

export default function IndexPage() {
  redirect('/sign-in');
}
