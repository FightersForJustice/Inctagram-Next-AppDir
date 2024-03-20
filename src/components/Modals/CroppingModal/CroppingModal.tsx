import Image from 'next/image';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import './CroppingModal.css';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  onClose?: () => void;
};

export const CroppingModal = ({
  setStep,
  onClose,
  children,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.AddPhotoModal.${key}`);

  const onNextBtnHandler = () => {
    setStep(3);
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
            onClick={onClose}
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
