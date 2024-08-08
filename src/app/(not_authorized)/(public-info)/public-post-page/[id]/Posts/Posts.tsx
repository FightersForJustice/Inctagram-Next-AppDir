'use client';
import { useSearchParams } from 'next/navigation';
import s from './Posts.module.scss';
import { UserProfile } from '../types';
import { Post } from './Post';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getPosts } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApiResponsePosts,
  ProfilePostActions,
} from '@/redux/reducers/MyProfile/ProfilePostReducer';
import { selectProfilePostItems } from '@/redux/reducers/MyProfile/ProfilePostSelectors';
import { findMinId } from '@/utils/findMinId';
import { useInView } from 'react-intersection-observer';
import { Loader } from '@/components/Loader';

type Props = {
  postsData: ApiResponsePosts;
  userData: UserProfile;
  myProfile: boolean;
  id: number;
  isPublic?: boolean;
};

export const Posts = ({ id, postsData, userData, myProfile, isPublic }: Props) => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView();
  const items = useSelector(selectProfilePostItems);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const translate = (key: string): string => t(`MyProfilePage.${key}`);

  const searchParams = useSearchParams();
  const postIdFromUrl = searchParams.get('post');

  useEffect(() => {
    dispatch(ProfilePostActions.addItemsRequest(postsData.items));
    setLoading(false);
  }, []);

  let minId = findMinId(items);

  const loadMoreBeers = async (newMinId: number | null) => {
    const newPosts: ApiResponsePosts = (await getPosts(id, newMinId)) ?? [];
    dispatch(ProfilePostActions.addItems(newPosts.items));
  };

  useEffect(() => {
    if (inView && minId !== 0) {
      loadMoreBeers(minId);
    }
  }, [inView]);

  const postsImages = () => {
    return items.map((i) => {
      const isOpenByLink = postIdFromUrl ? i.id === +postIdFromUrl : false;
      return (
        <div key={i.id} className={s.imageContainer}>
          <Post
            post={i}
            userData={userData}
            myProfile={myProfile}
            isOpenByLink={isOpenByLink}
            type={isPublic ? 'publicProfile' : undefined}
          />
        </div>
      );
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {items.length > 0 ? (
        postsImages()
      ) : (
        <div className={s.container}>
          <p className={s.text}>{translate('noPosts')}</p>
        </div>
      )}
      <div ref={ref} style={{ marginTop: '20px' }}></div>
    </>
  );
};
