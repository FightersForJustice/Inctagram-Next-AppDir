import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { Modal } from '@/components/Modals/Modal';
import { Alert } from '@/components/Alert';
import { DeleteAvatarModal } from '@/components/Modals/DeleteAvatarModal';

import s from '../Tabs.module.scss';

type Props = {
  onCloseAvatarModal: () => void;
  userAvatar: string;
  setUserAvatar: (value: string) => void;
  setCroppedAvatar: (value: string) => void;
  onSaveUserAvatar: () => void;
  onSetUserAvatar: (e: ChangeEvent<HTMLInputElement>) => void;
  fileError: string;
};

const DynamicCropper = dynamic(() => import('../Cropper/Cropper'), {
  ssr: false,
});

export const ShowAddAvatarModal = ({
  setCroppedAvatar,
  userAvatar,
  setUserAvatar,
  onSaveUserAvatar,
  onSetUserAvatar,
  onCloseAvatarModal,
  fileError,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.AddPhotoModal.${key}`);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [showModal, setShowModal] = useState(false);

  const onCloseHandler = () => {
    onCloseAvatarModal();
    setUserAvatar('');
  };

  return (
    <Modal
      title={translate('title')}
      onClose={onCloseHandler}
      className={s.modal__container}
      isOkBtn={false}
    >
      <div className={s.modal}>
        {userAvatar ? (
          <div className={s.modal__loadImg}>
            <DynamicCropper
              userAvatar={userAvatar}
              setCroppedAvatar={setCroppedAvatar}
            />
          </div>
        ) : (
          <div>
            {fileError && <Alert text={translate(fileError)} />}
            <Image
              src="/img/settings-profile/modal-img.png"
              alt="modal-img"
              width={222}
              height={228}
              className={s.modal__img}
            />
          </div>
        )}
        {userAvatar ? (
          <div className={s.modal__saveBtn}>
            <PrimaryBtn onClick={onSaveUserAvatar}>
              {translate('saveBtn')}
            </PrimaryBtn>
          </div>
        ) : (
          <div className={s.wrapper__loadZone}>
            <input
              type="file"
              ref={fileInputRef}
              id="file-upload"
              className={s.wrapper__inputFile}
              onChange={onSetUserAvatar}
              accept=".jpg, .jpeg, .png"
            />
            <PrimaryBtn onClick={handleButtonClick}>
              {translate('selectBtn')}
            </PrimaryBtn>
          </div>
        )}
        {showModal && (
          <DeleteAvatarModal
            setShowModal={setShowModal}
            onClose={onCloseHandler}
          />
        )}
      </div>
    </Modal>
  );
};
