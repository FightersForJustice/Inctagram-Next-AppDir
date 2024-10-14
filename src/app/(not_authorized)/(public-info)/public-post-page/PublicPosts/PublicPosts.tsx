'use client';

import { PostType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import React, { useEffect, useRef, useState } from 'react';
import { getPublicPostsPage} from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import { PublicPost } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/PublicPost/PublicPost';

import s from '@/app/(not_authorized)/(public-info)/public-post-page/PublicPage.module.scss';

type PostsImagesProps = {
  initialPosts: PostType[];
  postIdFromUrl?: string;
}

export const PublicPosts = ({initialPosts, postIdFromUrl}: PostsImagesProps) => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts)
  const [endCursorPostId, setEndCursorPostId] = useState(initialPosts[initialPosts.length - 1]?.id || null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const loadMorePosts = async () => {
    if (loading || !endCursorPostId || !hasMore) return

    setLoading(true)
    try {
      const publicPostPageData = await getPublicPostsPage(endCursorPostId)
      if (publicPostPageData.items.length === 0) {
        setHasMore(false)
      } else {
        setPosts((prevPosts) => [...prevPosts, ...publicPostPageData.items])
        setEndCursorPostId(publicPostPageData.items[publicPostPageData.items.length - 1].id)
      }
    } catch (error) {
      console.error("Error loading posts:", error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 300) {
          loadMorePosts()
        }
      }, 200)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [loading, endCursorPostId, hasMore])

  console.log(posts)

  return (
    <div className={s.container}>
      {posts.map((post) => (
        <div key={post.id} className={s.postContainer}>
          <PublicPost post={post} isOpenByLink={postIdFromUrl ? post.id === +postIdFromUrl : false}/>
        </div>
      ))}
    </div>
  )
}