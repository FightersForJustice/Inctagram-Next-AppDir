import { PostsListClient } from '@/components/admin/postsList/postsList';
import { PaymentsClient } from '@/components/admin/profile/payment/payments';

export default async function PostsList({
  params,
}: {
  params: { id: string };
}) {
  return <PaymentsClient id={params.id} />;
}
