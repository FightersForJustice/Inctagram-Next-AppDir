import React from 'react';
import s from '@/app/(locale)/home/HomePagePost/HomePagePost.module.scss';
import Image from 'next/image';
import { Avatar } from '@/api/profile.api';

type Props = {
  userName: string | undefined;
  description: string | undefined;
  avatars: Avatar[] | undefined;
};

export const HomePostDescription: React.FC<Props> = ({
  description,
  avatars,
  userName,
}) => {
  return (
    <div className={s.post__desc}>
      <Image
        // src={data?.avatars ? data.avatars[0].url : "/img/home/post.png"}
        src={
          avatars && avatars.length !== 0
            ? avatars[0].url
            : '/img/create-post/no-image.png'
        }
        alt={'ava'}
        width={36}
        height={36}
        className={s.post__desc__ava}
      />
      <p className={s.post__text}>
        <span className={s.post__text__name}>{userName} </span> <br />
        <span>{description}</span>
      </p>
    </div>
  );
};
