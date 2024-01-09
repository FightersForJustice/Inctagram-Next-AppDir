import { headers } from 'next/headers';

import { fetchGetMyProfile } from '@/app/lib/data';
import { UserProfileResponse } from '@/app/lib/dataResponseTypes';
import { GeneralInformationTab } from '@/components/ProfileSettings/Tabs/GeneralInformationTab/GeneralInformationTab';


export default async function GeneralInformation() {
  const accessToken = headers().get('accessToken');
  const userInfo : UserProfileResponse = await fetchGetMyProfile(accessToken);

  return (
    <>
      <GeneralInformationTab userInfo={{...userInfo}} />
    </>
  );
}
