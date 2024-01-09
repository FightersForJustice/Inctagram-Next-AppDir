import { ChangeEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { Modal } from '@/components/Modals/Modal';
import { Alert } from '@/components/Alert';
import { DeleteAvatarModal } from '@/components/Modals/DeleteAvatarModal';
import s from '../Tabs.module.scss';
import { useTranslations } from 'next-intl';

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
  const [showModalDelete, setShowModalDelete] = useState(false);

  const t = useTranslations('SettingsProfilePage');

  // const closeModalHandler = () => {
  //   if (userAvatar) {
  //     return setShowModal(true);
  //   }
  // };

  const onCloseAvatarHandler = () => {
    onCloseAvatarModal();
    setUserAvatar('');
  };

  return (
    <Modal
      title={t('AddPhotoModal.title')}
      onClose={onCloseAvatarHandler}
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
            {fileError && <Alert text={fileError} />}
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
              {t('AddPhotoModal.saveBtn')}
            </PrimaryBtn>
          </div>
        ) : (
          <div className={s.wrapper__loadZone}>
            <input
              type="file"
              id="file-upload"
              className={s.wrapper__inputFile}
              onChange={onSetUserAvatar}
              accept=".jpg, .jpeg, .png"
            />
            <PrimaryBtn>{t('AddPhotoModal.selectBtn')}</PrimaryBtn>
          </div>
        )}
        {showModalDelete && (
          <></>
          // <DeleteAvatarModal
          //   userAvatar={userAvatar}
          //   setShowModal={setShowModal}
          //   onClose={onCloseHandler}
          // />
        )}
      </div>
    </Modal>
  );
};
