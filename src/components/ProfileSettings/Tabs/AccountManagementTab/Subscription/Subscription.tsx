import { ManagementCheckbox } from '../ManagementCheckbox/ManagementCheckbox';

import s from './Subscription.module.scss';
import { formatSubscriptionDate } from '@/utils';

type Props = {
  dateOfPayment: string | undefined;
  expireAt: string | undefined;
  autoRenewal: boolean;
  name: string
  expiredStart: string
  expiredEnd: string
  renewalTitle: string
  autoRenewalHandler: (checked: boolean) => void
};

export const Subscription = ({
  dateOfPayment,
  autoRenewal,
  expireAt,
  name,
  expiredEnd,
  expiredStart,
  renewalTitle,
  autoRenewalHandler,
}: Props) => {
  const formattedDateOfPayment = formatSubscriptionDate(dateOfPayment!);
  const formattedExpireAtPayment = formatSubscriptionDate(expireAt!);

  return (
    <>
      <div className={s.subscription}>
        <p className={s.subscription__title}>{name}:</p>
        <div className={s.subscription__wrapper}>
          <div className={s.subscription__container}>
            <p className={s.subscription__container__text}>{expiredStart}</p>
            <p className={s.subscription__container__data}>
              {formattedDateOfPayment}
            </p>
          </div>
          {autoRenewal &&
            <div className={s.subscription__container}>
            <p className={s.subscription__container__text}>{expiredEnd}</p>
            <p className={s.subscription__container__data}>
              {formattedExpireAtPayment}
            </p>
          </div>}
        </div>
      </div>

      <ManagementCheckbox autoRenewalHandler={autoRenewalHandler} autoRenewal={autoRenewal} title={renewalTitle} />
    </>
  );
};
