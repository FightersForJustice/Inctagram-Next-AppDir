import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import clsx from 'clsx';

import s from '../HeaderMenuMobile.module.scss';

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
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Header.${key}`);
  const classNames = clsx(className, {
    [s.profileSettings]: textRef === 'profileSettings',
  });

  return (
    <li className={classNames} onClick={() => actionsHandler(textRef)}>
      <Image src={img} width={24} height={24} alt={textRef} />
      <span>{translate('mobileMenu.' + textRef)}</span>
    </li>
  );
};
