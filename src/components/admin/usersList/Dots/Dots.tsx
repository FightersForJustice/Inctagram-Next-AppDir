import * as Popover from '@radix-ui/react-popover';

import { PostPopup } from '../PostPopup';
import Image from 'next/image';
import s from './Dots.module.scss';

type Props = {
  setVisiblePopup: (value: boolean) => void;
  visiblePopup: boolean;
  setVisiblePopupId: (value: string) => void;
  visiblePopupId: string;
  id: string;
  setEditUser: (value: string) => void;
  setShowAreYouSureModal: (value: boolean) => void;
};

export const Dots = ({
  setEditUser,
  visiblePopup,
  visiblePopupId,
  id,
  setVisiblePopup,
  setShowAreYouSureModal,
  setVisiblePopupId, // setEditPost,
} // setShowAreYouSureModal,
: Props) => {
  const clickHandler = () => {
    setVisiblePopup(!visiblePopup);
    setVisiblePopupId(id);
    if (visiblePopup) {
      setVisiblePopupId('');
    }
  };
  return (
    <Popover.Root onOpenChange={clickHandler}>
      <Popover.Trigger>
        <div style={{ width: '24px', height: '24px' }}>
          <Image
            style={{
              cursor: 'pointer',
              maxWidth: '20px',
            }}
            className={s.container}
            width={24}
            height={24}
            src={
              id === visiblePopupId
                ? '/img/more-horizotnal.svg'
                : '/img/more-horizontal-outline.svg'
            }
            alt=""
          />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="PopoverContent"
          sideOffset={5}
          style={{ zIndex: 11 }}
        >
          <PostPopup
            setEditUser={setEditUser}
            setVisiblePopup={setVisiblePopup}
            setShowAreYouSureModal={setShowAreYouSureModal}
            id={visiblePopupId}

            // toggleShowAreYouSureModal={toggleShowAreYouSureModal}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
