import Image from 'next/image';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { postActions } from '@/redux/reducers/post/postReducer';
import { imagesGallery } from '@/redux/reducers/post/postSelectors';
import { useTranslation } from 'react-i18next';
import './CroppingModal.css';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  onClose?: () => void;
  croppedPostImage: string;
};

export const CroppingModal = ({
  setStep,
  onClose,
  children,
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
      <div className={'modal__content'} onClick={(e) => e.stopPropagation()}>
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
