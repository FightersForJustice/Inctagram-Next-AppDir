import { useEffect, useState } from 'react';
import { PostComment } from '../PostComment';
import { getPostComments } from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import { PostLikes } from '../PostLikes';
import { PostAmount } from '../PostAmount';
import { PostForm } from '../PostForm';
import { PostType } from '../../../types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { createComment, createLikeComment } from '@/app/lib/actions';

type ImagesType = {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
};

export type PostCommentType = {
  id: number;
  postId: number;
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
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Time.${key}`);
  const onCommentSubmit = async (data: {
    value: string;
    isAnswer: boolean;
  }) => {
    const res = await createComment({ content: data.value, id: postData.id });
    if (!res.success) {
      toast.error('Error');
    } else {
      fetchComments();
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
  const likeComment = async (commentId:number, isLiked: boolean) => {
    try {
      const likedPayload = isLiked ? 'NONE' : 'LIKE'
      const res = await createLikeComment({postId, commentId, likeStatus: likedPayload});
      fetchComments()
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

  return (
    <>
      {myComments?.map((el) => {
        return (
          <PostComment
            key={el.id}
            myProfile={myProfile}
            data={el}
            onLikeHandler={() => likeComment(el.id, !!el.likeCount)}
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
          />
        );
      })}
      {myProfile && <PostLikes />}
      <PostAmount postData={postData} postsLikes={postsData?.items} />
      {myProfile && <PostForm onSubmit={onCommentSubmit} />}
    </>
  );
};
