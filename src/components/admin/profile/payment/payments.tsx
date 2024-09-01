'use client';

import React, { useState } from 'react';
import { Pagination } from '@/components/newPagination';
import { headerList } from '@/components/Table/headTypes';
import {
  UsersListType,
  UsersPaymentType,
} from '@/components/Table/rowTypes';
import { Table } from '@/components/Table/Table';
import { useGetParams } from '@/utils/useGetParams';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  Follow,
  PaymentMethod,
  SortDirection,
  StatusSubscriptionType,
  SubscriptionType,
} from '@/types';
import {
  useGetPaymentsByUserQueryQuery,
} from '@/queries/payments/payments.generated';

export const PaymentsClient = ({ id }: { id: string }) => {
  const url = useGetParams();
  const urlParams = useSearchParams()!;
  const params = new URLSearchParams(urlParams.toString());
  const nextRouter = useRouter();
  const { t } = useTranslation();

  const optionsSelect = [
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
  const translate = (key: string): string => t(`Admin.paypentlist.${key}`);
  // const translate = (key: string): string => t(`Admin.PaymentsList.${key}`);
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
  const { data, loading, error, refetch } = useGetPaymentsByUserQueryQuery({
    variables: currentParams?.length
      ? {
        userId: Number(id),
        pageSize: paymentsPerPage,
        pageNumber: currentPage,
        sortBy: getSortValues ? getSortValues[1] : '',
        sortDirection: getSortDirection
          ? (getSortDirection[1] as SortDirection)
          : ('desc' as SortDirection),
      }
      : { userId: Number(id) },
  });

  const tableVariant = 'UserPayments';
  // for pagination
  const paginate = (pageNumber: number) => {
    params.set('pageNumber', pageNumber.toString());
    console.log(pageNumber)
    setCurrentPage(pageNumber);
    return nextRouter.push(`?${params.toString()}`);
  };

  const paginatePageSize = (pageNumber: number) => {
    params.set('pageSize', pageNumber.toString());
    setPaymentsPerPage(pageNumber);
    return nextRouter.push(`?${params.toString()}`);
  };
  const usersPaymentsData = data
    ? data.getPaymentsByUser.items.map((el) => {
      const correctData = {
        dateOfPayment: el.dateOfPayment,
        endDateOfSubscription: '',
        price: el.price,
        subscriptionType: '',
        paymentType: el.paymentType as PaymentMethod,

        status: 'ACTIVE' as StatusSubscriptionType,
        businessAccountId: 1,
        startDate: el.startDate,
        endDate: el.endDate,
        type: el.type as SubscriptionType,
      };
      const resultData = {} as UsersListType;
      const resultData1 = {} as UsersPaymentType;
      const resultData2 = {} as Follow;
      return Object.assign(resultData2, resultData, resultData1, correctData);
    })
    : [];
  const resultHeaderTitle = headerList[tableVariant].map((el) => {
    return translate(el);
  });

  React.useEffect(() => {
    refetch();
  }, [url, refetch]);

  //react select issue
  //https://github.com/ndom91/react-timezone-select/issues/108
  return (
    <div>
      <Table
        data={usersPaymentsData}
        headTitles={resultHeaderTitle}
        Row={tableVariant}
        id={id}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={paginate}
        paymentsPerPage={paymentsPerPage}
        setPaymentsPerPage={paginatePageSize}
        totalCount={data ? data.getPaymentsByUser.totalCount : 0}
        options={optionsSelect}
      />
    </div>
  );
};
