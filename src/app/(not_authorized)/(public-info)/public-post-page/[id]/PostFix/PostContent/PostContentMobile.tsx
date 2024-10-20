import Image from 'next/image';

import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';

import s from './PostContent.module.scss';
import { useEffect, useState } from 'react';
import { Carousel } from '@/components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import { PostModal } from '@/components/Modals/PostModal';
import PostHeader from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/PostHeader/PostHeader';
import { PostComment } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/PostContent/PostComment';
import { PostLikes } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/PostContent/PostLikes';
import { PostAmount } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/PostContent/PostAmount';
import { useGetLanguage } from '@/redux/hooks/useGetLanguage';
import { useTranslation } from 'react-i18next';
import { formatServerDateWithoutTime, getTimeAgoText } from '@/utils';
import {
  PostLikesDataType,
  PostType,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { getLikesPostId, updateLikesPostId } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import { useDispatch } from 'react-redux';
import { ProfilePostActions } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import { Loader } from '@/components/Loader';


type Props = {
  type?: 'publicPage' | 'publicProfile';
  post: PostType;
  myProfile: boolean;
  closeModalAction: () => void;
  setEditPost: (value: boolean) => void;
  onDeletePost: () => void;
};

export const PostContentMobile = ({
                                    post,
                                    closeModalAction,
                                    myProfile,
                                    setEditPost,
                                    onDeletePost,
                                    type,
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
    const data: PostLikesDataType = await getLikesPostId(post.id);
    setLocalIsLiked(null)
    setLocalLikesCount(null)
    dispatch(ProfilePostActions.updateLikesById({
      postId: post.id,
      isLiked: data.isLiked,
      likesCount: data.totalCount
    }));
    setLikesData(data)
  };

  useEffect(() => {
    if (type) return
    fetchLikes()
  }, [])

  const toggleLike = async () => {
    if (likesData) {
      setLocalIsLiked(!likesData.isLiked)
      setLocalLikesCount(likesData.isLiked ? likesData.totalCount - 1 : likesData.totalCount + 1)
      const response = await updateLikesPostId(post.id, likesData.isLiked);
      fetchLikes()
    }
  }

  const avatarLikes = likesData?.items.slice(-3).reverse()

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
        <PostHeader post={post} myProfile={myProfile} setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup} setEditPost={setEditPost}
                    setShowAreYouSureModal={setShowAreYouSureModal}/>
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
        {!type && <PostLikes toggleLike={toggleLike} isLiked={localIsLiked ?? (likesData?.isLiked || false)} />}
        <PostAmount  likes={localLikesCount ?? (likesData?.totalCount || 0)} avatarLikes={avatarLikes} date={date}/>
        <div className={s.postInfo}>
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
          <PostComment myProfile={myProfile} />
          <PostComment myProfile={myProfile} />
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
