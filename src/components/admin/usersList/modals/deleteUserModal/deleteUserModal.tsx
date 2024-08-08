import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { useRemoveCurrentUserMutation } from '@/queries/users/users.generated';

type Props = {
  setShowAreYouSureModal: (value: boolean) => void;
  setVisiblePopup: (value: boolean) => void;
  onYes?: () => void;
  onNo?: () => void;
  name?: string;
  visiblePopupId?: string;
};

export const DeleteUserModal = (prop: Props) => {
  const {
    visiblePopupId,
    setShowAreYouSureModal,
    setVisiblePopup,
    name,
  } = prop;

  const [mutateFunction] = useRemoveCurrentUserMutation();
  const deleteUserHandler = () =>
    mutateFunction({ variables: { userId: Number(visiblePopupId) } });

  return (
    <AreYouSureModal
      toggleAreYouSureModal={setShowAreYouSureModal}
      toggleModal={setVisiblePopup}
      onYes={deleteUserHandler}
      name={name}
      type={'deleteUser'}
    />
  );
};
