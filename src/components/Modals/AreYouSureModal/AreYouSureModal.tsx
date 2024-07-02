import { TransparentBtn } from '@/components/Buttons/TransparentBtn/TransparentBtn';
import { PrimaryBtn } from '@/components/Buttons/PrimaryBtn/PrimaryBtn';
import { Modal } from '../Modal/Modal';
import { Loader } from '../../Loader/Loader';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';

import s from './AreYouSureModal.module.scss';
import { useTranslation } from 'react-i18next';

type SureType = 'cancelCreating' | 'deletePost' | 'deletePostPost';

type Props = {
  toggleAreYouSureModal: (value: boolean) => void;
  toggleModal: (value: boolean) => void;
  onYes?: () => void;
  onNo?: () => void;
  isDeleting?: boolean;
  type?: SureType;
};

export const AreYouSureModal = ({
  toggleModal,
  toggleAreYouSureModal,
  onYes,
  onNo,
  isDeleting,
  type,
}: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const translate = (key: string): string => {
    const prefix: any = {
      deletePost: 'SettingsProfilePage.AddPhotoModal.',
      deletePostPost: 'CreatePost.DeletePostModal.',
      cancelCreating: 'CreatePost.AddPhotoModal.',
    };
    return t(prefix ? prefix[type as string] + key : key);
  };
  return (
    <>
      <Modal
        title={translate('close')}
        className={s.container}
        onClose={() => toggleAreYouSureModal(false)}
      >
        <p className={s.modal__text}>{translate('areYouSureText')}</p>
        <div className={type === 'cancelCreating' ? s.modal__btns__cancel__creating : s.modal__btns}>
          <TransparentBtn
            onClick={() => {
              dispatch(postActions.clearPostState());
              indexedDB.deleteDatabase('post-store')
              onYes?.();
              toggleModal(false);
              toggleAreYouSureModal(false);
            }}
          >
            {translate('yes')}
          </TransparentBtn>
          <PrimaryBtn
            onClick={() => {
              onNo?.()
              toggleAreYouSureModal(false)
            }}
          >
            {translate('no')}
          </PrimaryBtn>
        </div>
      </Modal>
      {isDeleting && <Loader />}
    </>
  );
};
