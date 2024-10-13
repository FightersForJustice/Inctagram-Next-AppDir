'use client';

import { PostType, UserProfile } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import React, { useEffect, useState } from 'react';
import { getPublicProfile } from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import { PublicPost } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/PublicPost/PublicPost';
import { Loader } from '@/components/Loader';

import s from '@/app/(not_authorized)/(public-info)/public-post-page/PublicPage.module.scss';

type PostsImagesProps = {
  post: PostType;
  postIdFromUrl?: string;
};

export const PublicPosts = ({post, postIdFromUrl}: PostsImagesProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getPublicProfile(post.ownerId);
      setUserProfile(profile);
    };

    fetchProfile();
    setLoading(false)
  }, [post.ownerId]);

  const isOpenByLink = postIdFromUrl ? post.id === +postIdFromUrl : false;









  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 300 ) {
        // loadMorePosts();
        console.log('more posts')
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [post]);












  if (loading) return <Loader />

  return (
    <div key={post.id} className={s.postContainer}>
      {userProfile && <PublicPost
        post={post}
        userProfile={userProfile}
        isOpenByLink={isOpenByLink}
      />}
    </div>
  );
};