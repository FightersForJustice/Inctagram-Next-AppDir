import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import s from '../../CreatePost.module.scss';
import { InputRange } from '@/components/InputRange';

type Props = {
  onZoomImage: (value: string) => void;
  zoomImage: string;
};

export const Range: React.FC<Props> = ({ onZoomImage, zoomImage }) => {
  const [openZoom, setOpenZoom] = useState(false);

  return (
    <Popover.Root onOpenChange={() => setOpenZoom(!openZoom)}>
      <Popover.Trigger>
        <svg
          className={s.cropping__icon2}
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect opacity="0.8" width="36" height="36" rx="2" fill="#171717" />
          <g clipPath="url(#clip0_10893_17124)">
            <path
              d="M26.71 25.29L23.31 21.9C24.407 20.5025 25.0022 18.7767 25 17C25 15.4178 24.5308 13.871 23.6518 12.5554C22.7727 11.2398 21.5233 10.2145 20.0615 9.60897C18.5997 9.00347 16.9911 8.84504 15.4393 9.15372C13.8874 9.4624 12.462 10.2243 11.3431 11.3431C10.2243 12.462 9.4624 13.8874 9.15372 15.4393C8.84504 16.9911 9.00347 18.5997 9.60897 20.0615C10.2145 21.5233 11.2398 22.7727 12.5554 23.6518C13.871 24.5308 15.4178 25 17 25C18.7767 25.0022 20.5025 24.407 21.9 23.31L25.29 26.71C25.383 26.8037 25.4936 26.8781 25.6154 26.9289C25.7373 26.9797 25.868 27.0058 26 27.0058C26.132 27.0058 26.2627 26.9797 26.3846 26.9289C26.5064 26.8781 26.617 26.8037 26.71 26.71C26.8037 26.617 26.8781 26.5064 26.9289 26.3846C26.9797 26.2627 27.0058 26.132 27.0058 26C27.0058 25.868 26.9797 25.7373 26.9289 25.6154C26.8781 25.4936 26.8037 25.383 26.71 25.29ZM11 17C11 15.8133 11.3519 14.6533 12.0112 13.6666C12.6705 12.6799 13.6075 11.9109 14.7039 11.4567C15.8003 11.0026 17.0067 10.8838 18.1705 11.1153C19.3344 11.3468 20.4035 11.9182 21.2426 12.7574C22.0818 13.5965 22.6532 14.6656 22.8847 15.8295C23.1162 16.9933 22.9974 18.1997 22.5433 19.2961C22.0892 20.3925 21.3201 21.3295 20.3334 21.9888C19.3467 22.6481 18.1867 23 17 23C15.4087 23 13.8826 22.3679 12.7574 21.2426C11.6321 20.1174 11 18.5913 11 17Z"
              fill={openZoom ? '#397df6' : 'white'}
            />
            <path
              d="M19 16H18V15C18 14.7348 17.8946 14.4804 17.7071 14.2929C17.5196 14.1054 17.2652 14 17 14C16.7348 14 16.4804 14.1054 16.2929 14.2929C16.1054 14.4804 16 14.7348 16 15V16H15C14.7348 16 14.4804 16.1054 14.2929 16.2929C14.1054 16.4804 14 16.7348 14 17C14 17.2652 14.1054 17.5196 14.2929 17.7071C14.4804 17.8946 14.7348 18 15 18H16V19C16 19.2652 16.1054 19.5196 16.2929 19.7071C16.4804 19.8946 16.7348 20 17 20C17.2652 20 17.5196 19.8946 17.7071 19.7071C17.8946 19.5196 18 19.2652 18 19V18H19C19.2652 18 19.5196 17.8946 19.7071 17.7071C19.8946 17.5196 20 17.2652 20 17C20 16.7348 19.8946 16.4804 19.7071 16.2929C19.5196 16.1054 19.2652 16 19 16Z"
              fill={openZoom ? '#397df6' : 'white'}
            />
          </g>
          <defs>
            <clipPath id="clip0_10893_17124">
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
          <InputRange onZoomImage={onZoomImage} zoomImage={zoomImage} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
