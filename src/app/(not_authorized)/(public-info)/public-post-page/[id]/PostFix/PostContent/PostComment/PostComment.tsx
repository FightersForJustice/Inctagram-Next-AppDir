import Image from 'next/image';

import s from './PostComment.module.scss';
import { PostCommentType } from '../PostCommentHOC/PostCommentHOC';

type PostCommentPropsType = {
  myProfile: boolean;
  onLikeHandler: () => void;
  onAnswerHandler: () => void;
  data: PostCommentType;
  answers: PostCommentType[] | undefined;
};

export const PostComment = ({
  myProfile,
  data,
  answers,
  onLikeHandler,
  onAnswerHandler,
}: PostCommentPropsType) => {
  console.log(answers)
  return (
    <div className={s.post__comment}>
      <div className={s.post__comment__wrapper}>
        <Image
          src={
            data.from.avatars[0].url
              ? data.from.avatars[0].url
              : '/img/modal/post.png'
          }
          alt={'ava'}
          width={36}
          height={36}
          className={s.post__comment__avatar}
        />
        <div className="flex flex-col gap-1">
          <p className={s.post__comment__text}>
            <span className={s.post__comment__name}>{data.from.username} </span>
            {data.content}
          </p>
          <div className={s.post__comment__container}>
            <p>2 Hours ago</p>
            {!!data.likeCount && (
              <p className="font-bold">Like: {data.likeCount}</p>
            )}
            {myProfile && <p className={s.post__comment__answer} onClick={onAnswerHandler}>Answer</p>}
          </div>
        </div>
      </div>
      {myProfile && !data.likeCount ? (
        <svg
          style={{ cursor: 'pointer' }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          onClick={onLikeHandler}
        >
          <path
            d="M7.99959 14C7.91185 14.0005 7.82488 13.9837 7.74365 13.9505C7.66243 13.9173 7.58855 13.8685 7.52626 13.8067L2.34626 8.62001C1.6965 7.96346 1.33203 7.07706 1.33203 6.15334C1.33203 5.22963 1.6965 4.34323 2.34626 3.68668C3.0011 3.03369 3.88814 2.66699 4.81292 2.66699C5.7377 2.66699 6.62475 3.03369 7.27959 3.68668L7.99959 4.40668L8.71959 3.68668C9.37443 3.03369 10.2615 2.66699 11.1863 2.66699C12.111 2.66699 12.9981 3.03369 13.6529 3.68668C14.3027 4.34323 14.6671 5.22963 14.6671 6.15334C14.6671 7.07706 14.3027 7.96346 13.6529 8.62001L8.47292 13.8067C8.41063 13.8685 8.33675 13.9173 8.25553 13.9505C8.1743 13.9837 8.08733 14.0005 7.99959 14ZM4.81292 4.00001C4.53071 3.99873 4.25104 4.05346 3.99013 4.16103C3.72921 4.2686 3.49224 4.42687 3.29292 4.62668C2.8903 5.03143 2.66428 5.57911 2.66428 6.15001C2.66428 6.72091 2.8903 7.2686 3.29292 7.67334L7.99959 12.3867L12.7063 7.67334C13.1089 7.2686 13.3349 6.72091 13.3349 6.15001C13.3349 5.57911 13.1089 5.03143 12.7063 4.62668C12.2954 4.23848 11.7515 4.02221 11.1863 4.02221C10.621 4.02221 10.0771 4.23848 9.66625 4.62668L8.47292 5.82668C8.41095 5.88916 8.33721 5.93876 8.25597 5.97261C8.17473 6.00645 8.0876 6.02388 7.99959 6.02388C7.91158 6.02388 7.82444 6.00645 7.7432 5.97261C7.66196 5.93876 7.58823 5.88916 7.52626 5.82668L6.33292 4.62668C6.13361 4.42687 5.89663 4.2686 5.63572 4.16103C5.3748 4.05346 5.09514 3.99873 4.81292 4.00001Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          style={{ cursor: 'pointer' }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onLikeHandler}
        >
          <g clip-path="url(#clip0_310_5342)">
            <path
              d="M7.99959 14C7.91185 14.0005 7.82488 13.9837 7.74365 13.9505C7.66243 13.9173 7.58855 13.8685 7.52626 13.8067L2.34626 8.62001C1.6965 7.96346 1.33203 7.07706 1.33203 6.15334C1.33203 5.22963 1.6965 4.34323 2.34626 3.68668C3.0011 3.03369 3.88814 2.66699 4.81292 2.66699C5.7377 2.66699 6.62475 3.03369 7.27959 3.68668L7.99959 4.40668L8.71959 3.68668C9.37443 3.03369 10.2615 2.66699 11.1863 2.66699C12.111 2.66699 12.9981 3.03369 13.6529 3.68668C14.3027 4.34323 14.6671 5.22963 14.6671 6.15334C14.6671 7.07706 14.3027 7.96346 13.6529 8.62001L8.47292 13.8067C8.41063 13.8685 8.33675 13.9173 8.25553 13.9505C8.1743 13.9837 8.08733 14.0005 7.99959 14Z"
              fill="#CC1439"
            />
          </g>
        </svg>
      )}
    </div>
  );
};
