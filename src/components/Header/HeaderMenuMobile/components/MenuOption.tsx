import Image from 'next/image';
import { useTranslation } from 'react-i18next';

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
  const translate = (key: string): string => t(`Headern.${key}`);

  return (
    <li className={className} onClick={() => actionsHandler(textRef)}>
      <Image src={img} width={24} height={24} alt={textRef} />
      <span>{translate('mobileMenu.' + textRef)}</span>
    </li>
  );
};
