import { Modal } from '@/components/Modals/Modal';
import { EmailSentModalProps } from '@/types/signUpTypes';
import s from './EmailSentModal.module.scss';

export const EmailSentModal = ({
  userEmail,
  setShowModal,
  translate,
}: EmailSentModalProps) => {
  return (
    <Modal title={'Email sent'} onClose={() => setShowModal(false)} isOkBtn>
      <p className={s.container}>
        {translate}{' '}
        <span id={'sign-up-modalSuccess-userEmail'}>{userEmail}</span>
      </p>
    </Modal>
  );
};
