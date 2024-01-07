'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import Image from 'next/image';

import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { SettingsForm } from '../../SettingsForm/SettingsForm';
import {
  useDeleteProfileAvatarMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  usePostProfileAvatarMutation,
} from '@/api';
import { Loader } from '@/components/Loader';
import { dataURLtoFile, handleApiError } from '@/utils';
import { DeleteAvatarModal } from '@/components/Modals/DeleteAvatarModal';
import { ShowAddAvatarModal } from '../ShowAddAvatarModal';

import s from '../Tabs.module.scss';

export const GeneralInformationTab = () => {
  const t = useTranslations('SettingsProfilePage.GeneralInformationTab');

  const [showAddAvatarModal, setShowAddAvatarModal] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [croppedAvatar, setCroppedAvatar] = useState('');
  const [loadedAvatar, setLoadedAvatar] = useState('');
  const [file, setFile] = useState<File>();
  const [fileError, setFileError] = useState('');

  const [saveAvatar] = usePostProfileAvatarMutation();
  const [getUserProfile] = useLazyGetProfileQuery();

  const [deleteAvatar] = useDeleteProfileAvatarMutation();
  const [showModal, setShowModal] = useState(false);
  const [userBirthday, setUserBirthday] = useState('');
  const [userCity, setUserCity] = useState('');

  const { data, isLoading, error } = useGetProfileQuery();
  useEffect(() => {
    if (data) {
      setLoadedAvatar(data?.avatars[0]?.url);
      setUserBirthday(data?.dateOfBirth);
      setUserCity(data?.city);
    }
  }, [data]);

  const onDeleteAvatar = () => {
    deleteAvatar()
      .unwrap()
      .then(() => setLoadedAvatar(''))
      .catch((err) => toast.error(err.error));
  };

  if (error) {
    handleApiError(error);
  }

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

  const onCloseModal = () => {
    setShowAddAvatarModal(false);
    setFileError('');
  };

  const onSaveUserAvatar = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', dataURLtoFile(croppedAvatar), file.name);
      saveAvatar(formData)
        .unwrap()
        .then((res) => {
          getUserProfile();

          setLoadedAvatar(res.avatars[0].url);
          toast.success('Avatar successfully uploaded');
        })
        .catch((err) => {
          toast.error(err.error);
        });
    }
    setUserAvatar('');
    setCroppedAvatar('');
    setShowAddAvatarModal(false);
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.wrapper__left}>
          <Image
            src={`${
              loadedAvatar
                ? loadedAvatar
                : '/img/settings-profile/load-avatar.svg'
            }`}
            alt="load-avatar"
            width={192}
            height={192}
            className={s.wrapper__image}
            priority={true}
          />
          {loadedAvatar && (
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
        </div>
        <div className={s.wrapper__right}>
          <SettingsForm
            userProfile={data}
            userBirthday={data?.dateOfBirth ?? ''}
            userCity={userCity}
            setUserCity={setUserCity}
            translate={t}
          />
        </div>
      </div>
      {showModal && (
        <DeleteAvatarModal
          userAvatar={loadedAvatar}
          setShowModal={setShowModal}
          onClose={onDeleteAvatar}
        />
      )}
      {showAddAvatarModal && (
        <ShowAddAvatarModal
          t={t}
          onCloseModal={onCloseModal}
          userAvatar={userAvatar}
          setUserAvatar={setUserAvatar}
          setCroppedAvatar={setCroppedAvatar}
          onSaveUserAvatar={onSaveUserAvatar}
          onSetUserAvatar={onSetUserAvatar}
          fileError={fileError}
        />
      )}
      {isLoading && <Loader />}
    </>
  );
};
