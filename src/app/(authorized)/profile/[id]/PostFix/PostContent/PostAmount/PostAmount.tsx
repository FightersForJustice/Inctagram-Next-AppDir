import Image from 'next/image';

import s from '../PostContent.module.scss';

export const PostAmount = () => {
  return (
    <div className={s.post__amount}>
      <div className={s.post__amount__wrapper}>
        <div className={s.post__amount__images}>
          <Image
            className={s.post__amount__image1}
            src={'/img/profile/posts/post1.png'}
            alt={'post1'}
            width={24}
            height={24}
          />
          <Image
            className={s.post__amount__image2}
            src={'/img/profile/posts/post2.png'}
            alt={'post1'}
            width={24}
            height={24}
          />
          <Image
            className={s.post__amount__image3}
            src={'/img/profile/posts/post3.png'}
            alt={'post1'}
            width={24}
            height={24}
          />
        </div>
        <p className={s.post__amount__likes}>
          <span className={s.post__amount__number}>2 243 </span>
          Like
        </p>
      </div>
      <p className={s.post__amount__date}>July 3, 2021</p>
    </div>
  );
};
