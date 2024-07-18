import React from 'react';
import { Loader } from '../Loader';
import { PaymentRow, UsersListRow } from './RowComponents';
import { PaymentType, RowType, UsersListType } from './rowTypes';
import { useGetParams } from '@/utils/useGetParams';
import { useSetParams } from '@/utils/useSetParams';
import { headerList } from './headTypes';
import s from './MyPayments.module.scss';

const getBaseUrl = {
  Payment: '/admin/paymentslist',
  UsersList: '/admin/userslist',
  Posts: '/admin/postslist',
};

export function Table<T extends PaymentType & UsersListType>(
  props: React.PropsWithChildren<{
    data: Array<T>;
    headTitles: Array<string>;
    Row: RowType;
  }>
) {
  const url = useGetParams();
  const [sortedBy, setSort] = React.useState({ sortBy: '', direction: 'asc' });
  const [currentId, setCurrentId] = React.useState();
  const setSorting = (e: string) => {
    // const currentSort = decksMockHeader[e()[0].id as keyof TableHeadType];
    // console.log(2, currentSort)
    if (sortedBy.sortBy === e) {
      if (sortedBy.direction === 'asc') {
        return setSort({ sortBy: e, direction: 'desc' });
      }
      return setSort({ sortBy: '', direction: 'asc' });
    }
    setSort({ sortBy: e, direction: 'asc' });
  };
  useSetParams({
    key: 'sortBy',
    value: `${sortedBy.sortBy}`,
    direction: 'sortDirection',
    directionValue: `${sortedBy.direction}`,
    set: !!sortedBy.sortBy,
    baseUrl: getBaseUrl[props.Row],
  });

  React.useEffect(() => {
    if (url === null) {
      setSort({ sortBy: '', direction: 'asc' });
    }
  }, [url]);
  return (
    <div className={s.table}>
      <div className={s.tableHeader}>
        {props.headTitles.map((el, i) => {
          const clickedValue = headerList[props.Row][i]
          return (
            <div
              key={i}
              onClick={() => setSorting(clickedValue)}
              style={{ cursor: 'pointer' }}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className={s.tableBody}>
        {props.data.length ? (
          // mapping rows
          props.data.map((payment, index) => {
            const RowTypes: any = {
              Payment: <PaymentRow el={payment} />,
              UsersList: (
                <UsersListRow
                  el={{
                    ...payment,
                    currentActionId: currentId,
                    moreAction: setCurrentId,
                  }}
                />
              ),
            };
            return (
              <div key={index} className={s.tableBodyItem}>
                {RowTypes[props.Row]}
              </div>
            );
          })
        ) : (
          // <Loader />
         null
        )}
      </div>
    </div>
  );
}
