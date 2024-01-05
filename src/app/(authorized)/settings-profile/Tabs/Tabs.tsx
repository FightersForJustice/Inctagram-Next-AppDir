'use client';

import { ChangeEvent, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { InfoCircledIcon, DesktopIcon, GearIcon, BackpackIcon } from '@radix-ui/react-icons'

import {
  useLazyGetProfileQuery,
  usePostProfileAvatarMutation,
} from '@/api/profile.api';
import { dataURLtoFile } from '@/utils/dataUrlToFile';
import { GeneralInformationTab } from './GeneralInformationTab/GeneralInformationTab';
import { DevicesTab } from './DevicesTab/DevicesTab';
import { Loader } from '@/components/Loader/Loader';
import { ShowAddAvatarModal } from './ShowAddAvatarModal/ShowAddAvatarModal';
import { AccountManagementTab } from './AccountManagementTab/AccountManagementTab';
import { MyPayments } from '@/app/(authorized)/settings-profile/Tabs/MyPayments';

import s from './Tabs.module.scss';

const TabsDemo = () => {
  const t = useTranslations('SettingsProfilePage');

  const [showAddAvatarModal, setShowAddAvatarModal] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [croppedAvatar, setCroppedAvatar] = useState('');
  const [loadedAvatar, setLoadedAvatar] = useState('');
  const [file, setFile] = useState<File>();
  const [fileError, setFileError] = useState('');

  const [saveAvatar, { isLoading }] = usePostProfileAvatarMutation();
  const [getUserProfile] = useLazyGetProfileQuery();

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
    <div className={s.container}>
      <Tabs.Root className={s.TabsRoot} defaultValue="generalInformation">
        <Tabs.List className={s.TabsList} aria-label="Manage your account">
          <Tabs.Trigger className={s.TabsTrigger} value="generalInformation">
            <p className={s.TabsText}>{t('GeneralInformationTab.titleTab')}</p>
            <InfoCircledIcon className={s.TabsIcon}/>
          </Tabs.Trigger>
          <Tabs.Trigger className={s.TabsTrigger} value="devices">
            <p className={s.TabsText}>{t('DevicesTab.titleTab')}</p>
            <DesktopIcon className={s.TabsIcon}/>
          </Tabs.Trigger>
          <Tabs.Trigger className={s.TabsTrigger} value="accountManagement">
            <p className={s.TabsText}>{t('AccountManagementTab.titleTab')}</p>
            <GearIcon className={s.TabsIcon}/>
          </Tabs.Trigger>
          <Tabs.Trigger className={s.TabsTrigger} value="myPayments">
            <p className={s.TabsText}>{t('MyPaymentsTab.titleTab')}</p>
            <BackpackIcon className={s.TabsIcon}/>
          </Tabs.Trigger>
        </Tabs.List>
        <GeneralInformationTab
          setShowAddAvatarModal={setShowAddAvatarModal}
          setLoadedAvatar={setLoadedAvatar}
          loadedAvatar={loadedAvatar}
        />
        <DevicesTab />
        <AccountManagementTab />
        <MyPayments />
      </Tabs.Root>
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
    </div>
  );
};

export default TabsDemo;
