import { useGetPaymentsQuery } from '@/api';
import * as Tabs from '@radix-ui/react-tabs';
import s from '@/app/[locale]/settings-profile/Tabs/MyPayments.module.scss';
import React, { useState } from 'react';
import { fakeDataForTesting } from '@/app/[locale]/settings-profile/Tabs/myPaymentsDATA';
import { Loader } from '@/components/Loader';
import { Pagination } from '@/components/Pagination/Pagination';
import { dateToFormat } from '@/utils/dateToFormat';

export const MyPayments = () => {
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
    <Tabs.Content className={s.TabsContent} value="myPayments">
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
    </Tabs.Content>
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
