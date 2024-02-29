'use client';
import { Agreements } from '@/components/auth';
import { useTranslation } from 'react-i18next';

const AgreementsPage = () => {
  console.log(2);
  const { t } = useTranslation();
  const translate = (key: string): string => t(`AgreementsPage.${key}`);
  return (
    <Agreements
      text={translate('PrivacyPolicy.text')}
      title={translate('PrivacyPolicy.title')}
      btnName={translate('btnName1')}
    />
  );
};

export default AgreementsPage;
