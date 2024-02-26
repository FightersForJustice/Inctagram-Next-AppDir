import { headers } from 'next/headers';
import { SideBar } from './SideBar';
import { fetchGetMyProfile } from '@/app/lib/data';

type Props = {
  paidAccount: boolean;
};

export const ServerSideBar = async({ paidAccount }: Props) => {
  const headersList = headers();
  const idHeaders = headersList.get('id') as string;
  const id = parseInt(idHeaders, 10);

  const userData = await fetchGetMyProfile()

  return (
    <SideBar
      userEmail={headers().get('userEmail')}
      paidAccount={paidAccount}
      id={id}
      userData={userData}
    />
  );
};
