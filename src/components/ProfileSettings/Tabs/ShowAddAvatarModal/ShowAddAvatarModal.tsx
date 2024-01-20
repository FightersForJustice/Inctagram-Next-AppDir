import { ChangeEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { Modal } from '@/components/Modals/Modal';
import { Alert } from '@/components/Alert';
import { DeleteAvatarModal } from '@/components/Modals/DeleteAvatarModal';

import s from '../Tabs.module.scss';

type Props = {
  translate: (value: string) => string;
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
  translate,
  fileError,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const closeModalHandler = () => {
    if (userAvatar) {
      return setShowModal(true);
    }
  };
  const onCloseHandler = () => {
    onCloseAvatarModal();
    setUserAvatar('');
  };

  return (
    <Modal
      title={translate('AddPhotoModal.title')}
      onClose={closeModalHandler}
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
              {translate('AddPhotoModal.saveBtn')}
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
            <PrimaryBtn>{translate('AddPhotoModal.selectBtn')}</PrimaryBtn>
          </div>
        )}
        {showModal && (
          <DeleteAvatarModal
            userAvatar={userAvatar}
            setShowModal={setShowModal}
            onClose={onCloseHandler}
          />
        )}
      </div>
    </Modal>
  );
};
