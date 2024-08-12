import { PhotosClient } from '@/components/admin/profile/photos/photos';

export default async function PostsList({
  params,
}: {
  params: { id: string };
}) {
  return <PhotosClient id={params.id} />;
}
