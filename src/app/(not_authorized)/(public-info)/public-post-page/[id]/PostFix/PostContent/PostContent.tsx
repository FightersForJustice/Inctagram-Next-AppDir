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
import { getTimeAgoText } from '@/utils';
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
  post: PostType;
  user: UserProfile;
  myProfile: boolean;
  closeModalAction: () => void;
  setEditPost: (value: boolean) => void;
  onDeletePost: () => void;
};

export const PostContent = ({
  post,
  user,
  closeModalAction,
  myProfile,
  setEditPost,
  onDeletePost,
}: Props) => {
  const dispatch = useDispatch();
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const [likesData, setLikesData] = useState<PostLikesDataType | null>(null);
  const [localIsLiked, setLocalIsLiked] = useState<boolean | null>(post.isLiked);
  const [localLikesCount, setLocalLikesCount] = useState<number | null>(post.likesCount);

  const language = useGetLanguage()

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Time.${key}`);
  const time = getTimeAgoText(post.createdAt, language, translate);

  const fetchLikes = async () => {
    const data: PostLikesDataType = await getLikesPostId(post.id);
    setLocalIsLiked(null)
    setLocalLikesCount(null)
    dispatch(ProfilePostActions.updateLikesById({
      postId: post.id,
      isLiked: data.isLiked,
      likesCount: data.totalCount
    }));
    setLikesData(data);
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  const toggleLike = async () => {
    if (likesData) {
      setLocalIsLiked(!likesData.isLiked)
      setLocalLikesCount(likesData.isLiked ? likesData.totalCount - 1 : likesData.totalCount + 1)
      const response = await updateLikesPostId(post.id, likesData.isLiked);
      fetchLikes();
    }
  }

  const avatarLikes = likesData?.items.slice(0, 3)

  if (!likesData) {
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
          {post.images.map((i, index) => {
            if (i.width !== 640) {
              return (
                <SwiperSlide key={index}>
                  <Image
                    width={491}
                    height={491}
                    alt="err"
                    src={i.url}
                  />
                </SwiperSlide>
              );
            }
            return;
          })}
        </Carousel>
        <div className={s.postInfo}>
          <PostHeader user={user} myProfile={myProfile} setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup}
                      setEditPost={setEditPost}
                      setShowAreYouSureModal={setShowAreYouSureModal} />
          <div className={s.post__content}>
            <div className={s.post__desc}>
              <Image
                src={user?.avatars[0]?.url ?? '/img/create-post/no-image.png'}
                alt={'ava'}
                width={36}
                height={36}
                className={s.post__avatar}
              />
              <div>
                <p className={s.post__desc__text}>
                  <span className={s.post__desc__name}>{user?.userName} </span>
                  {post.description}
                </p>
                <p className={s.post__desc__time}>{time}</p>
              </div>
            </div>
          </div>
          <PostComment myProfile={myProfile} />
          <PostComment myProfile={myProfile} />
          <PostComment myProfile={myProfile} />
          {/*{myProfile && <PostLikes  />}*/}
          <PostLikes  toggleLike={toggleLike} isLiked={localIsLiked !== null ? localIsLiked : (likesData?.isLiked || false)}/>
          <PostAmount  likes={localLikesCount !== null ? localLikesCount : (likesData?.totalCount || 0)} avatarLikes={avatarLikes}/>
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
