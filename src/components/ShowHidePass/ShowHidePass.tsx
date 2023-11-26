import React, { FC } from 'react';
import s from './ShowHidePass.module.scss';
import Image from 'next/image';

type Props = {
  show: boolean;
  setShow: (value: boolean) => void;
};

export const ShowHidePass: FC<Props> = ({ setShow, show }) => {
  return (
    <>
      {show ? (
        <Image
          src={'/img/showPass.svg'}
          alt={'showPass'}
          width={25}
          height={25}
          className={s.icon}
          onClick={() => setShow(!show)}
          id={'sign-up-password-showPassImage-closeAye'}
          draggable={false}
        />
      ) : (
        <Image
          src={'/img/hidePass.svg'}
          alt={'hidePass'}
          width={25}
          height={25}
          className={s.icon}
          onClick={() => setShow(!show)}
          id={'sign-up-password-showPassImage-openAye'}
          draggable={false}
        />
      )}
    </>
  );
};
