import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import s from '../CreatePost.module.scss';
import { CroppingSizeModal } from '@/components/Modals/CroppingSizeModal';

type Props ={
  imageId:string
}

export const AspectRatio = ({imageId}:Props) => {
  const [openChangeSize, setOpenChangeSize] = useState(false);

  return (
    <Popover.Root onOpenChange={() => setOpenChangeSize(!openChangeSize)}>
      <Popover.Trigger>
        <svg
          className={s.cropping__icons}
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect opacity="0.8" width="36" height="36" rx="2" fill="#171717" />
          <g clipPath="url(#clip0_10893_17123)">
            <path
              d="M25.9999 11C25.9999 10.7348 25.8946 10.4804 25.707 10.2929C25.5195 10.1054 25.2652 10 24.9999 10H19.9999C19.7347 10 19.4804 10.1054 19.2928 10.2929C19.1053 10.4804 18.9999 10.7348 18.9999 11C18.9999 11.2652 19.1053 11.5196 19.2928 11.7071C19.4804 11.8946 19.7347 12 19.9999 12H22.5699L19.2899 15.29C19.1962 15.383 19.1218 15.4936 19.071 15.6154C19.0203 15.7373 18.9941 15.868 18.9941 16C18.9941 16.132 19.0203 16.2627 19.071 16.3846C19.1218 16.5064 19.1962 16.617 19.2899 16.71C19.3829 16.8037 19.4935 16.8781 19.6154 16.9289C19.7372 16.9797 19.8679 17.0058 19.9999 17.0058C20.132 17.0058 20.2627 16.9797 20.3845 16.9289C20.5064 16.8781 20.617 16.8037 20.7099 16.71L23.9999 13.42V16C23.9999 16.2652 24.1053 16.5196 24.2928 16.7071C24.4804 16.8946 24.7347 17 24.9999 17C25.2652 17 25.5195 16.8946 25.707 16.7071C25.8946 16.5196 25.9999 16.2652 25.9999 16V11Z"
              fill={openChangeSize ? '#397df6' : 'white'}
            />
            <path
              d="M16.71 19.2899C16.617 19.1962 16.5064 19.1218 16.3846 19.071C16.2627 19.0203 16.132 18.9941 16 18.9941C15.868 18.9941 15.7373 19.0203 15.6154 19.071C15.4936 19.1218 15.383 19.1962 15.29 19.2899L12 22.5699V19.9999C12 19.7347 11.8946 19.4804 11.7071 19.2928C11.5196 19.1053 11.2652 18.9999 11 18.9999C10.7348 18.9999 10.4804 19.1053 10.2929 19.2928C10.1054 19.4804 10 19.7347 10 19.9999V24.9999C10 25.2652 10.1054 25.5195 10.2929 25.707C10.4804 25.8946 10.7348 25.9999 11 25.9999H16C16.2652 25.9999 16.5196 25.8946 16.7071 25.707C16.8946 25.5195 17 25.2652 17 24.9999C17 24.7347 16.8946 24.4804 16.7071 24.2928C16.5196 24.1053 16.2652 23.9999 16 23.9999H13.42L16.71 20.7099C16.8037 20.617 16.8781 20.5064 16.9289 20.3845C16.9797 20.2627 17.0058 20.132 17.0058 19.9999C17.0058 19.8679 16.9797 19.7372 16.9289 19.6154C16.8781 19.4935 16.8037 19.3829 16.71 19.2899V19.2899Z"
              fill={openChangeSize ? '#397df6' : 'white'}
            />
          </g>
          <defs>
            <clipPath id="clip0_10893_17123">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(6 6)"
              />
            </clipPath>
          </defs>
        </svg>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent z-30" sideOffset={5}>
          <CroppingSizeModal imageId={imageId}/>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
