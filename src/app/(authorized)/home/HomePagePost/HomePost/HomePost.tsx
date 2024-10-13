import Image from 'next/image';

import { getTimeAgoText } from '@/utils/formatTimeFromDateString';
import { HomePostPopup } from './../HomePostPopup';
import { HomePostIcons } from './../HomePostIcons';
import { HomePostDescription } from './../HomePostDescription';
import { HomePostLikes } from './../HomePostLikes';
import { PostImageCarousel } from './../../PostImageCarousel';
import { useGetLanguage } from '@/redux/hooks/useGetLanguage';
import { useTranslation } from 'react-i18next';
import { Items } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import { ROUTES } from '@/appRoutes/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { updateLikesPostId } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import { useState } from 'react';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

import s from './../HomePagePost.module.scss';

type PropsType = {
  post: Items
  id: string | null
}

export const HomePost = ({ post, id }: PropsType) => {
  const router = useRouter();

  const language = useGetLanguage();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Time.${key}`);


  const openPost = () => {
    router.push(`/profile/${post.ownerId}?post=${post.id}`);
  };

  let isMyPost = null;

  if (id) {
    isMyPost = +id === post.ownerId;
  }


  const [localIsLiked, setLocalIsLiked] = useState<boolean>(post.isLiked);
  const [localLikesCount, setLocalLikesCount] = useState<number>(post.likesCount);


  if (post.id ===2257){
    console.log(localLikesCount, localIsLiked)
  }


  const toggleLike = async () => {
    console.log('toggleLike')
      setLocalIsLiked(!localIsLiked)
      setLocalLikesCount(localIsLiked ? localLikesCount - 1 : localLikesCount + 1)
      const response = await updateLikesPostId(post.id, localIsLiked);
      // fetchLikes();
  }

  const avatarLikes: FollowerType[]  = [] //post?.items.slice(0, 3)


  return (
    <div key={post.id} className={s.post}>
      <div className={s.post__top}>
        <div className={s.post__wrapper}>
          <Link href={ROUTES.PROFILE + `${'/' + post.ownerId}`} className={s.post__link}>
            <Image
              className={s.post__desc__ava}
              src={post.avatarOwner ?? '/img/create-post/no-image.png'}
              alt={'ava'}
              width={36}
              height={36}
            />
            <p className={s.post__title}>{post.userName}</p>
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
          >
            <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
          </svg>
          <p className={s.post__time}>{getTimeAgoText(post.createdAt, language, translate)}</p>
        </div>
        <HomePostPopup isMyPost={isMyPost} />
      </div>
      <PostImageCarousel images={post.images} openPost={openPost} />
      <HomePostIcons toggleLike={toggleLike} isLiked={localIsLiked}/>
      <HomePostDescription
        userName={post.userName}
        description={post.description}
        avatar={post.avatarOwner}
        ownerId={post.ownerId}
      />
      <HomePostLikes likes={localLikesCount} avatarLikes={avatarLikes}/>
    </div>
  );
};
