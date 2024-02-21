import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { Modal } from '@/components/Modals/Modal';
import { ImageStateType } from './CreatePost';
import { postActions } from '@/redux/reducers/post/postReducer';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { useTranslation } from 'react-i18next';

import s from './CreatePost.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<number>>
  setFile: (file: File[]) => void;
  setShowCreatePostModal: (value: boolean) => void;
  setLoadedImages: Dispatch<SetStateAction<ImageStateType[]>>;
  loadedImages: ImageStateType[];
  currentFile?: File[];
};
export const FirstModal = ({
  setStep,
  currentFile,
  setFile,
  setShowCreatePostModal,
  loadedImages,
}: Props) => {
  const dispatch = useAppDispatch();
  const id = crypto.randomUUID();

  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.AddPhotoModal.${key}`);

  const onSetUserAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (currentFile) {
      let newArr = currentFile;
      newArr.push(file);
      setFile(newArr);
    } else {
      setFile([file]);
    }

    let newImagesArr: any = loadedImages;
    newImagesArr.push({ id, image: URL.createObjectURL(file) });

    dispatch(postActions.addImage({ id, image: URL.createObjectURL(file) }));
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
        <div className={s.createPost__select}>
          <input
            type="file"
            className={s.createPost__file}
            onChange={onSetUserAvatar}
          />
          <div className={s.createPost__overlay}>
            <PrimaryBtn>{translate('selectBtn')}</PrimaryBtn>
          </div>
        </div>
        <div className={s.createPost__open}>
          <TransparentBtn>{translate('openDraftBtn')}</TransparentBtn>
        </div>
      </div>
    </Modal>
  );
};
