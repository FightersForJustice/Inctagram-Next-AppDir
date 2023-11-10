import React, { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

import s from './AccountManagementTab.module.scss';
import { AccountTypeRadio } from './AccountTypeRadio';
import { SubscriptionRadio } from './SubscriptionRadio';
import { Subscription } from './Subscription';
import { Stripe } from '@/components/Stripe';
import { PayPal } from '@/components/PayPal';
import {
  GetCurrentSubscription,
  useGetCurrentSubscriptionQuery,
} from '@/api/subscriptions.api';

export const AccountManagementTab = () => {
  const [userSubInfo, setUserSubInfo] = useState<GetCurrentSubscription>({
    data: [
      {
        dateOfPayment: '',
        endDateOfSubscription: '',
        autoRenewal: false,
        subscriptionId: '',
        userId: 0,
      },
    ],
    hasAutoRenewal: false,
  });
  const [accountTypeValue, setAccountTypeValue] = useState('personal');
  const [subTypeValue, setSubTypeValue] = useState('MONTHLY');
  const [baseUrl, setBaseUrl] = useState<any>('');

  const { data: currentSubData } = useGetCurrentSubscriptionQuery();

  useEffect(() => {
    if (currentSubData?.data[0]?.subscriptionId.length! > 0) {
      setAccountTypeValue('business');
    }

    setBaseUrl(window.location);
    setUserSubInfo(currentSubData!);
  }, [currentSubData]);

  return (
    <Tabs.Content className={s.TabsContent} value="accountManagement">
      <div className={s.tab}>
        {userSubInfo?.data.length > 0 && (
          <Subscription
            expireAt={userSubInfo?.data[0]?.endDateOfSubscription}
            dateOfPayment={userSubInfo?.data[0]?.dateOfPayment}
            autoRenewal={userSubInfo?.hasAutoRenewal}
          />
        )}

        <p className={s.tab__name}>Account type:</p>
        <div className={s.tab__wrapper}>
          <AccountTypeRadio
            radioValue={accountTypeValue}
            setRadioValue={setAccountTypeValue}
          />
        </div>
        {accountTypeValue === 'business' && (
          <>
            <p className={s.tab__name}>Your subscription costs:</p>
            <div className={s.tab__wrapper}>
              {/* <SubscriptionRadio
                subTypeValue={subTypeValue}
                setSubTypeValue={setSubTypeValue}
              /> */}
            </div>
            <div className={s.tab__container}>
              <PayPal price={subTypeValue} />
              <p>or</p>
              <Stripe subTypeValue={subTypeValue} baseUrl={baseUrl} />
            </div>
          </>
        )}
      </div>
    </Tabs.Content>
  );
};
