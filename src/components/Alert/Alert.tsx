import s from './Alert.module.scss';
import close from 'public/img/close.svg';
import Image from 'next/image';

type Props = {
  closeButton?: boolean;
  variant?: 'error' | 'success';
  text: string;
};
export const Alert = ({
  closeButton = false,
  variant = 'error',
  text,
}: Props) => {
  const className = `${s.container} ${
    variant === 'error' ? s.error : s.success
  }`;
  return (
    <div className={className}>
      {closeButton && <Image src={close} alt="" className={s.closeIcon} />}
      {variant === 'error' && <strong>Error! </strong>}
      {text}
    </div>
  );
};
