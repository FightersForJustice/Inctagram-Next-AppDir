import { useTranslations } from 'next-intl';
import Image from 'next/image';

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
  return (
    <li className={className} onClick={() => actionsHandler(textRef)}>
      <Image src={img} width={24} height={24} alt={textRef} />
      <span>{tf('mobileMenu.' + textRef)}</span>
    </li>
  );
};
