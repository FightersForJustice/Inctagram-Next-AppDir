import { Modal } from '@/components/Modals/Modal';
import { EmailSentModalProps } from './typesSignUp';
import s from './EmailSentModal.module.scss';

export const EmailSentModal = ({
  userEmail,
  setShowModal,
  translate,
}: EmailSentModalProps) => {
  return (
    <Modal
      title={'Email sent'}
      onClose={() => setShowModal(false)}
      isOkBtn={true}
    >
      <p className={s.container}>
        {translate}{' '}
        <span id={'sign-up-modalSuccess-userEmail'}>
          {userEmail}
        </span>
      </p>
    </Modal>
  );
};
