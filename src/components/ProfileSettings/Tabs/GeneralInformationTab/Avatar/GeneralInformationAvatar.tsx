'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { TransparentBtn } from '@/components/Buttons/TransparentBtn';
import { ShowAddAvatarModal } from '../../ShowAddAvatarModal';
import { dataURLToBlob, dataURLtoFile } from '@/utils';
import { deleteAvatarAction, uploadAvatarAction } from '@/app/lib/actions';
import { DeleteAvatarModal } from '@/components/Modals/DeleteAvatarModal';
import { AvatarSkeleton } from '@/components/Skeletons/ProfileSettingsSkeletons';

import s from './GeneralInformationAvatar.module.scss';
import { convertBlobUrlToBase64 } from '@/utils/dataUrlBlobToBase64';

type TProps = {
  currentAvatar: string | null;
};

export const GeneralInformationAvatar = ({ currentAvatar }: TProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddAvatarModal, setShowAddAvatarModal] = useState(false);

  const [userAvatar, setUserAvatar] = useState('');
  const [croppedAvatar, setCroppedAvatar] = useState<any>('');
  const [file, setFile] = useState<File>();
  const [fileError, setFileError] = useState('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.GeneralInformationTab.${key}`);

  const onDeleteAvatar = () => {
    setIsLoading(true);
    deleteAvatarAction()
      .then((res) => {
        !res.success &&
          setTimeout(() => {
            toast.error(translate(res.modalText));
          }, 2000);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  };

  const onSetUserAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      if (file.size <= maxSize) {
        setFile(file);
        setUserAvatar(URL.createObjectURL(file));
      } else {
        setFileError('sizeError');
      }
    } else {
      setFileError('formatError');
    }
  };

  const onSaveUserAvatar = async () => {
    setIsLoading(true);
    if (file) {
      const formData = new FormData();
      console.log(croppedAvatar.image);
      console.log(typeof croppedAvatar.image);
      const avatarData = await convertBlobUrlToBase64(croppedAvatar.image).then(
        (res) => res
      );
      console.log(avatarData);
      formData.append(
        'file',
        dataURLtoFile('data:image/png;base64,' + avatarData),
        file.name
      );
      uploadAvatarAction(formData)
        .then((res) => {
          !res.success &&
            setTimeout(() => {
              toast.error(translate(res.modalText));
            }, 2000);
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
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
        {translate('addBtn')}
      </TransparentBtn>
      {showDeleteModal && (
        <DeleteAvatarModal
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
