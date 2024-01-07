import Image from 'next/image';
import s from './Posts.module.scss';
import { Post } from '../types';

type Props = {
  post: Post;
};

export function PostImg({ post }: Props) {
  const currentPosts = post.images.filter(
    (postImage) => postImage.width !== 640
  );

  return (
    <>
      <Image
        src={
          post.images[0]?.url
            ? currentPosts[0].url
            : '/img/profile/posts/post1.png'
        }
        alt={'post'}
        width={234}
        height={228}
        className={s.post}
      />
    </>
  );
}
