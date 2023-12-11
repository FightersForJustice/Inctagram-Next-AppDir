import { FC } from 'react';
import { Modal } from '@/components/Modals/Modal';
import { EmailSentModalProps } from './typesSignUp';

export const EmailSentModal: FC<EmailSentModalProps> = ({
  userEmail,
  setShowModal,
  translate,
}) => {
  return (
    <Modal
      title={'Email sent'}
      onClose={() => setShowModal(false)}
      isOkBtn={true}
    >
      {translate}{' '}
      <span id={'sign-up-modalSuccess-userEmail'} className={'text-blue-300'}>
        {userEmail}
      </span>
    </Modal>
  );
};
