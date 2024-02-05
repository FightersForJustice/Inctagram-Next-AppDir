import s from './Alert.module.scss';
import close from 'public/img/close.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Errors.common.${key}`);
  const className = `${s.container} ${
    variant === 'error' ? s.error : s.success
  }`;
  return (
    <div className={className}>
      {closeButton && <Image src={close} alt="" className={s.closeIcon} />}
      {variant === 'error' && <strong>{translate('error')} </strong>}
      {text}
    </div>
  );
};
