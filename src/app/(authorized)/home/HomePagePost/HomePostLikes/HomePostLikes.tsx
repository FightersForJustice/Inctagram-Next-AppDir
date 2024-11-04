import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import s from '@/app/(authorized)/home/HomePagePost/HomePagePost.module.scss';


type Props = {
  likes: number;
  avatarLikes: string[];
};

export const HomePostLikes = ({ likes, avatarLikes }: Props) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`CreatePost.EditPost.${key}`);

  return (
    <>
      <div className={s.post__likes}>
        <div className={s.post__likes__amount__wrapper}>
          {avatarLikes && avatarLikes.length > 0 &&
            <div className={s.post__likes__amount__images}>
              {avatarLikes.map((item, index) => (
                <Image
                  key={index}
                  className={s.post__likes__amount__image}
                  src={item || '/img/create-post/no-image.png'}
                  alt={'post1'}
                  width={24}
                  height={24}
                />
              ))}
            </div>
          }
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
