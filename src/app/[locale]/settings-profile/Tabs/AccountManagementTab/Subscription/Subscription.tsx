import React from "react";
import { ManagementCheckbox } from "../ManagementCheckbox/ManagementCheckbox";

import s from "./Subscription.module.scss";
import { formatSubscriptionDate } from "../../../../../../utils/formatSubscriptionDate";

type Props = {
  dateOfPayment: string | undefined;
  expireAt: string | undefined;
  autoRenewal: boolean;
};

export const Subscription: React.FC<Props> = ({ dateOfPayment, autoRenewal, expireAt }) => {
  const formattedDateOfPayment = formatSubscriptionDate(dateOfPayment!);
  const formattedExpireAtPayment = formatSubscriptionDate(expireAt!);

  return (
    <>
      <div className={s.subscription}>
        <p className={s.subscription__title}>Current Subscription:</p>
        <div className={s.subscription__wrapper}>
          <div className={s.subscription__container}>
            <p className={s.subscription__container__text}>Date of payment</p>
            <p className={s.subscription__container__data}>{formattedDateOfPayment}</p>
          </div>
          <div className={s.subscription__container}>
            <p className={s.subscription__container__text}>Expire at</p>
            <p className={s.subscription__container__data}>{formattedExpireAtPayment}</p>
          </div>
        </div>
      </div>

      <ManagementCheckbox autoRenewal={autoRenewal} />
    </>
  );
};
