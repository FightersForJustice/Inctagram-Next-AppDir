import Image from 'next/image';

import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';

import { Modal } from '@/components/Modals/Modal';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { useTranslation } from 'react-i18next';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';

import s from './CreatePost.module.scss';
import { toast } from 'react-toastify';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  setShowCreatePostModal: (value: boolean) => void;
};
export const FirstModal = ({ setStep, setShowCreatePostModal }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const translate = (key: string): string =>
    t(`CreatePost.AddPhotoModal.${key}`);

  const MAX_FILE_SIZE_MB = 20;

  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );
  const onSetUserImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = [...e.target.files];

    const validImagesFormat = files.filter((file) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      return isJpgOrPng;
    });

    const validImagesSize = files.filter((file) => {
      const isSizeValid = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

      return isSizeValid;
    });

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
          filter: '',
          id: crypto.randomUUID(),
          image: URL.createObjectURL(file),
        }))
      )
    );

    setStep(2);
  };

  return (
    <Modal
      title={translate('title')}
      className={s.firstModal}
      onClose={() => setShowCreatePostModal(false)}
    >
      <div className={s.createPost}>
        {errorMessage && (
          <div className={s.error}>
            <span className={s.title}>{translate('error')}</span> {errorMessage}
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
              isDisabled
              tooltipText={translate('tooltipText')}
            >
              {translate('openDraftBtn')}
            </TransparentBtn>
          </div>
        </div>
      </div>
    </Modal>
  );
};
