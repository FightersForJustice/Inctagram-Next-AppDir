import { TranslateTextClientComponent } from '@/helpers/ClientComponents/TranslateTextClientComponent';

import s from './UserInfoProfile.module.scss';

export const UserInfoProfile = ({
  aboutMe,
}: {
  aboutMe: string | undefined;
}) => {
  return (
    <p className={s.profileDesc} id={'profile-aboutMe'}>
      {aboutMe ?? (
        <TranslateTextClientComponent
          useTranslationsPage="MyProfilePage"
          text="aboutMe"
        />
      )}
    </p>
  );
};
