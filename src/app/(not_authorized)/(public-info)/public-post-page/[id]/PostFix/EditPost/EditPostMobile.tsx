import { ChangeEvent, useState } from 'react';

import { Loader } from '@/components/Loader';

import Cookies from 'js-cookie';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { EditPostModal } from '@/components/Modals/EditPostModal';
import { Carousel } from '@/components/Carousel/Carousel';
import { ImageType } from '@/api/posts.api';
import { SwiperSlide } from 'swiper/react';
import { PostModal } from '@/components/Modals/PostModal';

import s from './EditPost.module.scss';
import { UserProfile } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

type Props = {
  setEditPost: (value: boolean) => void;
  description: string;
  postId: number | undefined;
  user: UserProfile;
  images: ImageType[];
  loading: boolean
  onUpdatePost: (postId: number, textareaValue: string) => void
};

export const EditPostMobile = ({
                                 setEditPost,
                                 description,
                                 user,
                                 images,
                                 postId,
                                 loading,
                                 onUpdatePost
                               }: Props) => {
  const [textareaValue, setTextareaValue] = useState(description);
  const { t } = useTranslation();
  const translate = (key: string): string => t(`CreatePost.EditPost.${key}`);
  const accessToken = Cookies.get('accessToken');
  const [showCloseEditModal, setShowCloseEditModal] = useState(false);


  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaValue.length > 500) return;
    setTextareaValue(e.currentTarget.value);
  };

  const onSave = () => {
    if (accessToken && postId) {
      onUpdatePost(postId, textareaValue)
    }
  };

  const onExitFromEdit = () => {
    setEditPost(false);
    setShowCloseEditModal(false);
  };

  const onCancelCloseEdit = () => {
    setShowCloseEditModal(false);
  };

  const closeModalAction = () => {
    if (description === textareaValue) {
      setEditPost(false);
    } else {
      setShowCloseEditModal(true);
    }
  };

  return (
    <>
      <PostModal width={'972px'} onClose={closeModalAction}>
        <div className={s.post}>
          <div className={s.editTitle}>
            <button
              onClick={closeModalAction} className={s.editCancel}>
              <h3>{translate('Сancel')}</h3>
            </button>
            <h1>{translate('editPost')}</h1>
            {showCloseEditModal && (
              <EditPostModal
                title={translate('title')}
                onSubmit={onExitFromEdit}
                onClose={onCancelCloseEdit}
              >
                {translate('editModalText')}
              </EditPostModal>
            )}
            <button onClick={onSave} className={s.editCancel}>
              <h3>{translate('save')}</h3>
            </button>
          </div>
          <Carousel>
            {images.map((i, index) => {
              if (i.width !== 640) {
                return (
                  <SwiperSlide key={index} className={'w-full'}>
                    <Image width={491} height={491} alt="err" src={i.url} />
                  </SwiperSlide>
                );
              }
              return;
            })}
          </Carousel>
          <div className={s.post__wrapper}>
            <div className={s.post__header}>
              <div className={s.post__header__user}>
                <Image
                  src={user?.avatars[0]?.url ?? '/img/create-post/no-image.png'}
                  alt={'ava'}
                  width={36}
                  height={36}
                  className={s.header__img}
                />
                <span>{user?.userName}</span>
              </div>
            </div>
            <p className={s.post__title}>
              {translate('addPublicationDescriptions')}
            </p>
            <div className={s.post__area}>
            <textarea
              className={s.post__textarea}
              cols={30}
              rows={10}
              maxLength={500}
              value={textareaValue}
              onChange={onTextareaHandler}
            />
            </div>
            <p
              style={{
                color: `${textareaValue.length > 499 ? 'red' : '#8D9094'}`,
                textAlign: 'right',
                fontSize: '12px',
                padding: '0 24px',
              }}
            >
              {textareaValue.length} / 500
            </p>
          </div>
          {loading && <Loader />}
        </div>
      </PostModal>
    </>
  );
};
