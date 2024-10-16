import { ChangeEvent, useState } from 'react';
import close from 'public/img/close.svg';

import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { Loader } from '@/components/Loader';

import s from './EditPost.module.scss';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { EditPostModal } from '@/components/Modals/EditPostModal';
import Image from 'next/image';
import { Carousel } from '@/components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import { PostModal } from '@/components/Modals/PostModal';
import { PostType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';


type Props = {
  setEditPost: (value: boolean) => void;
  description: string;
  post: PostType;
  loading: boolean;
  onUpdatePost: (postId: number, textareaValue: string) => void;
};

export const EditPost = ({
                           setEditPost,
                           description,
                           post,
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
    if (accessToken && post.id) {
      onUpdatePost(post.id, textareaValue)
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
    <PostModal width={'972px'} onClose={closeModalAction}>
      <div className={s.editTitle}>
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
        <Image
          onClick={closeModalAction}
          src={close}
          alt={'close'}
          className={s.editCancel}
        />
      </div>
      <div className={s.post}>
        <Carousel>
          {post.images.map((i, index) => {
            if (i.width !== 640) {
              return (
                <SwiperSlide key={i.uploadId} className={'w-full'}>
                  {/* <img src={i.url} alt={'err'} /> */}
                  <Image width={491} height={491} alt="err" src={i.url} />
                </SwiperSlide>
              );
            }
          })}
        </Carousel>
        <div className={s.post__wrapper}>
          <div className={s.post__header}>
            <div className={s.post__header__user}>
              <Image
                src={post.avatarOwner ?? '/img/create-post/no-image.png'}
                alt={'ava'}
                width={36}
                height={36}
                className={s.post__header__img}
              />
              <span>{post.userName}</span>
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
            className={s.post__area__characters}
            style={{
              color: `${textareaValue.length > 499 ? 'red' : '#8D9094'}`,
            }}
          >
            {textareaValue.length} / 500
          </p>
          <div className={s.post__btn}>
            <PrimaryBtn onClick={onSave}>
              {translate('saveChanges')}
            </PrimaryBtn>
          </div>
        </div>
        {loading && <Loader />}
      </div>
    </PostModal>
  );
};
