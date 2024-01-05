import { headers } from 'next/headers';
import { SideBar } from './SideBar';

type Props = {
  paidAccount: boolean;
};

export const ServerSideBar = ({ paidAccount }: Props) => {
  const headersList = headers();
  const id = headersList.get('id');

  return (
    <>
      <SideBar paidAccount={paidAccount} id={id} />
    </>
  );
};
