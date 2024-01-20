import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { ProfilePaidMark } from '@/components/SVGs/ProfilePaidMark';

import s from './UserNameProfile.module.scss';
import { useTranslation } from 'react-i18next';

export const UserNameProfile = ({
  userName,
  paidAccount,
}: {
  userName: string | undefined;
  paidAccount: boolean;
}) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  return (
    <div className={s.profileTitleContainer}>
      <div className={s.profileTitle}>
        <p id={'profile-userName'}>{userName ?? 'User Name'}</p>
        {paidAccount && <ProfilePaidMark />}
      </div>
      <ButtonLink
        link="/my-profile/settings-profile/general-information"
        className={s.profileBtn}
        id="profile-link-to-settings-profile"
        btnName={translate('btnName')}
        useTranslationsPage="MyProfilePage"
      ></ButtonLink>
    </div>
  );
};
