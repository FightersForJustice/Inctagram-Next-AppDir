import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

import { FiltersModal } from '@/components/Modals/FiltersModal';
import { useDeletePostImageMutation } from '@/api';
import { Loader } from '@/components/Loader';
import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { GetResponse } from '@/api/profile.api';
import { Carousel } from '@/components/Carousel/Carousel';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { createPost } from '@/app/lib/actions';

import s from './CreatePost.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  setShowCreatePostModal: (value: boolean) => void;
  userData: GetResponse;
};

export const FourthModal: React.FC<Props> = ({
  setStep,
  setShowCreatePostModal,
  userData,
}) => {
  const dispatch = useAppDispatch();

  const [textareaLength, setTextareaLength] = useState(0);
  const [textareaValue, setTextareaValue] = useState('');
  const [areYouSureModal, setAreYouSureModal] = useState(false);

  const [deleteImage, { isLoading: isDeleting }] = useDeletePostImageMutation();
  const images = useAppSelector((state) => state.post.postImages);
  const imagesUploadIds = useAppSelector((state) => state.post.postImagesIds);

  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length > 500) return;
    setTextareaLength(e.currentTarget.value.length);
    setTextareaValue(e.currentTarget.value);
  };

  const onPublishPost = async () => {
    const images = sessionStorage.getItem('userPostImage');
    if (!!images?.length) {
      const body = {
        description: textareaValue,
        childrenMetadata: [
          {
            uploadId: images,
          },
        ],
      };
      const res = await createPost(body);
      if (!res.success) {
        toast.error('Error');
      } else toast.success('Post created');

      dispatch(postActions.removeAllImages());
      dispatch(postActions.removeImageIds());
      dispatch(postActions.removeAllGalleryImages());
      setShowCreatePostModal(false);
    }
  };

  const onDeletePostImage = () => {
    imagesUploadIds.map((uploadId: any) => {
      if (uploadId.uploadId)
        deleteImage(uploadId.uploadId)
          .unwrap()
          .then(() => {
            toast.success('Post image deleted');
          });
    });
    dispatch(postActions.removeImageIds());
    setStep(3)
  };

  return (
    <>
      <FiltersModal
        title={'Publication'}
        width={'972px'}
        buttonName={'Publish'}
        onPublishPost={onPublishPost}
        onClose={() => setAreYouSureModal(true)}
        onDeletePostImage={onDeletePostImage}
      >
        <div className={s.cropping__publication}>
          <div className={s.cropping__publication__box}>
            <Carousel loadedImages={images} />
          </div>
          <div className={s.cropping__publication__container}>
            <div className={s.cropping__publication__header}>
              <Image
                src={`${
                  userData?.avatars[1]?.url ?? '/img/create-post/no-image.png'
                }`}
                alt={'image'}
                width={36}
                height={36}
                className={s.cropping__publication__image}
              />
              <p>{`${userData ? userData.userName : ''}`}</p>
            </div>
            <div>
              <div className={s.cropping__publication__wrapper}>
                <p className={s.cropping__publication__text}>
                  Add publication descriptions
                </p>
                <p
                  style={{
                    color: `${textareaLength > 499 ? 'red' : '#8D9094'}`,
                  }}
                >
                  {textareaLength} / 500
                </p>
              </div>
              <textarea
                cols={30}
                rows={10}
                className={s.cropping__publication__textarea}
                placeholder={'Description...'}
                maxLength={500}
                onChange={onTextareaHandler}
                value={textareaValue}
              />
            </div>
          </div>
        </div>
      </FiltersModal>
      {areYouSureModal && (
        <AreYouSureModal
          toggleAreYouSureModal={setAreYouSureModal}
          toggleModal={setShowCreatePostModal}
          onDelete={onDeletePostImage}
          isDeleting={isDeleting}
        />
      )}
      {isDeleting && <Loader />}
    </>
  );
};
