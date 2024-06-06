import { TransparentBtn } from '@/components/Buttons/TransparentBtn/TransparentBtn';
import { PrimaryBtn } from '@/components/Buttons/PrimaryBtn/PrimaryBtn';
import { Modal } from '../Modal/Modal';
import { Loader } from '../../Loader/Loader';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';

import s from './AreYouSureModal.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  toggleAreYouSureModal: (value: boolean) => void;
  toggleModal: (value: boolean) => void;
  onDelete?: () => void;
  isDeleting?: boolean;
  type: 'cancelCreating' | 'deletePost';
};

export const AreYouSureModal = ({
  toggleModal,
  toggleAreYouSureModal,
  onDelete,
  isDeleting,
  type,
}: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const translate = (key: string): string => {
    const prefix =
      type === 'deletePost'
        ? 'SettingsProfilePage.AddPhotoModal.'
        : 'CreatePost.AddPhotoModal.';
    return t(prefix + key);
  };
  return (
    <>
      <Modal
        title={translate('close')}
        className={s.container}
        onClose={() => toggleAreYouSureModal(false)}
      >
        <p className={s.modal__text}>{translate('areYouSureText')}</p>
        <div className={s.modal__btns}>
          <TransparentBtn
            onClick={() => {
              dispatch(postActions.clearPostState());
              onDelete?.();
              if (onDelete) {
                setTimeout(() => {
                  toggleModal(false);
                  toggleAreYouSureModal(false);
                }, 1000);
              } else {
                toggleModal(false);
                toggleAreYouSureModal(false);
              }
            }}
          >
            {translate('yes')}
          </TransparentBtn>
          <PrimaryBtn onClick={() => toggleAreYouSureModal(false)}>
            {translate('no')}
          </PrimaryBtn>
        </div>
      </Modal>
      {isDeleting && <Loader />}
    </>
  );
};
