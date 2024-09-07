import Image from 'next/image';

import s from '../PostContent.module.scss';
import { PostType } from '../../../types';
import { formatSubscriptionDate } from '@/utils';
import { PostCommentType } from '../PostCommentHOC/PostCommentHOC';

type Props = {
  postData: PostType;
  postsLikes: Array<PostCommentType> | undefined;
};

export const PostAmount = ({ postData, postsLikes }: Props) => {
  return (
    <div className={s.post__amount}>
      <div className={s.post__amount__wrapper}>
        <div className={s.post__amount__images}>
          {postsLikes?.map((el) => {
            return (
              <Image
                key={el.from.id + el.content + el.from.username}
                className={s.post__amount__image1}
                src={
                  el.from.avatars[0].url
                    ? el.from.avatars[0].url
                    : '/img/profile/posts/post1.png'
                }
                alt={'post1'}
                width={24}
                height={24}
              />
            );
          })}
        </div>
        <p className={s.post__amount__likes}>
          <span className={s.post__amount__number}>{postData.likesCount} </span>
          Like
        </p>
      </div>
      <p className={s.post__amount__date}>
        {formatSubscriptionDate(postData.updatedAt)}
      </p>
    </div>
  );
};
