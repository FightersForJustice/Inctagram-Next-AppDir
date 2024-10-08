import Image from 'next/image';

import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { PostComment } from './PostComment';
import { PostLikes } from './PostLikes';

import s from './PostContent.module.scss';
import { useEffect, useState } from 'react';
import { Carousel } from '@/components/Carousel/Carousel';
import { ImageType } from '@/api/posts.api';
import { SwiperSlide } from 'swiper/react';
import { PostModal } from '@/components/Modals/PostModal';
import PostHeader from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/PostHeader/PostHeader';
import { PostForm } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/PostContent/PostForm';
import { PostAmount } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/PostContent/PostAmount';
import { useGetLanguage } from '@/redux/hooks/useGetLanguage';
import { useTranslation } from 'react-i18next';
import { getTimeAgoText } from '@/utils';
import { PostLikesDataType, UserProfile } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { getLikesPostId, updateLikesPostId } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';


type Props = {
  user: UserProfile;
  description: string;
  myProfile: boolean;
  images: ImageType[];
  closeModalAction: () => void;
  setEditPost: (value: boolean) => void;
  onDeletePost: () => void;
  createdPostTime: string;
  postId: number,
};

export const PostContent = ({
  postId,
  description,
  user,
  closeModalAction,
  myProfile,
  images,
  setEditPost,
  onDeletePost,
  createdPostTime,

}: Props) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const [likesData, setLikesData] = useState<PostLikesDataType | null>(null);

  const language = useGetLanguage()

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Time.${key}`);
  const time = getTimeAgoText(createdPostTime, language, translate);


  const fetchLikes = async () => {
    const data: PostLikesDataType = await getLikesPostId(postId);
    setLikesData(data);
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  const toggleLike = async () => {
    if (likesData) {
      const response = await updateLikesPostId(postId, likesData.isLiked);
      fetchLikes();
    }
  }


  return (
      <PostModal
        width={'972px'}
        onClose={closeModalAction}
      >
      <div className={s.post}>
        <Carousel>
          {images.map((i, index) => {
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
                  {description}
                </p>
                <p className={s.post__desc__time}>{time}</p>
              </div>
            </div>
          </div>
          <PostComment myProfile={myProfile} />
          <PostComment myProfile={myProfile} />
          <PostComment myProfile={myProfile} />
          {/*{myProfile && <PostLikes  />}*/}
          <PostLikes  toggleLike={toggleLike} isLiked={likesData?.isLiked || false}/>
          <PostAmount  likes={likesData?.totalCount || 0}/>
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
