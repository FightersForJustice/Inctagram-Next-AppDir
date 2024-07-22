import { FollowersClient } from '@/components/admin/profile/followers/followers';

export default async function PostsList({
  params,
}: {
  params: { id: string };
}) {
  return <FollowersClient id={params.id} />;
}
