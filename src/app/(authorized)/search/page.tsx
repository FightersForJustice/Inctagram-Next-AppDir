import { SearchContent } from './SearchContent';

import s from './Search.module.scss';
import { getUsers } from '@/app/(authorized)/search/SearchContent/actions';
import { UsersDataType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

interface Params {
  searchParams: {
    search: string;
    pageSize: number;
    pageNumber: number;
    cursor: number;
  };
}

const Page = async ({ searchParams }: Params) => {
  const { search, pageSize, pageNumber, cursor } = searchParams;
  const { items }: UsersDataType = await getUsers(
    search,
    pageSize,
    pageNumber,
    cursor
  );

  return (
    <div className={s.container}>
      <div className={s.wrapper} id={'wrapper'}>
        <SearchContent users={items} />
      </div>
    </div>
  );
};

export default Page;
