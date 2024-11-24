import { headers } from 'next/headers';
import { Dialogs } from '@/app/(authorized)/messenger/dialogs/Dialogs';

const Messenger = () => {
  const headersList = headers();
  const accessToken = headersList.get('accessToken') as string;
  const id = headersList.get('id');

  return <Dialogs accessToken={accessToken} id={id} />;
};

export default Messenger;