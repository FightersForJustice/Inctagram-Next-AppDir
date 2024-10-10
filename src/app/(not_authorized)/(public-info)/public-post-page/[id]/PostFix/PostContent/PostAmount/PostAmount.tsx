import Image from 'next/image';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

import s from '../PostContent.module.scss';


type Props = {
  likes: number;
  avatarLikes?: FollowerType[]
};

export const PostAmount = ({ likes, avatarLikes }: Props) => {

  return (
    <div className={s.post__amount}>
      <div className={s.post__amount__wrapper}>
        {avatarLikes && avatarLikes.length > 0 &&
          <div className={s.post__amount__images}>
            {avatarLikes.map((item, index) => (
              <Image
                key={index}
                className={s.post__amount__image}
                src={item.avatars[1].url}
                alt={'post1'}
                width={24}
                height={24}
              />
            ))}
          </div>
        }
        <p className={s.post__amount__likes}>
          <span className={s.post__amount__number}>{likes}</span>
          Likes
        </p>
      </div>
      <p className={s.post__amount__date}>July 3, 2021</p>
    </div>
  );
};
