'use client';

import { useGetPaymentsQuery } from '@/api';
import { useState } from 'react';
import { fakeDataForTesting } from '@/components/ProfileSettings/Tabs/MyPaymentsTab/myPaymentsDATA';
import { Loader } from '@/components/Loader';
import { Pagination } from '@/components/Pagination/Pagination';
import { dateToFormat } from '@/utils/dateToFormat';

import s from './MyPayments.module.scss';

export const MyPaymentsTab = () => {
  const { data } = useGetPaymentsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(5);

  const lastPaymentIndex = currentPage * paymentsPerPage;
  const firstPaymentIndex = lastPaymentIndex - paymentsPerPage;
  const currentPayments = data?.length
    ? data?.slice(firstPaymentIndex, lastPaymentIndex)
    : fakeDataForTesting.slice(firstPaymentIndex, lastPaymentIndex);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={s.table}>
        <div className={s.tableHeader}>
          <div>Date Of Payment</div>
          <div>End Date Of Subscription</div>
          <div>Price</div>
          <div>Subscription Type</div>
          <div>Payment Type</div>
        </div>
        <div className={s.tableBody}>
          {currentPayments ? (
            currentPayments.map((payment, index) => {
              return (
                <div key={index} className={s.tableBodyItem}>
                  <div>{dateToFormat(payment.dateOfPayment)}</div>
                  <div>{dateToFormat(payment.endDateOfSubscription)}</div>
                  <div>{payment.price}</div>
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
        totalPayments={data ? data?.length : fakeDataForTesting.length}
        paymentsPerPage={paymentsPerPage}
        setPaymentsPerPage={setPaymentsPerPage}
      />
    </>
  );
};

interface myPaymentResponse extends myPayment {
  userId: number;
  subscriptionId: string;
}

export interface myPayment {
  dateOfPayment: string;
  endDateOfSubscription: string;
  price: number;
  subscriptionType: 'MONTHLY' | 'WEEKLY';
  paymentType: 'STRIPE' | 'PAYPAL';
}
