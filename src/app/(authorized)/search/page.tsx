import { SearchContent } from './SearchContent';

import s from './Search.module.scss';
import { headers } from 'next/headers';

const Page = async () => {
  const headersList = headers();
  const token = headersList.get('accessToken');

  return (
    <div className={s.container}>
      <div className={s.wrapper} id={'wrapper'}>
        <SearchContent accessToken={token} />
      </div>
    </div>
  );
};

export default Page;
