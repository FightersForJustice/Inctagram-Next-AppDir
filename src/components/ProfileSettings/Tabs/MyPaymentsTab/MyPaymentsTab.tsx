'use client';

import { useState } from 'react';
import { Loader } from '@/components/Loader';
import { Pagination } from '@/components/Pagination/Pagination';
import { dateToFormat } from '@/utils/dateToFormat';

import { PaymentsType } from '@/app/(authorized)/profile/settings-profile/types';
import { useTranslation } from 'react-i18next';
import s from './MyPayments.module.scss';
import { fakeDataForTesting } from './myPaymentsDATA';

export const MyPaymentsTab = ({ data }: { data: Array<PaymentsType> }) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.MyPaymentsTab.${key}`);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(5);
  const lastPaymentIndex = currentPage * paymentsPerPage;
  const firstPaymentIndex = lastPaymentIndex - paymentsPerPage;
  const currentData = data.length ? data.slice(firstPaymentIndex, lastPaymentIndex) : []
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={s.table}>
        <div className={s.tableHeader}>
            <div>{translate('DateOfPayment')}</div>
            <div>{translate('EndOfPayment')}</div>
            <div>{translate('Price')}</div>
            <div>{translate('Period')}</div>
            <div>{translate('Type')}</div>
        </div>
        <div className={s.tableBody}>
          {currentData.length ? (
            currentData.map((payment, index) => {
              return (
                <div key={index} className={s.tableBodyItem}>
                  <div>{dateToFormat(payment.dateOfPayment)}</div>
                  <div>{dateToFormat(payment.endDateOfSubscription)}</div>
                  <div>${payment.price}</div>
                  <div>{payment.subscriptionType}</div>
                  <div>{payment.paymentType}</div>
                </div>
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
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