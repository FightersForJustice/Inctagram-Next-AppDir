import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { PaymentListRow, PaymentRow, UsersListRow } from './RowComponents';
import {
  PaymentType,
  RowType,
  UsersListType,
  UsersPaymentType,
} from './rowTypes';
import { useGetParams } from '@/utils/useGetParams';
import { useSetParams } from '@/utils/useSetParams';
import { headerList } from './headTypes';
import Image from 'next/image';
import s from './MyPayments.module.scss';
import clsx from 'clsx';
import { SortDirection } from '@/types';

const getBaseUrl: any = {
  PaymentsList: '/admin/paymentslist',
  UsersList: '/admin/userslist',
  Posts: '/admin/postslist',
  Payment: '/profile/settings-profile/my-payments',
};

export function Table<T extends PaymentType & UsersListType & UsersPaymentType>(
  props: React.PropsWithChildren<{
    data: Array<T>;
    headTitles: Array<string>;
    Row: RowType;
    setVisiblePopup?: (value: boolean) => void;
    visiblePopup?: boolean;
    setVisiblePopupId?: (value: string) => void;
    setEditUser?: (value: string) => void;
    visiblePopupId?: string;
    setShowAreYouSureModal?: (value: boolean) => void;
  }>
) {
  const url = useGetParams();
  let currentParams = url
    ?.slice(1)
    .split('&')
    .map((el) => {
      return el.split('=');
    });
  const getSortValues = currentParams?.filter((el) => el[0] === 'sortBy')[0];
  const getSortDirection = currentParams?.filter(
    (el) => el[0] === 'sortDirection'
  )[0];
  const [sortedBy, setSort] = React.useState({
    sortBy: '',
    direction: 'desc' as SortDirection,
  });
  const [currentId, setCurrentId] = React.useState();
  const setSorting = (e: string) => {
    if (sortedBy.sortBy === e) {
      if (sortedBy.direction === 'asc') {
        return setSort({ sortBy: e, direction: 'desc' as SortDirection });
      }
      return setSort({ sortBy: '', direction: 'asc' as SortDirection });
    }
    setSort({ sortBy: e, direction: 'asc' as SortDirection });
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
      setSort({ sortBy: '', direction: 'asc' as SortDirection });
    }
    setSort({
      sortBy: getSortValues ? getSortValues[1] : '',
      direction: getSortDirection
        ? (getSortDirection[1] as SortDirection)
        : ('desc' as SortDirection),
    });
  }, [url]);

  return (
    <div className={s.table}>
      <div className={s.tableHeader}>
        {props.headTitles.map((el, i) => {
          const clickedValue = headerList[props.Row][i];
          const classNames = clsx(s.icon, {
            [s.icon__hide]: sortedBy.sortBy !== headerList[props.Row][i],
            [s.icon__rotate]:
              sortedBy.sortBy === headerList[props.Row][i] &&
              sortedBy.direction === 'asc',
          });
          const containerStyle = clsx(s.icon, {
            [s.icon__hide]: sortedBy.sortBy !== headerList[props.Row][i],
            [s.icon__rotate]:
              sortedBy.sortBy === headerList[props.Row][i] &&
              sortedBy.direction === 'asc',
          });
          return (
            <div
              key={i}
              onClick={() => {
                setSorting(clickedValue);
              }}
              className={s.headerContainer}
            >
              {el}
              <Image
                alt={'arrowSort'}
                width={20}
                height={20}
                src={'/img/arrowDown-light.svg'}
                className={classNames}
              />
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
                    visiblePopup={
                      props.visiblePopup ? props.visiblePopup : false
                    }
                    setVisiblePopup={
                      props.setVisiblePopup ? props.setVisiblePopup : () => {}
                    }
                    visiblePopupId={
                      props.visiblePopupId ? props.visiblePopupId : ''
                    }
                    setVisiblePopupId={
                      props.setVisiblePopupId
                        ? props.setVisiblePopupId
                        : () => {}
                    }
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
