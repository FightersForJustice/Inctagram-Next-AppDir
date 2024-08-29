'use client';

import React from 'react';
import { Pagination } from '@/components/newPagination';
import { headerList } from '@/components/Table/headTypes';
import {
  PaymentType,
  ResultUserPaymentsType,
  UsersListType,
  UsersPaymentType,
} from '@/components/Table/rowTypes';
import { Table } from '@/components/Table/Table';
import { useDebounce } from '@/utils/useDebaunce';
import { useGetParams } from '@/utils/useGetParams';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, CurrencyType, Follow, SortDirection } from '@/types';
import { useGetPaymentsListQuery } from '@/queries/payments/payments.generated';
import s from './paymentsList.module.scss';
import { SearchInput } from '../shared/searchInput/searchInput';

export const PaymentsListClient = () => {
  const url = useGetParams();
  const nextRouter = useRouter();
  const { t } = useTranslation();
  const urlParams = useSearchParams()!;

  const optionsSelectPayments = [
    { label: '10', value: '10' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
  ];

  const [currentPage, setCurrentPage] = useState(
    Number(urlParams.get('pageNumber')) !== null &&
    Number(urlParams.get('pageNumber')) !== 0
      ? Number(urlParams.get('pageNumber'))
      : 1
  );
  const [paymentsPerPage, setPaymentsPerPage] = useState(
    Number(urlParams.get('pageSize')) !== null &&
      Number(urlParams.get('pageSize')) !== 0
      ? Number(urlParams.get('pageSize'))
      : 10
  );
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
  const translate = (key: string): string => t(`Admin.paypentlist.${key}`);
  let currentParams = url
    ?.slice(1)
    .split('&')
    .map((el) => {
      return el.split('=');
    });

  const getSortValues = currentParams?.filter((el) => el[0] === 'sortBy')[0];
  const getSearchValue = currentParams?.filter(
    (el) => el[0] === 'searchTerm'
  )[0];
  const getSortDirection = currentParams?.filter(
    (el) => el[0] === 'sortDirection'
  )[0];
  const { data, loading, error, refetch } = useGetPaymentsListQuery({
    variables: currentParams?.length
      ? {
          pageSize: paymentsPerPage,
          pageNumber: currentPage,
          sortBy: getSortValues ? getSortValues[1] : '',
          sortDirection: getSortDirection
            ? (getSortDirection[1] as SortDirection)
            : ('desc' as SortDirection),
          searchTerm: getSearchValue ? getSearchValue[1] : '',
        }
      : {},
  });
  const tableVariant = 'PaymentsList';
  const paginate = (pageNumber: number) => {
    params.set('pageNumber', pageNumber.toString());
    setCurrentPage(pageNumber);
    return nextRouter.push(`paymentslist?${params.toString()}`);
  };

  const paginatePageSize = (pageNumber: number) => {
    params.set('pageSize', pageNumber.toString());
    setPaymentsPerPage(pageNumber);
    return nextRouter.push(`paymentslist?${params.toString()}`);
  };

  const usersPaymentsData = data
    ? data.getPayments.items.map((el) => {
        const correctData = {
          id: el.id,
          paymentMethod: el.paymentMethod,
          createdAt: el.createdAt,
          currency: el.currency ? el.currency : ('USD' as CurrencyType),
          endDate: el.endDate,
          amount: el.amount,
          type: el.type,
          userName: el.userName,
          avatars: el.avatars?.length ? el.avatars : ([] as Array<Avatar>),
          price: el.amount,
        };
        const resultData = {} as PaymentType;
        const result1Data = {} as UsersListType;
        const result2Data = {} as ResultUserPaymentsType;
        const result3Data = {} as Follow;
        return Object.assign(
          correctData,
          resultData,
          result1Data,
          result2Data,
          result3Data
        );
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
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={paginate}
        paymentsPerPage={paymentsPerPage}
        setPaymentsPerPage={paginatePageSize}
        totalCount={data ? data.getPayments.totalCount : [].length}
        options={optionsSelectPayments}
      />
    </div>
  );
};
