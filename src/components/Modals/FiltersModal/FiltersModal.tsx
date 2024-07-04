import Image from 'next/image';
import {
  Dispatch,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import { toast } from 'react-toastify';

import { uploadPostImage } from '@/app/lib/actions';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { ChangedImage } from '@/redux/reducers/post/postReducer';
import { applyImageFilter } from '@/utils';
import { dataURLToBlob } from '@/utils/dataUrlToBlob';

import './FiltersModal.scss';
import { useTranslation } from 'react-i18next';

type ImageData = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  uploadId: string;
};

type Props = {
  setStep?: Dispatch<SetStateAction<number>>;
  title: string;
  onClose?: () => void;
  buttonName: string;
  showSecondModal?: () => void;
  showFourthModal?: () => void;
  onPublishPost?: () => void;
  onDeletePostImage?: () => void;
  changedPostImage?: MutableRefObject<any>;
  zoomValue?: string;
};

export const FiltersModal = ({
  onClose,
  title,
  children,
  buttonName,
  setStep,
  onPublishPost,
  onDeletePostImage,
  zoomValue,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();

  const translate = (key: string): string =>
    t(`SettingsProfilePage.AddPhotoModal.${key}`);

  const images: ChangedImage[] = useAppSelector(
    (state) => state.post.changedImages
  );
  const onSendPostImage = () => {
    if (images) {
      const formData = new FormData();

      images.map(({ image, id, filter }) => {
        const imageRef = document.createElement('img');
        imageRef.src = image;
        imageRef.alt = 'err';
        imageRef.width = 490;
        imageRef.height = 503;

        const photoEditingBeforeSending = applyImageFilter(
          imageRef,
          filter,
          `4:4`,
          zoomValue!
        );

        formData.append('file', dataURLToBlob(photoEditingBeforeSending), id);
      });

      uploadPostImage(formData)
        .then(async (res: { success: boolean; data: ImageData[] }) => {
          if (res.success) {
            sessionStorage.setItem(
              'userPostImage',
              JSON.stringify(
                res.data
                  .filter((photo) => photo.height !== 360)
                  .map((item) => item.uploadId)
              )
            );
            setStep?.(4);
          }
        })
        .catch((err: any) => {
          console.log(err.data);
          toast.error(err.data); //translate after
        });
    }
  };
  // const returnToSecondModal = (images: ImageStateType[]) => {
  //   images.forEach((image, index) => {
  //     const idToRemove = image.id;
  //     dispatch(postActions.removeGalleryImage({ id: idToRemove }));
  //     if (index === images.length - 1) {
  //       setStep?.(2);
  //     }
  //   });
  // };
  const returnToSecondModal = () => {
    setStep?.(2);
  };
  return (
    <>
      <div className={'modal'} onClick={onClose}>
        <div className={'modal__content1'} onClick={(e) => e.stopPropagation()}>
          <div className={'modal__header'}>
            <Image
              src={'/img/create-post/arrow-back.svg'}
              alt={'arrow-back'}
              width={24}
              height={24}
              className={'modal__arrow'}
              onClick={() =>
                buttonName === translate('publish')
                  ? onDeletePostImage?.()
                  : returnToSecondModal()
              }
            />
            <div className={'modal__title'}>{title}</div>
            <button
              className={'modal__next'}
              onClick={() =>
                buttonName === translate('nextBtn')
                  ? onSendPostImage()
                  : onPublishPost?.()
              }
            >
              {buttonName}
            </button>
          </div>
          <div className={'modal__body1'}>{children}</div>
        </div>
      </div>
    </>
  );
};
