import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import Image from 'next/image';

import './CroppingModal.css';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { imagesGallery } from '@/redux/reducers/post/postSelectors';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  onClose?: () => void;
  width?: string;
  croppedPostImage: string;
};

export const CroppingModal = ({
  setStep,
  onClose,
  children,
  width,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.AddPhotoModal.${key}`);

  const dispatch = useAppDispatch();
  const imagesGalleryArr = useAppSelector(imagesGallery);

  const onNextBtnHandler = () => {
    dispatch(postActions.removeAllImages());
    imagesGalleryArr.map((i: any) => {
      dispatch(postActions.addImage(i));
    });

    setStep(3);
  };

  const onBackBtnHandler = () => { 
    dispatch(postActions.removeAllGalleryImages());
    setStep((prev) => (prev = prev - 1));
  };

  return (
    <div className={'modal'} onClick={onClose}>
      <div
        className={'modal__content'}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={'modal__header'}>
          <Image
            src={'/img/create-post/arrow-back.svg'}
            alt={'arrow-back'}
            width={24}
            height={24}
            className={'modal__arrow'}
            onClick={onBackBtnHandler}
          />
          <div className={'modal__title'}>{translate('cropping')}</div>
          <button className={'modal__next'} onClick={onNextBtnHandler}>
            {translate('nextBtn')}
          </button>
        </div>
        <div className={'modal__body2'}>{children}</div>
      </div>
    </div>
  );
};
