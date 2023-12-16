import React from 'react';
import s from './HeaderMenuMobile.module.scss';

type ImageProps = {
  modal: boolean;
  setModal: (e: React.MouseEvent) => void;
};

export const MenuImage = ({ modal, setModal }: ImageProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={modal ? s.active : s.nonActive}
      onClick={setModal}
      xmlns="http://www.w3.org/2000/svg"
      id='dots'
    >
      <g clip-path="url(#clip0_43741_10677)">
        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" />
        <path d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z" />
        <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z" />
      </g>
      <defs>
        <clipPath id="clip0_43741_10677">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </svg>
  );
};
