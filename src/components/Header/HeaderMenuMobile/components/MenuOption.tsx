import { useTranslations } from 'next-intl';
import Image from 'next/image';

import s from '../HeaderMenuMobile.module.scss';
import clsx from 'clsx';

type OptionType = {
  className: string;
  textRef: string;
  img: string;
  actionsHandler: (value: string) => void;
};

export const MenuOption = ({
  className,
  textRef,
  img,
  actionsHandler,
}: OptionType) => {
  const tf = useTranslations('Header');
  const classNames = clsx(className, {
    [s.profileSettings]: textRef === 'profileSettings',
  });

  return (
    <li className={classNames} onClick={() => actionsHandler(textRef)}>
      <Image src={img} width={24} height={24} alt={textRef} />
      <span>{tf('mobileMenu.' + textRef)}</span>
    </li>
  );
};
