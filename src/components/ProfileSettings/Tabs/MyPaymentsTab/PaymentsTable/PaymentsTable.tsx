'use client';

import { dateToFormat } from '@/utils/dateToFormat';
import { PaymentsType } from '@/app/(authorized)/profile/settings-profile/types';
import s from './PaymentsTable.module.scss';

type Props = {
  currentData: Array<PaymentsType>,
  tableHeaderData: string[]
}

export const PaymentsTable = ({ currentData, tableHeaderData }: Props) => {
  return (
    <div className={s.table}>
      <div className={s.tableHeader}>
        {tableHeaderData.map((i, index) =>
          <div key={index}>{i}</div>,
        )}
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
  );
};