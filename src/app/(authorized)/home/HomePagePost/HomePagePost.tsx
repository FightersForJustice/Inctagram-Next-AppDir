'use client';

import s from './HomePagePost.module.scss';
import Image from 'next/image';

import { getTimeAgoText } from '@/utils/formatTimeFromDateString';
import { HomePostPopup } from './HomePostPopup';
import { HomePostIcons } from './HomePostIcons';
import { HomePostDescription } from './HomePostDescription';
import { HomePostLikes } from './HomePostLikes';
import { PostImageCarousel } from '../PostImageCarousel';
import { useGetLanguage } from '@/redux/hooks/useGetLanguage';
import { useTranslation } from 'react-i18next';
import { ApiResponsePosts } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import { getPublicPostsPage } from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/Loader';

type PropsType = {
  id: string | null
}

export const HomePagePost = ({ id }: PropsType) => {
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState<ApiResponsePosts | null>(null);

  const language = useGetLanguage();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Time.${key}`);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPublicPostsPage();
        setPostsData(res);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false); // Ensure loading state is set to false on error
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }



  return postsData?.items.map((i) => {

    let isMyPost = null;

    if(id){
      isMyPost = +id === i.ownerId
    }

    return (
      <div key={i.id} className={s.post}>
        <div className={s.post__top}>
          <div className={s.post__wrapper}>
            <Image
              className={s.post__desc__ava}
              src={i.avatarOwner ?? '/img/create-post/no-image.png'}
              alt={'ava'}
              width={36}
              height={36}
            />
            <p className={s.post__title}>{i?.userName}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
            >
              <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
            </svg>
            <p className={s.post__time}>{getTimeAgoText(i.createdAt, language, translate)}</p>
          </div>
            <HomePostPopup isMyPost={isMyPost}/>
        </div>
        <PostImageCarousel images={i.images} />
        <HomePostIcons />
        <HomePostDescription
          userName={i?.userName}
          description={i.description}
          avatar={i?.avatarOwner}
        />
        <HomePostLikes />
      </div>
    );
  });
};
