'use client';

import { useEffect, useState } from 'react';

import { AccountTypeRadio } from './AccountTypeRadio';
import { SubscriptionRadio } from './SubscriptionRadio';
import { Subscription } from './Subscription';
import { Stripe } from '@/components/Stripe';
import { PayPal } from '@/components/PayPal';

import {
  SubscriptionsCostType,
  SubscriptionsType,
} from '@/app/(authorized)/profile/settings-profile/types';
import s from './AccountManagementTab.module.scss';
import { useTranslation } from 'react-i18next';

export const AccountManagementTab = ({
  token,
  data,
  cost,
}: {
  token: string;
  data: SubscriptionsType;
  cost: SubscriptionsCostType;
}) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.AccountManagementTab.${key}`);
  const [userSubInfo, setUserSubInfo] = useState<SubscriptionsType>(
    {} as SubscriptionsType
  );
  const [accountTypeValue, setAccountTypeValue] = useState('personal');
  const [subTypeValue, setSubTypeValue] = useState('MONTHLY');
  const [baseUrl, setBaseUrl] = useState<string>('');

  useEffect(() => {
    setBaseUrl(window.location.href);
    setUserSubInfo(data);
    if (data?.data?.length) {
      setAccountTypeValue('business');
    }
  }, [data]);

  const currentPrice = cost.data.filter((el) =>
    el.typeDescription === subTypeValue ? el : ''
  )[0].amount;

  return (
    <div className={s.tab}>
      {userSubInfo?.data?.length && (
        <Subscription
          expireAt={userSubInfo?.data[0]?.endDateOfSubscription}
          dateOfPayment={userSubInfo?.data[0]?.dateOfPayment}
          autoRenewal={userSubInfo?.hasAutoRenewal}
          name={translate('CurrentSubscription')}
          expiredStart={translate('CurrentSubscriptionStart')}
          expiredEnd={translate('CurrentSubscriptionEnd')}
          renewalTitle={translate('AutoRenewal')}
        />
      )}

      <p className={s.tab__name}>{translate('AccountType')}:</p>
      <div className={s.tab__wrapper}>
        <AccountTypeRadio
          radioValue={accountTypeValue}
          setRadioValue={setAccountTypeValue}
          radioName={translate('Personal')}
          radioName2={translate('Business')}
        />
      </div>
      {accountTypeValue === 'business' && (
        <>
          <p className={s.tab__name}>{translate('SubscriptionCost')}:</p>
          <div className={s.tab__wrapper}>
            <SubscriptionRadio
              subTypeValue={subTypeValue}
              setSubTypeValue={setSubTypeValue}
              cost={cost}
              prefix={translate('Prefix')}
            />
          </div>
          <div className={s.tab__container}>
            <PayPal
              price={currentPrice}
              subTypeValue={subTypeValue}
              baseUrl={baseUrl}
              token={token}
            />
            <p>or</p>
            <Stripe
              price={currentPrice}
              subTypeValue={subTypeValue}
              baseUrl={baseUrl}
              token={token}
            />
          </div>
        </>
      )}
    </div>
  );
};
