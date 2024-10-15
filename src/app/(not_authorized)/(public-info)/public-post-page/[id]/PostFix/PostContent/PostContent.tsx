import Image from 'next/image';
import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { PostComment } from './PostComment';
import { PostLikes } from './PostLikes';
import { useEffect, useState } from 'react';
import { Carousel } from '@/components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import { PostModal } from '@/components/Modals/PostModal';
import PostHeader from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/PostHeader/PostHeader';
import { PostForm } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/PostContent/PostForm';
import { PostAmount } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/PostContent/PostAmount';
import { useGetLanguage } from '@/redux/hooks/useGetLanguage';
import { useTranslation } from 'react-i18next';
import { formatServerDateWithoutTime, getTimeAgoText } from '@/utils';
import {
  PostLikesDataType,
  PostType,
  UserProfile,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { getLikesPostId, updateLikesPostId } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import { ProfilePostActions } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import { useDispatch } from 'react-redux';

import s from './PostContent.module.scss';
import { Loader } from '@/components/Loader';

type Props = {
  type?: 'publicPage' | 'publicProfile';
  post: PostType;
  myProfile: boolean;
  closeModalAction: () => void;
  setEditPost: (value: boolean) => void;
  onDeletePost: () => void;
};

export const PostContent = ({
  type,
  post,
  closeModalAction,
  myProfile,
  setEditPost,
  onDeletePost,
}: Props) => {
  const dispatch = useDispatch()
  const [visiblePopup, setVisiblePopup] = useState(false)
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false)
  const [likesData, setLikesData] = useState<PostLikesDataType | null>(null)
  const [localIsLiked, setLocalIsLiked] = useState<boolean | null>(post.isLiked)
  const [localLikesCount, setLocalLikesCount] = useState<number | null>(post.likesCount)

  const language = useGetLanguage()

  const { t } = useTranslation()
  const translate = (key: string): string => t(`Time.${key}`)
  const time = getTimeAgoText(post.createdAt, language, translate)
  const date = formatServerDateWithoutTime(post.createdAt, language)

  const fetchLikes = async () => {
    const data: PostLikesDataType = await getLikesPostId(post.id)
    setLocalIsLiked(null)
    setLocalLikesCount(null)
    dispatch(ProfilePostActions.updateLikesById({
      postId: post.id,
      isLiked: data.isLiked,
      likesCount: data.totalCount
    }))
    setLikesData(data)
  };

  useEffect(() => {
    if (type === 'publicPage') return
    fetchLikes()
  }, [])

  const toggleLike = async () => {
    if (likesData) {
      setLocalIsLiked(!likesData.isLiked)
      setLocalLikesCount(likesData.isLiked ? likesData.totalCount - 1 : likesData.totalCount + 1)
      const response = await updateLikesPostId(post.id, likesData.isLiked);
      fetchLikes();
    }
  }

  const avatarLikes = likesData?.items.slice(0, 3)

  if (!likesData && !type) {
    return (
      <Loader/>
    )
  }

  return (
      <PostModal
        width={'972px'}
        onClose={closeModalAction}
      >
      <div className={s.post}>
        <Carousel>
          {post.images.map((i) => {
            if (i.width !== 640) {
              return (
                <SwiperSlide key={i.uploadId}>
                  <Image
                    width={491}
                    height={491}
                    alt="err"
                    src={i.url}
                  />
                </SwiperSlide>
              );
            }
          })}
        </Carousel>
        <div className={s.postInfo}>
          <PostHeader post={post} myProfile={myProfile} setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup}
                      setEditPost={setEditPost}
                      setShowAreYouSureModal={setShowAreYouSureModal} />
          <div className={s.post__content}>
            <div className={s.post__desc}>
              <Image
                src={post.avatarOwner ?? '/img/create-post/no-image.png'}
                alt={'ava'}
                width={36}
                height={36}
                className={s.post__avatar}
              />
              <div>
                <p className={s.post__desc__text}>
                  <span className={s.post__desc__name}>{post.userName} </span>
                  {post.description}
                </p>
                <p className={s.post__desc__time}>{time}</p>
              </div>
            </div>
          </div>
          <PostComment myProfile={myProfile} />
          <PostComment myProfile={myProfile} />
          <PostComment myProfile={myProfile} />
          {!type && <PostLikes toggleLike={toggleLike} isLiked={localIsLiked ?? (likesData?.isLiked || false)} />}
          <PostAmount  likes={localLikesCount ?? (likesData?.totalCount || 0)} avatarLikes={avatarLikes} date={date}/>
          {myProfile && <PostForm />}
          {showAreYouSureModal && (
            <AreYouSureModal
              toggleAreYouSureModal={setShowAreYouSureModal}
              toggleModal={setVisiblePopup}
              onYes={onDeletePost}
              type={'deletePostPost'}
            />
          )}
        </div>
      </div>
      </PostModal>
  );
};
