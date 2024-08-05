'use client';

import { useState } from 'react';
import { Pagination } from '@/components/newPagination/pagination';
import { dateToFormat } from '@/utils/dateToFormat';

import { PaymentsType } from '@/app/(authorized)/profile/settings-profile/types';
import { useTranslation } from 'react-i18next';
import s from './MyPayments.module.scss';

export const MyPaymentsTab = ({ data }: { data: Array<PaymentsType> }) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.MyPaymentsTab.${key}`);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(5);
  const lastPaymentIndex = currentPage * paymentsPerPage;
  const firstPaymentIndex = lastPaymentIndex - paymentsPerPage;
  const currentData = data.slice(firstPaymentIndex, lastPaymentIndex);

  if (currentData.length === 0) {
    setCurrentPage(1);
  }

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
          {currentData.map((payment, index) => {
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
          }
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paymentsPerPage={paymentsPerPage}
        setPaymentsPerPage={setPaymentsPerPage}
        totalCount={data.length}
      />
    </>
  );
};