import { PostsListClient } from '@/components/admin/postsList/postsList';
import { FollowingClient } from '@/components/admin/profile/following/following';

export default async function PostsList({
  params,
}: {
  params: { id: string };
}) {
  return <FollowingClient id={params.id} />;
}
