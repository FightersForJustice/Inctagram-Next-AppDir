import { SettingsForm } from '../../SettingsForm/SettingsForm';
import {
  ResponseCountries,
  UserProfileResponse,
} from '@/app/lib/dataResponseTypes';
import { GeneralInformationAvatar } from './Avatar/GeneralInformationAvatar';

import s from '../Tabs.module.scss';

export const GeneralInformationTab = ({
  userInfo,
  countriesList,
}: {
  userInfo: UserProfileResponse;
  countriesList: ResponseCountries;
}) => {
  const { avatars } = userInfo;

  const currentAvatar = avatars && !!avatars.length ? avatars[0].url : null;

  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__left}>
        <GeneralInformationAvatar currentAvatar={currentAvatar} />
      </div>
      <div className={s.wrapper__right}>
        <SettingsForm
          countriesList={countriesList}
          userInfo={{ ...userInfo }}
        />
      </div>
    </div>
  );
};
