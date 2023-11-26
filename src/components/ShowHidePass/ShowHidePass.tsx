import React from 'react';
import Image from 'next/image';

type Props = {
  show: boolean;
  setShow: (value: boolean) => void;
};

export const ShowHidePass: React.FC<Props> = ({ setShow, show }) => {
  return (
    <>
      {show ? (
        <Image
          src={'/img/showPass.svg'}
          alt={'showPass'}
          width={30}
          height={30}
          className={'absolute top-[3px] right-[24px] cursor-pointer'}
          onClick={() => setShow(!show)}
          id={'sign-up-password-showPassImage-closeAye'}
          draggable={'false'}
        />
      ) : (
        <Image
          src={'/img/hidePass.svg'}
          alt={'hidePass'}
          width={30}
          height={30}
          className={'absolute top-[3px] right-[24px] cursor-pointer'}
          onClick={() => setShow(!show)}
          id={'sign-up-password-showPassImage-openAye'}
          draggable={'false'}
        />
      )}
    </>
  );
};
