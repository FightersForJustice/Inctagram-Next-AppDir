import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export const ButtonLink = ({
  btnName,
  link,
  useTranslationsPage,
  className,
  id,
}: {
  btnName: string;
  link: string;
  useTranslationsPage: string;
  className: string;
  id?: string;
}) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(useTranslationsPage + `.${key}`);
  return (
    <Link id={id} className={className} href={link}>
      {t(btnName)}
    </Link>
  );
};
