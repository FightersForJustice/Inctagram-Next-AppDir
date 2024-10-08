import Image from 'next/image';

import s from '../PostContent.module.scss';

type Props = {
  likes: number;
};

export const PostAmount = ({likes}: Props) => {

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
          <span className={s.post__amount__number}>{likes}</span>
          Likes
        </p>
      </div>
      <p className={s.post__amount__date}>July 3, 2021</p>
    </div>
  );
};
