import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { useBanCurrentUserMutation } from '@/queries/users/users.generated';
import { useEffect, useState } from 'react';

type Props = {
  setShowAreYouSureModal: (value: boolean) => void;
  setVisiblePopup: (value: boolean) => void;
  getUsers: () => void;
  onYes?: () => void;
  onNo?: () => void;
  name?: string;
  visiblePopupId?: string;
};

export const BanUserModal = (prop: Props) => {
  const { visiblePopupId, setShowAreYouSureModal, setVisiblePopup, name } =
    prop;
  const [userId, setUserId] = useState('');
  const [reason, setReason] = useState('');
  const [mutateFunction] = useBanCurrentUserMutation();
  const banUserHandler = async () => {
    if (reason.trim()) {
      console.log(userId);
      const res = await mutateFunction({
        variables: { userId: Number(userId), banReason: reason },
      })
      const result = res.data?.banUser
      if (result) {
        prop.getUsers()
      }
    }
  };
  useEffect(()=>{
    if(visiblePopupId) {
      setUserId(visiblePopupId)
    }
  },[])

  return (
    <AreYouSureModal
      toggleAreYouSureModal={setShowAreYouSureModal}
      toggleModal={setVisiblePopup}
      onYes={banUserHandler}
      name={name}
      reasonHandler={setReason}
      type={'banUser'}
    />
  );
};
