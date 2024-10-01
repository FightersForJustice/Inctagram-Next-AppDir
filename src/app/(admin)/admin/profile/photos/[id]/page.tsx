import { PhotosClient } from '@/components/admin/profile/photos/photos';
import { PostsListClient } from '@/components/admin/postsList/postsList';

export default async function PostsList({params}: Readonly<{
  params: { id: string };
}>) {
  return <PhotosClient id={params.id} />;
}
