import * as Popover from '@radix-ui/react-popover';

import { PostFriendsPopup } from './PostPopup';
import Image from 'next/image';

type Props = {
  setVisiblePopup: (value: boolean) => void;
  visiblePopup: boolean;
};

export const DotsFriends = ({ visiblePopup, setVisiblePopup }: Props) => {
  return (
    <Popover.Root onOpenChange={() => setVisiblePopup(!visiblePopup)}>
      <Popover.Trigger>
        <div style={{ width: '24px', height: '24px' }}>
          <Image
            style={{
              cursor: 'pointer',
              filter:
                'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(133deg) brightness(100%) contrast(104%)',
            }}
            width={24}
            height={24}
            src="/img/more-horizontal-outline.svg"
            alt=""
          />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="PopoverContent"
          sideOffset={5}
          style={{ zIndex: 1111 }}
        >
          <PostFriendsPopup />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
