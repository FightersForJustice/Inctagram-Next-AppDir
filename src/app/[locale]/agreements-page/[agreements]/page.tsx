'use client';
import { useTranslations } from 'next-intl';
import { Agreements } from './Agreements';

type Props = {
  params: {
    agreements:
      | 'privacy-policy'
      | 'terms-of-service'
      | 'privacy-policy-profile';
  };
};

const AgreementsPage = (props: Props) => {
  const t = useTranslations('AgreementsPage');

  if (
    props.params.agreements === 'privacy-policy' ||
    props.params.agreements === 'privacy-policy-profile'
  ) {
    return (
      <Agreements
        text={t('PrivacyPolicy.text')}
        title={t('PrivacyPolicy.title')}
        btnName={t(
          props.params.agreements === 'privacy-policy-profile'
            ? 'btnName1'
            : 'btnName'
        )}
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
