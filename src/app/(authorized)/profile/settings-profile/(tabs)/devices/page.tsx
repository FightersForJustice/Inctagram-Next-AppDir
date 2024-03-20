import { DevicesTab } from '@/components/ProfileSettings/Tabs/DevicesTab';
import { userSessions } from '@/components/ProfileSettings/Tabs/DevicesTab/actions';
import { headers } from 'next/headers';

export default async function Page() {
  const sessions = await userSessions();
  const headersList = headers();
  const userAgent = headersList.get('user-agent');

  if (userAgent) {
    return <DevicesTab userAgent={userAgent} sessions={sessions} />;
  } else {
    return <>Ошибка : Отсутствует заголовок headers</>;
  }
}
