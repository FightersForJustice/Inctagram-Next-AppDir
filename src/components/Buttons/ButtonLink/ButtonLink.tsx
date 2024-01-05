import { useTranslations } from 'next-intl';
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
  const t = useTranslations(useTranslationsPage);

  return (
    <Link id={id} className={className} href={link}>
      {t(btnName)}
    </Link>
  );
};
