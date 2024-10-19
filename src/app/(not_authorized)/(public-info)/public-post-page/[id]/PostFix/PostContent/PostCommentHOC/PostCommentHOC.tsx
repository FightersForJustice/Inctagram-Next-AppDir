import { useEffect, useState } from 'react';
import { PostComment } from '../PostComment';
import { getPostAnswerComments, getPostComments } from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import { PostLikes } from '../PostLikes';
import { PostAmount } from '../PostAmount';
import { PostForm } from '../PostForm';
import { PostType } from '../../../types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  createAnswerComment,
  createComment,
  createLikeComment,
} from '@/app/lib/actions';

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
};

export const PostCommentHOC = ({
  myProfile,
  postId,
  myId,
  postData,
}: CommentsHOCType) => {
  const [loading, setLoading] = useState(true);
  const [postsData, setData] = useState<PostCommentsResponse>();
  const [answerData, setAnswerData] = useState();
  const [answerTo, setAnsverTo] = useState(0);
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Time.${key}`);
  const onCommentSubmit = async (data: {
    value: string;
    isAnswer: boolean;
  }) => {
    if (answerTo) {
      await createAnswerComment({
        content: data.value,
        id: postData.id,
        commentId: answerTo,
      });
      fetchComments();
      setAnsverTo(0);
      toast.success(translate('publicationsCreated'));
      return
    }
    const res = await createComment({ content: data.value, id: postData.id });
    if (!res.success) {
      toast.error('Error');
    } else {
      fetchComments();
      setAnsverTo(0);
      toast.success(translate('publicationsCreated'));
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getPostComments(postId);
      setData(res);
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

  useEffect(() => {
    fetchComments();
  }, []);

  const myComments = postsData?.items.filter((el) => el.from.id === myId);
  const restComments = postsData?.items.filter((el) => el.from.id !== myId);
  console.log(answerTo)
  return (
    <>
      {myComments?.map((el) => {
        return (
          <PostComment
            key={el.id}
            myProfile={myProfile}
            data={el}
            onLikeHandler={() => likeComment(el.id, !!el.likeCount)}
            onAnswerHandler={() => setAnsverTo(el.id)}
            answers={answerData?.items.filter(el => el.commentId === el.id)}
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
            onAnswerHandler={() => setAnsverTo(el.id)}
            answers={answerData?.items.filter(el => el.commentId === el.id)}
          />
        );
      })}
      {myProfile && <PostLikes />}
      <PostAmount postData={postData} postsLikes={postsData?.items} />
      {myProfile && (
        <PostForm
          onSubmit={onCommentSubmit}
          answerTo={
            answerTo
              ? postsData?.items.filter((el) => el.id === answerTo)[0].from
                  ?.username
              : ''
          }
        />
      )}
    </>
  );
};
