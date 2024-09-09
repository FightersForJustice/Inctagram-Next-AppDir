import { SearchContent } from './SearchContent';

import s from './Search.module.scss';
import { getUsersAction } from '@/app/(authorized)/search/SearchContent/actions';

interface Params {
  searchParams: {
    search: string;
  };
}

const Page = async ({ searchParams }: Params) => {
  const users = await getUsersAction(searchParams.search);

  return (
    <div className={s.container}>
      <div className={s.wrapper} id={'wrapper'}>
        <SearchContent users={users.items} />
      </div>
    </div>
  );
};

export default Page;
