'use client';

import React from 'react';
import { Pagination } from '@/components/Pagination/Pagination';
import { headerList } from '@/components/Table/headTypes';
import { PaymentType, UsersListType } from '@/components/Table/rowTypes';
import { Table } from '@/components/Table/Table';
import { useDebounce } from '@/utils/useDebaunce';
import { useGetParams } from '@/utils/useGetParams';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchInput } from './searchInput/searchInput';
import s from './usersList.module.scss';
import { useGetAllUsersQuery } from '@/queries/users/users.generated';
import { SortDirection, UserBlockStatus } from '@/types';

export const UsersListClient = () => {
  const urlParams = useSearchParams()!;
  const params = new URLSearchParams(urlParams.toString());
  const [currentName, setName] = React.useState('');
  const [currentUrlName, setCurrentUrlName] = React.useState(
    (urlParams.get('searchTerm') as string) !== null
      ? (urlParams.get('searchTerm') as string)
      : ''
  );
  let searchInputHandler = useDebounce(currentUrlName, 400);
  const setNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    setCurrentUrlName(event.currentTarget.value);
    setName(searchInputHandler);
  };
  const url = useGetParams();
  const nextRouter = useRouter();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Admin.${key}`);
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
  const { data, loading, error, refetch } = useGetAllUsersQuery({
    variables: currentParams?.length
      ? {
          pageSize: 10,
          pageNumber: 1,
          sortBy: getSortValues ? getSortValues[1] : '',
          sortDirection: getSortDirection
            ? (getSortDirection[1] as SortDirection)
            : ('desc' as SortDirection),
          searchTerm: getSearchValue ? getSearchValue[1] : '',
          statusFilter: 'ALL' as UserBlockStatus,
        }
      : {},
  });
  const tableVariant = 'UsersList';
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(5);
  const lastPaymentIndex = currentPage * paymentsPerPage;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const usersData = data
    ? data.getUsers.users.map((el) => {
        const correctData = {
          createdAt: el.createdAt,
          email: el.email,
          id: el.id,
          userBan: el.userBan
            ? {
                reason: el.userBan?.reason,
                createdAt: el.userBan.createdAt,
              }
            : null,
          userName: el.userName,
          profile: {
            userName: el.profile.userName,
          },
          moreAction: () => {},
          currentActionId: 0,
        };
        const resultData = {} as PaymentType;
        return Object.assign(correctData, resultData);
      })
    : [];
  const resultHeaderTitle = headerList[tableVariant].map((el) => {
    return translate(el);
  });

  const clearFiltersHandler = () => {
    nextRouter.replace('/admin/usersList');
    setCurrentUrlName('');
  };

  // React.useEffect(() => {
  //   if (error?.message) {
  //     //@ts-ignore
  //     toastWrapper(error?.response.data.errorMessages[0].message, true);
  //   }
  // }, [error]);

  React.useEffect(() => {
    params.set('searchTerm', searchInputHandler);
    if (!searchInputHandler.trim()) {
      params.delete('searchTerm');
    }
    setCurrentUrlName(searchInputHandler);
    setName(searchInputHandler);
    nextRouter.push(`/admin/userslist?${params.toString()}`);
  }, [searchInputHandler]);

  React.useEffect(() => {
    refetch();
  }, [url, refetch]);
  return (
    <div>
      <div className={s.container}>
        <SearchInput onChange={setNameHandler} />
        <div className={s.filter}>filter will be here</div>
      </div>
      <Table
        data={usersData}
        headTitles={resultHeaderTitle}
        Row={tableVariant}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginate={paginate}
        totalPayments={data ? data.getUsers.pagination.totalCount : [].length}
        paymentsPerPage={paymentsPerPage}
        setPaymentsPerPage={setPaymentsPerPage}
      />
    </div>
  );
};
