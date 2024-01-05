import React from 'react';
import Image from 'next/image';

import s from '@/app/(authorized)/home/HomePagePost/HomePagePost.module.scss';

export const HomePostLikes = () => {
  return (
    <>
      <div className={s.post__likes}>
        <div className={s.post__likes__avatars}>
          <Image
            src={'/img/home/ava1.png'}
            alt={'ava1'}
            width={24}
            height={24}
            className={s.post__likes__ava1}
          />
          <Image
            src={'/img/home/ava2.png'}
            alt={'ava2'}
            width={24}
            height={24}
            className={s.post__likes__ava2}
          />
          <Image
            src={'/img/home/ava3.png'}
            alt={'ava3'}
            width={24}
            height={24}
            className={s.post__likes__ava3}
          />
        </div>
        <p className={s.post__likes__amount}>
          0 <span className={s.post__likes__text}>Likes</span>
        </p>
      </div>
      <p className={s.post__comments}>View All Comments (114)</p>
      <div className={s.post__bottom}>
        <input
          type="text"
          className={s.post__input}
          placeholder={'Add a comment'}
        />
        <button className={s.post__btn}>Publish</button>
      </div>
    </>
  );
};
