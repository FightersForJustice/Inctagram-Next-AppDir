import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import close from 'public/img/close.svg';

import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { useUpdatePostMutation } from '@/api';
import { Loader } from '@/components/Loader';

import s from './EditPost.module.scss';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { EditPostModal } from '@/components/Modals/EditPostModal';
import Image from 'next/image';
import { Carousel } from '@/components/Carousel/Carousel';
import { ImageType } from '@/api/posts.api';
import { SwiperSlide } from 'swiper/react';
import { PostModal } from '@/components/Modals/PostModal';
import { UserProfile } from '@/app/(authorized)/profile/[id]/types';

type Props = {
  setEditPost: (value: boolean) => void;
  description: string;
  postId: number | undefined;
  user: UserProfile;
  images: ImageType[];
};

export const EditPost = ({
  setEditPost,
  description,
  user,
  images,
  postId,
}: Props) => {
  const [textareaValue, setTextareaValue] = useState(description);
  const { t } = useTranslation();
  const translate = (key: string): string => t(`CreatePost.EditPost.${key}`);
  const accessToken = Cookies.get('accessToken');

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [showCloseEditModal, setShowCloseEditModal] = useState(false);

  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaValue.length > 500) return;
    setTextareaValue(e.currentTarget.value);
  };
  const onSave = () => {
    if (accessToken) {
      updatePost({
        postId: postId!,
        description: textareaValue,
        accessToken: accessToken,
      })
        .unwrap()
        .then(() => {
          setEditPost(false);
          toast.success('Post was updated');
        });
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
            {images.map((i, index) => {
              if (i.width !== 640) {
                return (
                  <SwiperSlide key={index} className={'w-full'}>
                    {/* <img src={i.url} alt={'err'} /> */}
                    <Image width={491} height={491} alt="err" src={i.url} />
                  </SwiperSlide>
                );
              }
              return;
            })}
          </Carousel>
          {/*</div>*/}
          <div>
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
            <textarea
              className={s.post__textarea}
              cols={30}
              rows={10}
              maxLength={500}
              value={textareaValue}
              onChange={onTextareaHandler}
            />
            <p
              style={{
                color: `${textareaValue.length > 499 ? 'red' : '#8D9094'}`,
                textAlign: 'right',
                fontSize: '12px',
              }}
            >
              {textareaValue.length} / 500
            </p>
            <div className={s.post__btn}>
              <PrimaryBtn onClick={onSave}>
                {translate('saveChanges')}
              </PrimaryBtn>
            </div>
            {isLoading && <Loader />}
          </div>
        </div>
      </PostModal>
    </>
  );
};
