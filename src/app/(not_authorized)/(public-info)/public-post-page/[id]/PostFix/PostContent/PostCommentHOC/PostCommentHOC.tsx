import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { PostComment } from '../PostComment';
import { getPostComments } from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import { PostLikes } from '../PostLikes';
import { FollowerType, PostType } from '../../../types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  createAnswerComment,
  createComment,
  createLikeAnswerComment,
  createLikeComment,
} from '@/app/lib/actions';
import s from '../PostContent.module.scss';
import { PostAmount } from '../PostAmount';

type ImagesType = {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
};

export type PostCommentType = {
  id: number;
  postId?: number;
  commentId?: number;
  from: {
    id: number;
    username: string;
    avatars: Array<ImagesType>; // Assuming avatars is an array of objects
  };
  content: string;
  createdAt: string;
  answerCount: number;
  likeCount: number;
  isLiked: boolean;
};

interface PostCommentsResponse {
  pageSize: number;
  totalCount: number;
  items: PostCommentType[];
}
type CommentsHOCType = {
  myProfile: boolean;
  postData: PostType;
  postId: number;
  myId: number;
  toggleLike: () => void;
  isLiked: boolean;
  type?: 'publicPage' | 'publicProfile' | 'admin';
  likes: number;
  avatarLikes?: FollowerType[];
  date?: string;
  openLikesModal: () => void;
};

export const PostCommentHOC = ({
  myProfile,
  postId,
  myId,
  postData,
  toggleLike,
  likes,
  type,
  avatarLikes,
  date,
  openLikesModal,
  isLiked,
}: CommentsHOCType) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [postsData, setData] = useState<PostCommentsResponse>();
  const [submit, setSubmit] = useState(false);
  const [answerTo, setAnsverTo] = useState(0);
  const [commentAuthors, setAuthors] = useState(['']);
  const ref = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Time.${key}`);
  const translatePostForm = (key: string): string =>
    t(`CreatePost.EditPost.${key}`);
  const onCommentSubmit = async () => {
    if (value.length) {
      const tempValue = value.split(',')[0];
      const currentUser = tempValue.split('@')[1];
      if (answerTo && commentAuthors.includes(currentUser)) {
        await createAnswerComment({
          content: value,
          id: postData.id,
          commentId: answerTo,
        });
        fetchComments();
        setSubmit(true);
        setValue('');
        setAnsverTo(0);
        toast.success(translate('publicationsCreated'));
        return;
      }
      const res = await createComment({ content: value, id: postData.id });
      setValue('');
      if (!res.success) {
        toast.error('Error');
      } else {
        fetchComments();
        setAnsverTo(0);
        toast.success(translate('publicationsCreated'));
      }
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getPostComments(postId);
      setData(res);
      setAuthors(res.items.map((el: any) => el.from.username));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };
  const likeComment = async (commentId: number, isLiked: boolean) => {
    try {
      const likedPayload = isLiked ? 'NONE' : 'LIKE';
      await createLikeComment({ postId, commentId, likeStatus: likedPayload });
      fetchComments();
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const likeAnswerComment = async (
    commentId: number,
    answerId: number,
    isLiked: boolean
  ) => {
    try {
      const likedPayload = isLiked ? 'NONE' : 'LIKE';
      await createLikeAnswerComment({
        postId,
        commentId,
        answerId,
        likeStatus: likedPayload,
      });
      fetchComments();
      setSubmit(true);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const myComments = postsData?.items.filter((el) => el.from.id === myId);
  const restComments = postsData?.items.filter((el) => el.from.id !== myId);

  const answerHandler = (id: number) => {
    ref.current?.focus();
    setAnsverTo(id);
    const tempValue = value.split(',')[0];
    const currentName = tempValue.split('@')[1];
    if (value.length && value.split(',') && currentName) {
      setValue(
        `to @${postsData?.items.filter((el) => el.id === id)[0].from
          .username},` + value.split(',')[1]
      );
      return;
    }
    setValue(
      `to @${postsData?.items.filter((el) => el.id === id)[0].from.username},` +
        value
    );
  };

  const sendComment = () => {
    if (value.trim() && value.length < 300) {
      onCommentSubmit();
      setValue('');
    }
  };

  const onInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      sendComment();
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <>
      {myComments?.map((el) => {
        return (
          <PostComment
            key={el.id}
            myProfile={myProfile}
            data={el}
            onLikeHandler={() => likeComment(el.id, !!el.likeCount)}
            onAnswerLikeHandler={(id, liked) =>
              likeAnswerComment(el.id, id, liked)
            }
            onAnswerHandler={() => answerHandler(el.id)}
            submit={submit}
            setSubmit={() => setSubmit(false)}
          />
        );
      })}
      {restComments?.map((el) => {
        return (
          <PostComment
            key={el.id}
            myProfile={myProfile}
            data={el}
            onLikeHandler={() => likeComment(el.id, !!el.likeCount)}
            onAnswerLikeHandler={(id, liked) =>
              likeAnswerComment(el.id, id, liked)
            }
            onAnswerHandler={() => answerHandler(el.id)}
            submit={submit}
            setSubmit={() => setSubmit(false)}
          />
        );
      })}
      {!type && (
        <PostLikes
          toggleLike={toggleLike}
          isLiked={isLiked}
        />
      )}
      {type !== 'admin' && (
        <PostAmount
          likes={likes}
          avatarLikes={avatarLikes}
          date={date}
          openLikesModal={openLikesModal}
        />
      )}
      {myProfile && (
        <div className={s.post__form}>
          <div className="flex w-full">
            <input
              ref={ref}
              className={s.post__form__input}
              value={value}
              type="text"
              onKeyUp={onInputChange}
              onChange={onChange}
              placeholder={translatePostForm('addComment') + '...'}
              style={{
                border: value.length > 300 ? '1px solid var(--danger-500)' : '',
              }}
            />
            <button
              className={
                !value.length ? s.post__form__disabled : s.post__form__btn
              }
              onClick={onCommentSubmit}
            >
              {translatePostForm('publish')}
            </button>
          </div>
          {value.length > 300 && (
            <span
              className="text-sm pt-1 font-light text-red"
              style={{ color: 'var(--danger-500)' }}
            >
              длина сообщения превышает 300 символов
            </span>
          )}
        </div>
      )}
    </>
  );
};
