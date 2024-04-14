import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

import { GetResponse } from '@/api/profile.api';
import { createPost, deleteUploadedPostImage } from '@/app/lib/actions';
import { Carousel } from '@/components/Carousel/Carousel';
import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { FiltersModal } from '@/components/Modals/FiltersModal';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { postActions } from '@/redux/reducers/post/postReducer';
import s from './CreatePost.module.scss';
import { useTranslation } from 'react-i18next';
import { ProfilePostActions } from '@/redux/reducers/MyProfile/ProfilePostReducer';

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
  const { t } = useTranslation();

  const translate = (key: string): string =>
    t(`SettingsProfilePage.AddPhotoModal.${key}`);

  const dispatch = useAppDispatch();

  const [textareaValue, setTextareaValue] = useState('');
  const [areYouSureModal, setAreYouSureModal] = useState(false);

  const images = useAppSelector((state) => state.post.changedImages);
  const imagesUploaded = JSON.parse(
    sessionStorage.getItem('userPostImage') || ''
  );

  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length > 500) return;
    setTextareaValue(e.currentTarget.value);
  };

  const onPublishPost = async () => {
    const childrenMetadata = imagesUploaded.map((cloudUploadId: string) => {
      return {
        uploadId: cloudUploadId,
      };
    });

    if (!!images?.length) {
      const body = {
        description: textareaValue,
        childrenMetadata,
      };
      const res = await createPost(body);
      if (!res.success) {
        toast.error('Error');
      } else {
        toast.success(translate('publicationsCreated'));
        console.log(res.data);
        dispatch(ProfilePostActions.addFirstItems([res.data]));
      }
      dispatch(postActions.clearPostState());
      setShowCreatePostModal(false);
    }
  };

  const onDeletePostImage = async () => {
    try {
      const deletePromises = imagesUploaded.map((uploadId: number) =>
        deleteUploadedPostImage(uploadId)
      );

      await Promise.all(deletePromises);
    } catch (error) {
      console.error(error);
    }

    sessionStorage.removeItem('userPostImage');
    setStep(3);
  };

  return (
    <>
      <FiltersModal
        title={translate('publication')}
        buttonName={translate('publish')}
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
            <div className={s.cropping__publication__wrapper}>
              <p className={s.cropping__publication__text}>
                {translate('addPublicationDescriptions')}
              </p>
              <p
                style={{
                  color: `${textareaValue.length > 499 ? 'red' : '#8D9094'}`,
                }}
              >
                {textareaValue.length} / 500
              </p>
            </div>
            <textarea
              cols={30}
              rows={10}
              className={s.cropping__publication__textarea}
              placeholder={translate('description') + '...'}
              maxLength={500}
              onChange={onTextareaHandler}
              value={textareaValue}
            />
          </div>
        </div>
      </FiltersModal>
      {areYouSureModal && (
        <AreYouSureModal
          toggleAreYouSureModal={setAreYouSureModal}
          toggleModal={setShowCreatePostModal}
          onDelete={onDeletePostImage}
        />
      )}
    </>
  );
};
