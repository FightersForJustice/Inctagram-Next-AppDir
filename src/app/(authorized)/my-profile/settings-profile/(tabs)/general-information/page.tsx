import { headers } from 'next/headers';

import { fetchGetMyProfile } from '@/app/lib/data';
import {
  ResponseCountries,
  UserProfileResponse,
} from '@/app/lib/dataResponseTypes';
import { GeneralInformationTab } from '@/components/ProfileSettings/Tabs/GeneralInformationTab/GeneralInformationTab';
import { fetchCountriesList } from '@/app/lib/actions';

export default async function GeneralInformation() {
  const accessToken = headers().get('accessToken');

  const [userInfo, countriesList]: [
    userInfo: UserProfileResponse,
    countriesList: ResponseCountries,
  ] = await Promise.all([fetchGetMyProfile(accessToken), fetchCountriesList()]);

  return (
    <>
      <GeneralInformationTab
        countriesList={countriesList}
        userInfo={{ ...userInfo }}
      />
    </>
  );
}
