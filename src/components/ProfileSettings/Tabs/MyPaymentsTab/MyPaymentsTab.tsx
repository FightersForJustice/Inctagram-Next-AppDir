'use client';

import { useState } from 'react';
import { Pagination } from '@/components/Pagination/Pagination';

import { PaymentsType } from '@/app/(authorized)/profile/settings-profile/types';
import { useTranslation } from 'react-i18next';
import { fakeDataForTesting } from './myPaymentsDATA';
import { Table } from '@/components/Table/Table';
import { headerList } from '@/components/Table/headTypes';
import { UsersListType, UsersPaymentType, ResultUserPaymentsType } from '@/components/Table/rowTypes';
import { Follow } from '@/types';

export const MyPaymentsTab = ({ data }: { data: Array<PaymentsType> }) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.MyPaymentsTab.${key}`);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(5);
  const lastPaymentIndex = currentPage * paymentsPerPage;
  const firstPaymentIndex = lastPaymentIndex - paymentsPerPage;
  const currentData = data.length
    ? data.slice(firstPaymentIndex, lastPaymentIndex).map((el)=>{
      const resultData = {} as UsersListType;
      const resultData1 = {} as UsersPaymentType;
      const resultData2 = {} as Follow;
      const resultData4 = {} as ResultUserPaymentsType;
      return Object.assign(el, resultData, resultData1, resultData2, resultData4);
    })
    : [];
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const tableVariant = 'Payment'
  const resultHeaderTitle = headerList[tableVariant].map((el)=>{
    return translate(el)
  })
  return (
    <>
      <Table
        data={currentData}
        headTitles={resultHeaderTitle}
        Row={tableVariant}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginate={paginate}
        totalPayments={data ? data?.length : [].length}
        paymentsPerPage={paymentsPerPage}
        setPaymentsPerPage={setPaymentsPerPage}
      />
    </>
  );
};
