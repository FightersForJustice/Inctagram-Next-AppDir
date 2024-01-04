import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import * as Tabs from '@radix-ui/react-tabs';
import Image from 'next/image';

import { TransparentBtn } from 'src/components/Buttons/TransparentBtn';
import { SettingsForm } from '../../SettingsForm/SettingsForm';
import { useDeleteProfileAvatarMutation, useGetProfileQuery } from '@/api';
import { Loader } from '@/components/Loader';
import { handleApiError } from '@/utils';
import { DeleteAvatarModal } from '@/components/Modals/DeleteAvatarModal';

import s from '../Tabs.module.scss';

export const GeneralInformationTab = ({
  setShowAddAvatarModal,
  setLoadedAvatar,
  loadedAvatar,
}: Props) => {
  const t = useTranslations('SettingsProfilePage.GeneralInformationTab');

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

  return (
    <>
      <Tabs.Content className={s.TabsContent} value="generalInformation">
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
      </Tabs.Content>
      {showModal && (
        <DeleteAvatarModal
          userAvatar={loadedAvatar}
          setShowModal={setShowModal}
          onClose={onDeleteAvatar}
        />
      )}
      {isLoading && <Loader />}
    </>
  );
};

type Props = {
  loadedAvatar: string;
  setLoadedAvatar: (value: string) => void;
  setShowAddAvatarModal: (value: boolean) => void;
};
