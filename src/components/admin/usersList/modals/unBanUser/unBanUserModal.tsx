import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { useUnBanCurrentUserMutation } from '@/queries/users/users.generated';
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

export const UnBanUserModal = (prop: Props) => {
  const { visiblePopupId, setShowAreYouSureModal, setVisiblePopup, name } =
    prop;
  const [userId, setUserId] = useState('');
  const [mutateFunction] = useUnBanCurrentUserMutation();
  const unBanUserHandler = async () => {
      console.log(userId)
      const res = await mutateFunction({
        variables: { userId: Number(userId) },
      })
      const result = res.data?.unbanUser
      if (result) {
        prop.getUsers()
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
      onYes={unBanUserHandler}
      name={name}
      type={'unBanUser'}
    />
  );
};
