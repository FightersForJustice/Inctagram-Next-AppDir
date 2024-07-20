import React from 'react';
import { Loader } from '../Loader';
import { PaymentListRow, PaymentRow, UsersListRow } from './RowComponents';
import { PaymentType, RowType, UsersListType, UsersPaymentType } from './rowTypes';
import { useGetParams } from '@/utils/useGetParams';
import { useSetParams } from '@/utils/useSetParams';
import { headerList } from './headTypes';
import s from './MyPayments.module.scss';

const getBaseUrl: any = {
  PaymentsList: '/admin/paymentslist',
  UsersList: '/admin/userslist',
  Posts: '/admin/postslist',
};

export function Table<T extends PaymentType & UsersListType & UsersPaymentType>(
  props: React.PropsWithChildren<{
    data: Array<T>;
    headTitles: Array<string>;
    Row: RowType;
    setVisiblePopup: (value: boolean) => void;
    visiblePopup: boolean;
    setVisiblePopupId: (value: string) => void;
    setEditUser?: (value: string) => void;
    visiblePopupId: string;
    setShowAreYouSureModal?: (value: boolean) => void;
  }>
) {
  const url = useGetParams();
  const [sortedBy, setSort] = React.useState({ sortBy: '', direction: 'asc' });
  const [currentId, setCurrentId] = React.useState();
  const setSorting = (e: string) => {
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
          const clickedValue = headerList[props.Row][i];
          return (
            <div
              key={i}
              onClick={() => {
                setSorting(clickedValue);
              }}
              style={{ cursor: 'pointer' }}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className={s.tableBody}>
        {props.data.length
          ? // mapping rows
            props.data.map((payment, index) => {
              const RowTypes: any = {
                Payment: <PaymentRow el={payment} />,
                PaymentsList: <PaymentListRow el={payment} />,
                UsersList: (
                  <UsersListRow
                    visiblePopup={props.visiblePopup}
                    setVisiblePopup={props.setVisiblePopup}
                    visiblePopupId={props.visiblePopupId}
                    setVisiblePopupId={props.setVisiblePopupId}
                    setEditUser={props.setEditUser}
                    el={{
                      ...payment,
                      currentActionId: currentId,
                      moreAction: setCurrentId,
                    }}
                    setShowAreYouSureModal={props.setShowAreYouSureModal}
                  />
                ),
              };
              return (
                <div key={index} className={s.tableBodyItem}>
                  {RowTypes[props.Row]}
                </div>
              );
            })
          : // <Loader />
            null}
      </div>
    </div>
  );
}
