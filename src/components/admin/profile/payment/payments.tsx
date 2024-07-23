'use client';

import React from 'react';
import { Pagination } from '@/components/Pagination/Pagination';
import { headerList } from '@/components/Table/headTypes';
import {
  PaymentType,
  ResultUserPaymentsType,
  UsersListType,
  UsersPaymentType,
} from '@/components/Table/rowTypes';
import { Table } from '@/components/Table/Table';
import { useGetParams } from '@/utils/useGetParams';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
  const { data, loading, error, refetch } = useGetPaymentsByUserQueryQuery({
    variables: currentParams?.length
      ? {
          userId: Number(id),
          pageSize: 10,
          pageNumber: 1,
          sortBy: getSortValues ? getSortValues[1] : '',
          sortDirection: getSortDirection
            ? (getSortDirection[1] as SortDirection)
            : ('desc' as SortDirection),
        }
      : { userId: Number(id) },
  });
  const tableVariant = 'UserPayments';
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(5);
  // for pagination
  const lastPaymentIndex = currentPage * paymentsPerPage;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
        setCurrentPage={setCurrentPage}
        paginate={paginate}
        totalPayments={data ? data.getPaymentsByUser.totalCount : 0}
        paymentsPerPage={paymentsPerPage}
        setPaymentsPerPage={setPaymentsPerPage}
      />
    </div>
  );
};
