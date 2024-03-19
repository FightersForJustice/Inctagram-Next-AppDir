import { ChangeEvent, useEffect, useState } from 'react';
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
import { Dots } from '@/app/(authorized)/profile/[id]/PostFix/Dots';
import { DotsFriends } from '@/app/(authorized)/profile/[id]/PostFix/DotsFriends';
import { Carousel } from '@/components/Carousel/Carousel';
import { ImageType, PostResponse } from '@/api/posts.api';
import { SwiperSlide } from 'swiper/react';

type Props = {
  setEditPost: (value: boolean) => void;
  description: string;
  postId: number | undefined;
  avatar: string;
  userName: string;
  images: ImageType[]
  // isPostChanged: (value: boolean) => void;
  // setShowDots: (value: boolean) => void;
};

export const EditPost = ({
                           setEditPost,
                           description,
                           userName, avatar, images,
                           // isPostChanged,
                           postId,
                           // setShowDots,
                         }: Props) => {
  const [textareaValue, setTextareaValue] = useState(description);
  // useEffect(() => {
  //   isPostChanged(textareaValue !== description);
  // }, [textareaValue, description, isPostChanged]);
  const accessToken = Cookies.get('accessToken');

  const [updatePost, { isLoading }] = useUpdatePostMutation();

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
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`CreatePost.EditPost.${key}`);

  console.log('accessToken', accessToken);

  return (
    <>
      <div className={s.editTitle}>
        <h1>Edit Post</h1>
        {/*{showCloseEditModal && isPostChanged &&*/}
        {/*  <EditPostModal title={translate('title')}*/}
        {/*                 onSubmit={() => {*/}
        {/*                 }}*/}
        {/*    // onSubmit={changeEditStatus}*/}
        {/*    // onClose={onCloseEditMode}*/}
        {/*                 onClose={() => {*/}
        {/*                 }}*/}
        {/*  >{translate('editModalText')}</EditPostModal>*/}
        {/*}*/}
        <Image
          // onClick={onCloseClick}
          src={close} alt={'close'} className={s.editCancel} />
      </div>
      <div className={s.post}>

        <Carousel>
          {images.map((i, index) => {
            if (i.width !== 640) {
              return (
                <SwiperSlide key={index} className={'w-full'}>
                  {/* <img src={i.url} alt={'err'} /> */}
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
        {/*</div>*/}
        <div>

          <div className={s.post__header}>
            <div className={s.post__header__user}>
              <Image
                src={avatar ?? '/img/create-post/no-image.png'}
                alt={'ava'}
                width={36}
                height={36}
                className={s.header__img}
              />
              <span>{userName}</span>
            </div>
          </div>
          <p className={s.post__title}>Add publication descriptions</p>
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
            <PrimaryBtn onClick={onSave}>Save Changes</PrimaryBtn>
          </div>
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};
