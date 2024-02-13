import { headers } from 'next/headers';
import { SideBar } from './SideBar';

type Props = {
  paidAccount: boolean;
};

export const ServerSideBar = ({ paidAccount }: Props) => {
  const headersList = headers();
  const idHeaders = headersList.get('id') as string;
  const id = parseInt(idHeaders, 10);

  return (
    <SideBar
      userEmail={headers().get('userEmail')}
      paidAccount={paidAccount}
      id={id}
    />
  );
};
