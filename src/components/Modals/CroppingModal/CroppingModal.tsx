import { PropsWithChildren } from 'react';
import Image from 'next/image';

import './CroppingModal.css';
import { useTranslation } from 'react-i18next';

type Props = {
  onClose?: () => void;
  width?: string;
  setPostImage: (value: string) => void;
  showThirdModal: () => void;
  croppedPostImage: string;
};

export const CroppingModal = ({
  onClose,
  children,
  width,
  setPostImage,
  showThirdModal,
}: PropsWithChildren<Props>) => {
  const onNextBtnHandler = () => {
    showThirdModal();
  };
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.AddPhotoModal.${key}`);

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
            onClick={() => setPostImage('')}
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
