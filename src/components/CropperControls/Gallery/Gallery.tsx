import { ImagesCollection } from '@/components/ImagesCollection';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';

import s from '../CreatePost.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  changeCurrentImage: (imageId: string) => void;
};
export const Gallery = ({ setStep, changeCurrentImage }: Props) => {
  const [openCollectionImages, setOpenCollectionImages] = useState(false);

  const closeGallery = () => {
    setOpenCollectionImages(false);
  };
  const openGallery = () => {
    setOpenCollectionImages(!openCollectionImages);
  };
  return (
    <Popover.Root onOpenChange={openGallery} open={openCollectionImages}>
      <Popover.Trigger>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(s.cropping__icon3, s.cropping_icons)}
        >
          <rect opacity="0.8" width="36" height="36" rx="2" fill="#171717" />
          <g clipPath="url(#clip0_10893_17125)">
            <path
              d="M24 9H12C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12V24C9 24.7956 9.31607 25.5587 9.87868 26.1213C10.4413 26.6839 11.2044 27 12 27H24C24.7956 27 25.5587 26.6839 26.1213 26.1213C26.6839 25.5587 27 24.7956 27 24V12C27 11.2044 26.6839 10.4413 26.1213 9.87868C25.5587 9.31607 24.7956 9 24 9ZM12 11H24C24.2652 11 24.5196 11.1054 24.7071 11.2929C24.8946 11.4804 25 11.7348 25 12V20.36L21.8 17.63C21.3042 17.222 20.6821 16.999 20.04 16.999C19.3979 16.999 18.7758 17.222 18.28 17.63L11 23.7V12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11ZM24 25H12.56L19.56 19.16C19.6945 19.0602 19.8575 19.0062 20.025 19.0062C20.1925 19.0062 20.3555 19.0602 20.49 19.16L25 23V24C25 24.2652 24.8946 24.5196 24.7071 24.7071C24.5196 24.8946 24.2652 25 24 25Z"
              fill={openCollectionImages ? '#397df6' : 'white'}
            />
            <path
              d="M14 16C14.8284 16 15.5 15.3284 15.5 14.5C15.5 13.6716 14.8284 13 14 13C13.1716 13 12.5 13.6716 12.5 14.5C12.5 15.3284 13.1716 16 14 16Z"
              fill={openCollectionImages ? '#397df6' : 'white'}
            />
          </g>
          <defs>
            <clipPath id="clip0_10893_17125">
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
        <Popover.Content className="z-30">
          <ImagesCollection
            closeGallery={closeGallery}
            changeCurrentImage={changeCurrentImage}
            setStep={setStep}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
