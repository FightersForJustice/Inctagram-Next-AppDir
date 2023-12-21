import { MutableRefObject, PropsWithChildren } from 'react';
import { toast } from 'react-toastify';

import { useUploadPostImageMutation } from '@/api';
import { Loader } from '../../Loader/Loader';
import { applyImageFilter } from '@/utils';
import { dataURLToBlob } from '@/utils/dataUrlToBlob';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { postImages } from '@/redux/reducers/post/postSelectors';
import { ImageStateType } from '@/app/[locale]/my-profile/CreatePost/CreatePost';

import './FiltersModal.css';

export const FiltersModal: React.FC<PropsWithChildren<Props>> = ({
  onClose,
  title,
  width,
  children,
  buttonName,
  showSecondModal,
  showFourthModal,
  onPublishPost,
  onDeletePostImage,
  zoomValue,
}) => {
  const [uploadPostImage, { isLoading }] = useUploadPostImageMutation();
  const dispatch = useAppDispatch();
  const images: ImageStateType[] = useAppSelector(postImages);
  const onSendPostImage = () => {
    if (images) {
      images.map(({ image, id, filter }) => {
        const imageRef = document.createElement('img');
        imageRef.src = image;
        imageRef.alt = 'err';
        imageRef.width = 490;
        imageRef.height = 503;

        const photoEditingBeforeSending = applyImageFilter(
          imageRef,
          filter,
          `4:5`,
          zoomValue!
        );
        const formData = new FormData();
        formData.append('file', dataURLToBlob(photoEditingBeforeSending), id);
        uploadPostImage(formData)
          .unwrap()
          .then((res) => {
            dispatch(postActions.addImageId(res.images[0]));
            showFourthModal?.();
            toast.success('Post imageRef uploaded');
          })
          .catch(() => {
            toast.error('Error');
          });
      });
    }
  };

  return (
    <>
      <div className={'modal'} onClick={onClose}>
        <div
          className={'modal__content1'}
          style={{ width }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={'modal__header'}>
            <img
              src={'/img/create-post/arrow-back.svg'}
              alt={'arrow-back'}
              width={24}
              height={24}
              className={'modal__arrow'}
              onClick={() =>
                buttonName === 'Publish'
                  ? onDeletePostImage?.()
                  : showSecondModal?.()
              }
            />
            <div className={'modal__title'}>{title}</div>
            <button
              className={'modal__next'}
              onClick={() =>
                buttonName === 'Next' ? onSendPostImage() : onPublishPost?.()
              }
            >
              {buttonName}
            </button>
          </div>
          <div className={'modal__body1'}>{children}</div>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

type Props = {
  title: string;
  onClose?: () => void;
  width?: string;
  buttonName: string;
  showSecondModal?: () => void;
  showFourthModal?: () => void;
  onPublishPost?: () => void;
  onDeletePostImage?: () => void;
  changedPostImage?: MutableRefObject<any>;
  zoomValue?: string;
};
