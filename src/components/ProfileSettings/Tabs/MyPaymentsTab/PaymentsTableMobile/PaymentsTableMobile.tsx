'use client';

import { dateToFormat } from '@/utils/dateToFormat';
import { PaymentsType } from '@/app/(authorized)/profile/settings-profile/types';
import s from './PaymentsTableMobile.module.scss';

type Props = {
  currentData: Array<PaymentsType>,
  tableHeaderData: string[]
}

export const PaymentsTableMobile = ({ currentData, tableHeaderData }: Props) => {
  return (
    <div className={s.tableWrapper}>
      {currentData.map((payment, index) => (
        <div key={index} className={s.table}>
          <div className={s.tableContent}>
            <div className={s.tableHeader}>
              {tableHeaderData.map((header, headerIndex) =>
                <div key={headerIndex} className={s.tableHeaderItem}>{header}:</div>,
              )}
            </div>
            <div className={s.tableBody}>
              <div className={s.tableBodyItem}>{dateToFormat(payment.dateOfPayment)}</div>
              <div className={s.tableBodyItem}>{dateToFormat(payment.endDateOfSubscription)}</div>
              <div className={s.tableBodyItem}>${payment.price}</div>
              <div className={s.tableBodyItem}>{payment.subscriptionType}</div>
              <div className={s.tableBodyItem}>{payment.paymentType}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};