import { fetchGetMyProfile } from '@/app/lib/data';

import { GeneralInformationTab } from '@/components/ProfileSettings/Tabs/GeneralInformationTab';
import { headers } from 'next/headers';

export default async function GeneralInformation() {
  const accessToken = headers().get('accessToken');

  const userInfo = await fetchGetMyProfile(accessToken);

  console.log('userInfo', userInfo);

  return (
    <>
      <GeneralInformationTab userInfo={userInfo} />
    </>
  );
}
