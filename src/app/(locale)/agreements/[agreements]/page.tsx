'use client';
import { Agreements } from '@/components/auth';
import { useTranslation } from 'react-i18next';

type Props = {
  params: {
    agreements:
      | 'privacy-policy'
      | 'terms-of-service'
      | 'privacy-policy-profile';
  };
};

const AgreementsPage = (props: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`AgreementsPage.${key}`);
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
        text={translate('TermsOfService.text')}
        title={translate('TermsOfService.title')}
        btnName={translate('btnName')}
      />
    );
  }
};

export default AgreementsPage;
