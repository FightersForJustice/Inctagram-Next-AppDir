import { TransparentBtn } from '@/components/Buttons/TransparentBtn/TransparentBtn';
import { PrimaryBtn } from '@/components/Buttons/PrimaryBtn/PrimaryBtn';
import { Modal } from '../Modal/Modal';
import { Loader } from '../../Loader/Loader';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';

import { useTranslation } from 'react-i18next';
import s from './AreYouSureModal.module.scss';
import { useEffect, useState } from 'react';
import { BaseSelector, optionsType } from '@/components/Selector/Selector';

export type SureType =
  | 'cancelCreating'
  | 'deletePost'
  | 'deletePostPost'
  | 'deleteUser'
  | 'unBanUser'
  | 'banUser';

type Props = {
  toggleAreYouSureModal: (value: boolean) => void;
  reasonHandler?: (value: string) => void;
  toggleModal: (value: boolean) => void;
  onYes?: () => void;
  onNo?: () => void;
  setVisiblePopupId?: () => void;
  isDeleting?: boolean;
  name?: string;
  type?: SureType;
};

export const AreYouSureModal = ({
  toggleModal,
  toggleAreYouSureModal,
  reasonHandler,
  setVisiblePopupId,
  onYes,
  onNo,
  name,
  isDeleting,
  type,
}: Props) => {
  setVisiblePopupId && setVisiblePopupId();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [userName, setUserName] = useState('');
  const translate = (key: string): string => {
    const prefix: any = {
      deletePost: 'SettingsProfilePage.AddPhotoModal.',
      deletePostPost: 'CreatePost.DeletePostModal.',
      cancelCreating: 'CreatePost.AddPhotoModal.',
      banUser: 'Admin.userlistModals.banUser.',
      unBanUser: 'Admin.userlistModals.unBanUser.',
      deleteUser: 'Admin.userlistModals.deleteUser.',
    };
    return t(prefix ? prefix[type as string] + key : key);
  };
  const handleClose = () => {
    toggleAreYouSureModal(false);
  };
  useEffect(() => {
    if (name) {
      setUserName(name);
    }
  }, []);
  const selectorOptions = [
    { value: 'choose', label: translate('select.choose') },
    { value: 'anotherReason', label: translate('select.anotherReason') },
    { value: 'behavioue', label: translate('select.behavioue') },
    { value: 'placement', label: translate('select.placement') },
  ];
  const selectHandler = (e: optionsType) => {
    reasonHandler && reasonHandler(e.label);
  };
  return (
    <>
      <Modal
        title={translate('close')}
        className={s.container}
        onClose={handleClose}
      >
        <p className={s.modal__text}>
          {translate('areYouSureText')}{' '}
          {userName ? (
            <>
              <span>{userName} </span>?
            </>
          ) : (
            ''
          )}
        </p>
        {type === 'banUser' && (
          <BaseSelector
            defaultValue={selectorOptions[0]}
            id={'banUserSelect'}
            name={'banUserSelect'}
            selectorsLabelName={''}
            options={selectorOptions.slice(1)}
            onChange={selectHandler}
            type={type}
          />
        )}
        <div
          className={
            type === 'cancelCreating' || type === 'banUser' || type === 'deleteUser'
              ? s.modal__btns__cancel__creating
              : s.modal__btns
          }
        >
          <TransparentBtn
            onClick={() => {
              dispatch(postActions.clearPostState());
              indexedDB.deleteDatabase('post-store');
              onYes?.();
              toggleModal(false);
              handleClose();
            }}
          >
            {translate('yes')}
          </TransparentBtn>
          <PrimaryBtn
            onClick={() => {
              onNo?.();
              handleClose();
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
