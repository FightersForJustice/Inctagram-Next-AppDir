import s from './HomePagePost.module.scss';
import Image from 'next/image';

import { ImageType, PostsItem } from '@/api/posts.api';
import { getTimeAgoText } from '@/utils/formatTimeFromDateString';
import { HomePostPopup } from './HomePostPopup';
import { useGetProfileQuery } from '@/api';

import { HomePostIcons } from './HomePostIcons';
import { HomePostDescription } from './HomePostDescription';
import { HomePostLikes } from './HomePostLikes';
import { PostImageCarousel } from '../PostImageCarousel';
import { useGetLanguageFromPath } from '@/redux/hooks/useGetLanguageFromPath';
import { useTranslation } from 'react-i18next';

type Props = {
  post: PostsItem;
  images: ImageType[];
};

export const HomePagePost = ({ post, images }: Props) => {
  const { data } = useGetProfileQuery();
  const language = useGetLanguageFromPath();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Time.${key}`);
  const test = getTimeAgoText(
    post.createdAt,
    language,
    translate
  );

  return (
    <div className={s.post}>
      <div className={s.post__top}>
        <div className={s.post__wrapper}>
          <Image
            src={
              data?.avatars && data.avatars.length !== 0
                ? data.avatars[0].url
                : '/img/create-post/no-image.png'
            }
            alt={'ava'}
            width={36}
            height={36}
          />

          <p className={s.post__title}>{data?.userName}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
          >
            <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
          </svg>
          <p className={s.post__time}>{test}</p>
        </div>
        <HomePostPopup />
      </div>
      <PostImageCarousel images={images} />
      <HomePostIcons />
      <HomePostDescription
        userName={data?.userName}
        description={'description'}
        avatars={data?.avatars}
      />
      <HomePostLikes />
    </div>
  );
};
