import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

import s from '@/app/(authorized)/home/HomePagePost/HomePagePost.module.scss';


type Props = {
  likes: number;
  avatarLikes?: FollowerType[]
};

export const HomePostLikes = ({ likes }: Props) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`CreatePost.EditPost.${key}`);

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
          {likes} <span className={s.post__likes__text}>
          {likes !== 1 ? 'Likes' : 'Like' }
        </span>
        </p>
      </div>
      <p className={s.post__comments}>{translate('viewComments')} (114)</p>
      <div className={s.post__bottom}>
        <input
          type="text"
          className={s.post__input}
          placeholder={translate('addComment') + '...'}
        />
        <button className={s.post__btn}>{translate('publish')}</button>
      </div>
    </>
  );
};
