import { PropsWithChildren } from 'react';

import style from './EditPostModal.module.scss';
import { PrimaryBtn } from '@/components/Buttons/PrimaryBtn';
import { TransparentBtn } from '@/components/Buttons/TransparentBtn';
import { Modal } from '@/components/Modals/Modal';
import { useTranslation } from 'react-i18next';

type Props = {
  title?: string;
  onClose: () => void;
  onSubmit: () => void;
};

export const EditPostModal = ({
  onClose,
  title,
  children,
  onSubmit,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`CreatePost.EditPost.${key}`);
  return (
    <>
      <Modal title={title} onClose={onClose}>
        <div className={style.modal__body}>{children}</div>
        <div className={style.modal__footer}>
          <TransparentBtn className={style.modal__btn} onClick={onSubmit}>
            {translate('submit')}
          </TransparentBtn>
          <PrimaryBtn className={style.modal__btn} onClick={onClose}>
            {translate('cancel')}
          </PrimaryBtn>
        </div>
      </Modal>
    </>
  );
};
