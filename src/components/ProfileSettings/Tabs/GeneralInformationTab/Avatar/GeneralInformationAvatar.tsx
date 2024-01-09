'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';

import { TransparentBtn } from '@/components/Buttons/TransparentBtn';

import s from './GeneralInformationAvatar.module.scss';
import { ShowAddAvatarModal } from '../../ShowAddAvatarModal';

type TProps = {
  currentAvatar: string | null;
};

export const GeneralInformationAvatar = ({ currentAvatar }: TProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showAddAvatarModal, setShowAddAvatarModal] = useState(false);

  const [userAvatar, setUserAvatar] = useState<string>('');
  const [croppedAvatar, setCroppedAvatar] = useState('');
  const [loadedAvatar, setLoadedAvatar] = useState('');
  const [file, setFile] = useState<File>();
  const [fileError, setFileError] = useState('');

  const t = useTranslations('SettingsProfilePage.GeneralInformationTab');

  const onDeleteAvatar = () => {
    // deleteAvatar()
    //   .unwrap()
    //   .then(() => setLoadedAvatar(''))
    //   .catch((err) => toast.error(err.error));
  };

  const onSetUserAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;
    if (file.size <= maxSize) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setFile(file);
        console.log(2);
        setUserAvatar(URL.createObjectURL(file));
      } else {
        setFileError('The format of the uploaded photo must be PNG and JPEG');
      }
    } else {
      setFileError('Photo size must be less than 10 MB!');
    }
  };

  const onSaveUserAvatar = () => {
    // if (file) {
    //   const formData = new FormData();
    //   formData.append('file', dataURLtoFile(croppedAvatar), file.name);
    // saveAvatar(formData)
    //   .unwrap()
    //   .then((res) => {
    //     getUserProfile();
    //     setLoadedAvatar(res.avatars[0].url);
    //     toast.success('Avatar successfully uploaded');
    //   })
    //   .catch((err) => {
    //     toast.error(err.error);
    //   });
  };
  // setUserAvatar('');
  // setCroppedAvatar('');
  // setShowAddAvatarModal(false);

  const onCloseAvatarModal = () => {
    setShowAddAvatarModal(false);
    setFileError('');
  };

  return (
    <div className={s.avatarContainer}>
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
          onClick={() => setShowModal(true)}
          className={s.wrapper__delete}
        />
      )}
      <TransparentBtn onClick={() => setShowAddAvatarModal(true)}>
        {t('addBtn')}
      </TransparentBtn>
      {showModal && (
        // <DeleteAvatarModal
        //   userAvatar={loadedAvatar}
        //   setShowModal={setShowModal}
        //   onClose={onDeleteAvatar}
        // />
        <>showModal</>
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
