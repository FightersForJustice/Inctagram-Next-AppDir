import Image from 'next/image';

import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';

import { Modal } from '@/components/Modals/Modal';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { useTranslation } from 'react-i18next';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { AreYouSureModal } from 'src/components/Modals/AreYouSureModal';
import { useAppSelector } from 'src/redux/hooks/useSelect';

import s from './CreatePost.module.scss';
import { AspectRatioType } from '@/app/(authorized)/CreatePost/CreatePost';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  setShowCreatePostModal: (value: boolean) => void;
};
export const FirstModal = ({ setStep, setShowCreatePostModal }: Props) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const changedImages = useAppSelector((state) => state.post.changedImages);
  const { t } = useTranslation();
  const postDraftString = localStorage.getItem('postDraft')

  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<undefined | string>(undefined);

  const translate = (key: string): string =>
    t(`CreatePost.AddPhotoModal.${key}`);

  const MAX_FILE_SIZE_MB = 20;

  const onOpenDraft = () => {
    if (postDraftString !== null) {
      const postDraft = JSON.parse(postDraftString)

      dispatch(postActions.addImage(postDraft.images))
      dispatch(postActions.setDescription({description: postDraft.description}))

      setStep(2);
    }
  }

  const onSetUserImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = [...e.target.files];

    const validImagesFormat = files.filter((file) => file.type === 'image/jpeg' || file.type === 'image/png');

    const validImagesSize = files.filter((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024);

    if (validImagesFormat.length !== files.length) {
      setErrorMessage(translate('errorValidFormat'));
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      return;
    } else {
      if (validImagesSize.length !== files.length) {
        setErrorMessage(
          `${translate('errorValidSize')} ${MAX_FILE_SIZE_MB} MB!`
        );
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        return;
      }
    }

    dispatch(
      postActions.addImage(
        files.map((file) => ({
          id: crypto.randomUUID(),
          originalImage: URL.createObjectURL(file),
          image: URL.createObjectURL(file),
          filter: '',
          croppedArea: undefined,
          aspectRatio: AspectRatioType.one,
          zoom: 1,
        }))
      )
    );

    setStep(2);
  };

  const onCancelCreating = (value: boolean) => {
    setAreYouSureModal(value);
    setShowCreatePostModal(false);
  };

  const onCloseModal = () => {
    changedImages.length
      ? setAreYouSureModal(true)
      : setShowCreatePostModal(false);
  };

  return (
    <>
      <Modal
        title={translate('title')}
        className={s.firstModal}
        onClose={onCloseModal}
      >
        <div className={s.createPost}>
          {errorMessage && (
            <div className={s.error}>
              <span className={s.title}>{translate('error')}</span>{' '}
              {errorMessage}
            </div>
          )}

          <Image
            src={'/img/create-post/no-image.png'}
            alt={'no-image'}
            width={222}
            height={228}
            className={s.createPost__image}
          />

          <div className={s.createPostButtonsContainer}>
            <div className={s.createPost__select}>
              <label htmlFor="download_image" className={s.createPost__overlay}>
                <PrimaryBtn
                  onClick={() => inputRef.current?.click()}
                  isInsideLabel
                  isFullWidth
                >
                  {translate('selectBtn')}
                </PrimaryBtn>
                <input
                  ref={inputRef}
                  accept="image/*"
                  multiple
                  id="download_image"
                  type="file"
                  className={s.createPost__file}
                  onChange={onSetUserImage}
                />
              </label>
            </div>
            <div className={s.createPost__open}>
              <TransparentBtn
                isFullWidth
                onClick={onOpenDraft}
                isDisabled={postDraftString === null}
              >
                {translate('openDraftBtn')}
              </TransparentBtn>
            </div>
          </div>
        </div>
      </Modal>
      {areYouSureModal && (
        <AreYouSureModal
          toggleAreYouSureModal={setAreYouSureModal}
          toggleModal={onCancelCreating}
          type={'cancelCreating'}
        />
      )}
    </>
  );
};
