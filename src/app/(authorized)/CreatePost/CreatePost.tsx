'use client'

import { useState } from 'react';

import { GetResponse } from '@/api/profile.api';
import { FirstModal } from './FirstModal';
import { FourthModal } from './FourthModal';
import { SecondModal } from './SecondModal';
import { ThirdModal } from './ThirdModal';
import { postActions } from '@/redux/reducers/post/postReducer';
import { store } from '@/redux';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { openDB } from 'idb';
import { RootState } from '@/redux/store';

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
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<number>(1);

  const closeCreatePostModal = (show: boolean) => {
    setShowCreatePostModal(show);

    sessionStorage.removeItem('userPostImage');
  };

  const initDB = () => {
    return openDB('post-store', 1, {
      upgrade(db) {
        db.createObjectStore('postDraft', { keyPath: 'id' });
      },
    });
  };

  const savePostDraft = async (postState: RootState) => {
    const db = await initDB();

    const postDraft = {
      id: 'draft',
      images: postState.post.changedImages,
      description: postState.post.description,
    };

    await db.put('postDraft', postDraft);
  };

  const saveDraft = async () => {
    const postState = store.getState()

    await savePostDraft(postState);

    dispatch(postActions.clearPostState());
    closeCreatePostModal(false)
  }

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
          onSaveDraft={saveDraft}
        />
      )}
      {step === 3 && (
        <ThirdModal
          setStep={setStep}
          setShowCreatePostModal={closeCreatePostModal}
          onSaveDraft={saveDraft}
        />
      )}
      {step === 4 && (
        <FourthModal
          setStep={setStep}
          setShowCreatePostModal={closeCreatePostModal}
          userData={userData}
          onSaveDraft={saveDraft}
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
