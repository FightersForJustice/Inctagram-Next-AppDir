import Image from 'next/image';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

import s from '../PostContent.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  likes: number
  avatarLikes?: FollowerType[]
  date?: string
};

export const PostAmount = ({ likes, avatarLikes, date }: Props) => {

  const { t } = useTranslation()
  const translate = (key: string): string => t(`Likes.${key}`)

  return (
    <div className={s.post__amount}>
      <div className={s.post__amount__wrapper}>
        {avatarLikes && avatarLikes.length > 0 &&
          <div className={s.post__amount__images}>
            {avatarLikes.map((item) => (
                <Image
                  key={item.id}
                  className={s.post__amount__image}
                  src={item.avatars.length !== 0 ? item.avatars[1].url : '/img/create-post/no-image.png'}
                  alt={'post1'}
                  width={24}
                  height={24}
                />
            ))}
          </div>
        }
        <p className={s.post__amount__likes}>
          <span className={s.post__amount__number}>{likes}</span>
          {translate('likes')}
        </p>
      </div>
      <p className={s.post__amount__date}>{date}</p>
    </div>
  );
};