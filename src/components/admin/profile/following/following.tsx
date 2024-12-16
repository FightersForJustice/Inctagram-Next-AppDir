'use client';

import React from 'react';
import { Pagination } from '@/components/newPagination';
import { headerList } from '@/components/Table/headTypes';
import {
  ResultUserPaymentsType,
  UsersListType,
  UsersPaymentType,
} from '@/components/Table/rowTypes';
import { Table } from '@/components/Table/Table';
import { useGetParams } from '@/utils/useGetParams';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SortDirection } from '@/types';
import { useGetFollowingListQuery } from '@/queries/followers/followers.generated';

export const FollowingClient = ({ id }: { id: string }) => {
  const url = useGetParams();
  const urlParams = useSearchParams()!;
  const params = new URLSearchParams(urlParams.toString());
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

  const optionsSelect = [
    { label: '10', value: '10' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
  ];

  const tableVariant = 'UserFollowing';
  const [currentPage, setCurrentPage] = useState(
    Number(urlParams.get('pageNumber')) !== null &&
      Number(urlParams.get('pageNumber')) !== 0
      ? Number(urlParams.get('pageNumber'))
      : 1
  );
  const [followingsPerPage, setFollowingsPerPage] = useState(
    Number(urlParams.get('pageSize')) !== null &&
      Number(urlParams.get('pageSize')) !== 0
      ? Number(urlParams.get('pageSize'))
      : 10
  );

  const getSortValues = currentParams?.filter((el) => el[0] === 'sortBy')[0];
  const getPageSize = currentParams?.filter((el) => el[0] === 'pageSize')[0];
  const getSearchValue = currentParams?.filter(
    (el) => el[0] === 'searchTerm'
  )[0];
  const getSortDirection = currentParams?.filter(
    (el) => el[0] === 'sortDirection'
  )[0];
  const { data, loading, error, refetch } = useGetFollowingListQuery({
    variables: currentParams?.length
      ? {
          userId: Number(id),
          pageSize: followingsPerPage,
          pageNumber: currentPage,
          sortBy: getSortValues ? getSortValues[1] : '',
          sortDirection: getSortDirection
            ? (getSortDirection[1] as SortDirection)
            : ('desc' as SortDirection),
        }
      : { userId: Number(id) },
  });

  // for pagination
  const lastPaymentIndex = currentPage * followingsPerPage;
  const paginate = (pageNumber: number) => {
    params.set('pageNumber', pageNumber.toString());
    setCurrentPage(pageNumber);
    return nextRouter.push(`?${params.toString()}`);
  };

  const usersFollowingData = data
    ? data.getFollowing.items.map((el) => {
        const correctData = {
          id: el.id,
          userId: el.userId,
          userName: el.userName,
          createdAt: el.createdAt,
        };
        const resultData = {} as UsersListType;
        const resultData1 = {} as UsersPaymentType;
        const resultData2 = {} as ResultUserPaymentsType;
        return Object.assign(resultData, resultData1, correctData, resultData2);
      })
    : [];
  const resultHeaderTitle = headerList[tableVariant].map((el) => {
    return translate(el);
  });

  React.useEffect(() => {
    refetch();
  }, [url, refetch]);

  console.log(params);

  //react select issue
  //https://github.com/ndom91/react-timezone-select/issues/108
  return (
    <div>
      <Table
        data={usersFollowingData}
        headTitles={resultHeaderTitle}
        Row={tableVariant}
        id={id}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={paginate}
        paymentsPerPage={followingsPerPage}
        setPaymentsPerPage={setFollowingsPerPage}
        totalCount={data ? data.getFollowing.totalCount : 0}
        options={optionsSelect}
      />
    </div>
  );
};
