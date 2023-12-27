'use client';
import { useTranslations } from 'next-intl';
import { Agreements } from '@/components/auth';

type Props = {
  params: {
    agreements: 'privacy-policy' | 'terms-of-service';
  };
};

const AgreementsPage = (props: Props) => {
  const t = useTranslations('AgreementsPage');

  if (props.params.agreements === 'privacy-policy') {
    return (
      <Agreements
        text={t('PrivacyPolicy.text')}
        title={t('PrivacyPolicy.title')}
        btnName={t('btnName')}
      />
    );
  }
  if (props.params.agreements === 'terms-of-service') {
    return (
      <Agreements
        text={t('TermsOfService.text')}
        title={t('TermsOfService.title')}
        btnName={t('btnName')}
      />
    );
  }
};

export default AgreementsPage;
