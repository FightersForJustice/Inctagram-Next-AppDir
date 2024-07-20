'use client';

import React from 'react';
import { Pagination } from '@/components/Pagination/Pagination';
import { headerList } from '@/components/Table/headTypes';
import { PaymentType, UsersListType, UsersPaymentType } from '@/components/Table/rowTypes';
import { Table } from '@/components/Table/Table';
import { useDebounce } from '@/utils/useDebaunce';
import { useGetParams } from '@/utils/useGetParams';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchInput } from './searchInput/searchInput';
import { Avatar, CurrencyType, SortDirection } from '@/types';
import { useGetPaymentsListQuery } from '@/queries/payments/payments.generated';
import s from './paymentsList.module.scss';

export const PaymentsListClient = () => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [visiblePopupId, setVisiblePopupId] = useState('');
  const urlParams = useSearchParams()!;
  const params = new URLSearchParams(urlParams.toString());
  const [currentUrlName, setCurrentUrlName] = React.useState(
    (urlParams.get('searchTerm') as string) !== null
      ? (urlParams.get('searchTerm') as string)
      : ''
  );
  let searchInputHandler = useDebounce(currentUrlName, 400);
  const setNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUrlName(event.currentTarget.value);
  };
  const url = useGetParams();
  const nextRouter = useRouter();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Admin.paypentlist.${key}`);
  // const translate = (key: string): string => t(`Admin.PaymentsList.${key}`);
  let currentParams = url
    ?.slice(1)
    .split('&')
    .map((el) => {
      return el.split('=');
    });

  const getSortValues = currentParams?.filter((el) => el[0] === 'sortBy')[0];
  const getPageSize = currentParams?.filter((el) => el[0] === 'pageSize')[0];
  const getSearchValue = currentParams?.filter(
    (el) => el[0] === 'searchTerm'
  )[0];
  const getSortDirection = currentParams?.filter(
    (el) => el[0] === 'sortDirection'
  )[0];
  const { data, loading, error, refetch } = useGetPaymentsListQuery({
    variables: currentParams?.length
      ? {
          pageSize: 10,
          pageNumber: 1,
          sortBy: getSortValues ? getSortValues[1] : '',
          sortDirection: getSortDirection
            ? (getSortDirection[1] as SortDirection)
            : ('desc' as SortDirection),
          searchTerm: getSearchValue ? getSearchValue[1] : '',
        }
      : {},
  });
  const tableVariant = 'PaymentsList';
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(5);
  // for pagination
  const lastPaymentIndex = currentPage * paymentsPerPage;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const usersPaymentsData = data
    ? data.getPayments.items.map((el) => {
        const correctData = {
          id: el.id,
          paymentMethod: el.paymentMethod,
          createdAt: el.createdAt,
          currency: el.currency ? el.currency : 'USD' as CurrencyType,
          endDate: el.endDate,
          amount: el.amount,
          type: el.type,
          userName: el.userName,
          avatars: el.avatars?.length ? el.avatars : [] as Array<Avatar>
        };
        const resultData = {} as PaymentType;
        const result1Data = {} as UsersListType;
        return Object.assign(correctData, resultData, result1Data);
      })
    : [];
  const resultHeaderTitle = headerList[tableVariant].map((el) => {
    return translate(el);
  });

  // reserve
  // const clearFiltersHandler = () => {
  //   nextRouter.replace('/admin/usersList');
  //   setCurrentUrlName('');
  // };

  React.useEffect(() => {
    params.set('searchTerm', searchInputHandler);
    if (!searchInputHandler.trim()) {
      params.delete('searchTerm');
    }
    setCurrentUrlName(searchInputHandler);
    nextRouter.push(`/admin/paymentslist?${params.toString()}`);
  }, [searchInputHandler]);

  React.useEffect(() => {
    refetch();
  }, [url, refetch]);

  //react select issue
  //https://github.com/ndom91/react-timezone-select/issues/108
  return (
    <div>
      <div className={s.container}>
        <SearchInput onChange={setNameHandler} />
      </div>
      <Table
        data={usersPaymentsData}
        headTitles={resultHeaderTitle}
        Row={tableVariant}
        visiblePopup={visiblePopup}
        setVisiblePopup={setVisiblePopup}
        visiblePopupId={visiblePopupId}
        setVisiblePopupId={setVisiblePopupId}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginate={paginate}
        totalPayments={data ? data.getPayments.totalCount : [].length}
        paymentsPerPage={paymentsPerPage}
        setPaymentsPerPage={setPaymentsPerPage}
      />
    </div>
  );
};
