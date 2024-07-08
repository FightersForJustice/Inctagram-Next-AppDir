import Image from 'next/image';

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Modal } from '@/components/Modals/Modal';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { ChangedImage, postActions } from '@/redux/reducers/post/postReducer';
import { useTranslation } from 'react-i18next';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { AreYouSureModal } from 'src/components/Modals/AreYouSureModal';
import { useAppSelector } from 'src/redux/hooks/useSelect';

import s from './CreatePost.module.scss';
import { AspectRatioType } from '@/app/(authorized)/CreatePost/CreatePost';
import { openDB } from 'idb';

type Props = {
  isDisabledBTN: boolean
  setStep: Dispatch<SetStateAction<number>>;
  setShowCreatePostModal: (value: boolean) => void;
  setIsDisabledDraft: (value: boolean) => void;
};

type PostDraftDB = {
  images: ChangedImage[];
  description: string;
};

export const FirstModal = ({ isDisabledBTN, setStep, setShowCreatePostModal, setIsDisabledDraft }: Props) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const changedImages = useAppSelector((state) => state.post.changedImages);
  const { t } = useTranslation();

  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<undefined | string>(undefined);
  const [postDraftDB, setPostDraftDB] = useState<PostDraftDB | null>(null);

  const translate = (key: string): string =>
    t(`CreatePost.AddPhotoModal.${key}`);

  const MAX_FILE_SIZE_MB = 20;

  const getPostDraft = async () => {
    const db = await openDB('post-store', 1, {
      upgrade(db) {
        db.createObjectStore('postDraft', { keyPath: 'id' });
      },
    });
    return await db.get('postDraft', 'draft');
  };

  useEffect(() => {
    const fetchPostDraft = async () => {
      const draft = await getPostDraft();
      setPostDraftDB(draft || null);
    };

    fetchPostDraft();
  }, []);

  const onOpenDraft = async () => {

    if (!postDraftDB) {
      return;
    }

    postDraftDB.images.forEach((image: ChangedImage) => {
      const base64Image = image.base64Image.split(',')[1];
      const binaryString = atob(base64Image);
      const bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));
      const imageData = new Blob([bytes], { type: 'image/png' });
      const url = URL.createObjectURL(imageData);

      image.image = url;
      image.originalImage = url;
    });

    dispatch(postActions.addImage(postDraftDB.images));
    dispatch(postActions.setDescription({ description: postDraftDB.description }));

    setStep(2);
  };

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onSetUserImage = async (e: ChangeEvent<HTMLInputElement>) => {
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
          `${translate('errorValidSize')} ${MAX_FILE_SIZE_MB} MB!`,
        );
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        return;
      }
    }

    const imagesWithBase64 = await Promise.all(
      files.map(async (file) => {
        const url = URL.createObjectURL(file);
        const base64 = await convertToBase64(file);
        return {
          id: crypto.randomUUID(),
          originalImage: url,
          image: url,
          base64Image: base64,
          filter: '',
          croppedArea: undefined,
          aspectRatio: AspectRatioType.one,
          zoom: 1,
        };
      }),
    );

    dispatch(postActions.addImage(imagesWithBase64));
    setStep(2);
  };

  const onCancelCreating = (value: boolean) => {
    setAreYouSureModal(value);
    setShowCreatePostModal(false);
  };

  const onCloseModal = () => {
    changedImages.length
      ? setStep(2)
      : setShowCreatePostModal(false);
  }

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
                isDisabled={postDraftDB === null || isDisabledBTN}
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
