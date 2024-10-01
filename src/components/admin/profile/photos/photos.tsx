'use client';

import React from 'react';
import Image from 'next/image';
import { useGetParams } from '@/utils/useGetParams';
import { useGetCurrentUserPostsQuery } from '@/queries/posts/posts.generated';
import s from './ProfileServer.module.scss';
import f from './Posts.module.scss';

export const PhotosClient = ({ id }: { id: string }) => {
  const url = useGetParams();

  let currentParams = url
    ?.slice(1)
    .split('&')
    .map((el) => {
      return el.split('=');
    });
  const { data, loading, error, refetch } = useGetCurrentUserPostsQuery({
    variables: currentParams?.length
      ? {
        userId: Number(id),
      }
      : { userId: Number(id),},
  });
  //react select issue
  //https://github.com/ndom91/react-timezone-select/issues/108

  return (
      <div className={s.posts}>
        {data?.getPostsByUser?.items?.map((el) => {
          return (
            <div key={el.id} className={f.imageContainer}>
              <Image
                src={el?.url ? el.url : '/img/profile/posts/post1.png'}
                alt={'post'}
                width={234}
                height={228}
                className={s.imagePost}
              />
            </div>
          );
        })}
      </div>
  );
};
