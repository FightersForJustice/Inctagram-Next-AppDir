import { useState } from 'react';

import { GetResponse } from '@/api/profile.api';
import { FirstModal } from './FirstModal';
import { FourthModal } from './FourthModal';
import { SecondModal } from './SecondModal';
import { ThirdModal } from './ThirdModal';

type Props = {
  showCreatePostModal: boolean;
  setShowCreatePostModal: (value: boolean) => void;
  userData: GetResponse;
};

export const CreatePost = ({
  showCreatePostModal,
  setShowCreatePostModal,
  userData,
}: Props) => {
  const [step, setStep] = useState<number>(1);

  // console.log('root render');
  const closeCreatePostModal = (show: boolean) => {
    setShowCreatePostModal(show);
    sessionStorage.removeItem('userPostImage');
  };

  return (
    <>
      {showCreatePostModal && step === 1 && (
        <FirstModal
          setStep={setStep}
          setShowCreatePostModal={closeCreatePostModal}
        />
      )}

      {step === 2 && (
        <SecondModal
          setStep={setStep}
          setShowCreatePostModal={closeCreatePostModal}
        />
      )}
      {step === 3 && (
        <ThirdModal
          setStep={setStep}
          setShowCreatePostModal={closeCreatePostModal}
        />
      )}
      {step === 4 && (
        <FourthModal
          setStep={setStep}
          setShowCreatePostModal={closeCreatePostModal}
          userData={userData}
        />
      )}
    </>
  );
};

export enum AspectRatioType {
  one = 1,
  two = 4 / 3,
  three = 4 / 5,
  four = 16 / 9,
}
