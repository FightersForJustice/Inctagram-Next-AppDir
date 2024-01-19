'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { TransparentBtn } from '@/components/Buttons/TransparentBtn';
import { ShowAddAvatarModal } from '../../ShowAddAvatarModal';
import { dataURLtoFile } from '@/utils';
import { deleteAvatarAction, uploadAvatarAction } from '@/app/lib/actions';
import { DeleteAvatarModal } from '@/components/Modals/DeleteAvatarModal';

import s from './GeneralInformationAvatar.module.scss';
import { AvatarSkeleton } from '@/components/Skeletons/ProfileSettingsSkeletons';

type TProps = {
  currentAvatar: string | null;
};

export const GeneralInformationAvatar = ({ currentAvatar }: TProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddAvatarModal, setShowAddAvatarModal] = useState(false);

  const [userAvatar, setUserAvatar] = useState<string>('');
  const [croppedAvatar, setCroppedAvatar] = useState('');
  const [loadedAvatar, setLoadedAvatar] = useState('');
  const [file, setFile] = useState<File>();
  const [fileError, setFileError] = useState('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const t = useTranslations('SettingsProfilePage.GeneralInformationTab');

  const onDeleteAvatar = () => {
    setIsLoading(true);
    deleteAvatarAction()
      .then((res) => {
        if (res.success) {
          setLoadedAvatar('');
          toast.success(t(res.modalText));
        } else toast.error(t(res.modalText));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSetUserAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;
    if (file.size <= maxSize) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setFile(file);
        setUserAvatar(URL.createObjectURL(file));
      } else {
        setFileError('The format of the uploaded photo must be PNG and JPEG');
      }
    } else {
      setFileError('Photo size must be less than 10 MB!');
    }
  };

  const onSaveUserAvatar = async () => {
    setIsLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append('file', dataURLtoFile(croppedAvatar), file.name);
      uploadAvatarAction(formData)
        .then((res) => {
          res.success
            ? toast.success(t(res.modalText))
            : toast.error(t(res.modalText));
        })
        .finally(() => {
          setIsLoading(false);
        });
      setUserAvatar('');
      setCroppedAvatar('');
      setShowAddAvatarModal(false);
    }
  };

  const onCloseAvatarModal = () => {
    setShowAddAvatarModal(false);
    setFileError('');
  };

  return isLoading ? (
    <AvatarSkeleton />
  ) : (
    <div className={s.avatarContainer}>
      <div className={s.avatarWithButton}>
        <Image
          src={currentAvatar ?? '/img/settings-profile/load-avatar.svg'}
          alt="load-avatar"
          width={192}
          height={192}
          className={s.wrapper__image}
          priority={true}
        />
        {currentAvatar && (
          <Image
            src="/img/settings-profile/delete.svg"
            alt="delete"
            width={24}
            height={24}
            onClick={() => setShowDeleteModal(true)}
            className={s.wrapper__delete}
          />
        )}
      </div>
      <TransparentBtn onClick={() => setShowAddAvatarModal(true)}>
        {t('addBtn')}
      </TransparentBtn>
      {showDeleteModal && (
        <DeleteAvatarModal
          userAvatar={loadedAvatar}
          setShowModal={setShowDeleteModal}
          onClose={onDeleteAvatar}
        />
      )}
      {showAddAvatarModal && (
        <ShowAddAvatarModal
          onCloseAvatarModal={onCloseAvatarModal}
          userAvatar={userAvatar}
          setUserAvatar={setUserAvatar}
          setCroppedAvatar={setCroppedAvatar}
          onSaveUserAvatar={onSaveUserAvatar}
          onSetUserAvatar={onSetUserAvatar}
          fileError={fileError}
        />
      )}
    </div>
  );
};
