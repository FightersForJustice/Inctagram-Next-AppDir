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
  console.log('clicked to: ', textRef)
  return (
    <li className={className} onClick={() => actionsHandler(textRef)}>
      {/* <Link href={ link } > */}
        <Image src={img} width={24} height={24} alt={textRef} />
        <span>{tf('mobileMenu.' + textRef)}</span>
      {/* </Link> */}
    </li>
  );
};
