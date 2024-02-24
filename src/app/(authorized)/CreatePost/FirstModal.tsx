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
        <input
          ref={inputRef}
          multiple
          type="file"
          accept="image/*"
          className={s.createPost__fileInput}
          onChange={onSetUserAvatar}
        />

        <PrimaryBtn
          className={s.button}
          onClick={() => inputRef.current?.click()}
        >
          {translate('selectBtn')}
        </PrimaryBtn>
        <TransparentBtn className={s.button}>
          {translate('openDraftBtn')}
        </TransparentBtn>
      </div>
    </Modal>
  );
};
