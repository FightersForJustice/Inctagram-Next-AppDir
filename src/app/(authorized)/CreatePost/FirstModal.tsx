import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';

import { Modal } from '@/components/Modals/Modal';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { useTranslation } from 'react-i18next';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';

import s from './CreatePost.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  setImage: (image: File[]) => void;
  setShowCreatePostModal: (value: boolean) => void;
  images: File[];
};
export const FirstModal = ({
  setStep,
  images,
  setImage,
  setShowCreatePostModal,
}: Props) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const translate = (key: string): string =>
    t(`SettingsProfilePage.AddPhotoModal.${key}`);

  const onSetUserAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = [...e.target.files];

    files.forEach((file) => {
      images.push(file);
      dispatch(
        postActions.addImage({
          id: crypto.randomUUID(),
          image: URL.createObjectURL(file),
        })
      );
    });

    setImage(images);

    setStep(2);
  };

  return (
    <Modal
      title={translate('title')}
      className={s.firstModal}
      onClose={() => setShowCreatePostModal(false)}
    >
      <div className={s.createPost}>
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
                onChange={onSetUserAvatar}
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
