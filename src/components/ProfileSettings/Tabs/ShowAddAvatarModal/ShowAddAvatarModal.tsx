import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { Modal } from '@/components/Modals/Modal';
import { Alert } from '@/components/Alert';
import { Range } from '@/components/CropperControls/Range';
import { DeleteAvatarModal } from '@/components/Modals/DeleteAvatarModal';

import { PostCropper } from '@/app/(authorized)/CreatePost/PostCropper';
import s from '../Tabs.module.scss';
import { ChangedImage } from '@/redux/reducers/post/postReducer';

type Props = {
  onCloseAvatarModal: () => void;
  userAvatar: string;
  setUserAvatar: (value: string) => void;
  setCroppedAvatar: (value: Omit<
    ChangedImage,
    'base64Image' | 'filter' | 'cropAspectRatio' | 'originalImage'>) => void;
  onSaveUserAvatar: (value: string) => void;
  onSetUserAvatar: (e: ChangeEvent<HTMLInputElement>) => void;
  fileError: string;
};

// const DynamicCropper = dynamic(() => import('../Cropper/Cropper'), {
//   ssr: false,
// });

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
  const [zoom, setZoom] = useState(1);

  const onZoomImage = (value: number) => {
    setZoom(value);
  };

  const onCloseHandler = () => {
    onCloseAvatarModal();
    setUserAvatar('');
  };


  // const dispatch = useAppDispatch();

  // const currentImageId = useAppSelector((state) => state.post.currentImageId);
  // const currentImage = useAppSelector((state) =>
  //   state.post.changedImages.filter((el) => el.id === currentImageId)[0]
  // );

  const [areYouSureModal, setAreYouSureModal] = useState(false);
  console.log(userAvatar)

  const changeAvatarHandler = () => {
    console.log('handler',userAvatar)
    onSaveUserAvatar(userAvatar)
  }
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
            <PostCropper
              zoom={zoom}
              currentImageId={'fefee'}
              onValueChange={onZoomImage}
              image={{ originalImage: userAvatar, id: '5' }}
              shape="round"
              setCroppedAvatar={setCroppedAvatar}
              skip
            />
            <div className={s.itemsContainer}>
              <Range onValueChange={onZoomImage} value={zoom} />
            </div>
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
            <PrimaryBtn onClick={changeAvatarHandler}>
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
            <PrimaryBtn onClick={handleButtonClick} isFullWidth>
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
