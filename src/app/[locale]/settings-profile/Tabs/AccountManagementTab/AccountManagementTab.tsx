import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";

import s from "./AccountManagementTab.module.scss";
import { AccountTypeRadio } from "./AccountTypeRadio/AccountTypeRadio";
import { SubscriptionRadio } from "./SubscriptionRadio/SubscriptionRadio";
import { Subscription } from "./Subscription/Subscription";
import { Stripe } from "../../../../../components/Stripe/Stripe";
import { PayPal } from "../../../../../components/PayPal/PayPal";

export const AccountManagementTab = () => {
  const [accountTypeValue, setAccountTypeValue] = useState("personal");
  const [subTypeValue, setSubTypeValue] = useState("10");

  return (
    <Tabs.Content className={s.TabsContent} value="accountManagement">
      <div className={s.tab}>
        <Subscription />

        <p className={s.tab__name}>Account type:</p>
        <div className={s.tab__wrapper}>
          <AccountTypeRadio radioValue={accountTypeValue} setRadioValue={setAccountTypeValue} />
        </div>
        {accountTypeValue === "business" && (
          <>
            <p className={s.tab__name}>Your subscription costs:</p>
            <div className={s.tab__wrapper}>
              <SubscriptionRadio subTypeValue={subTypeValue} setSubTypeValue={setSubTypeValue} />
            </div>
            <div className={s.tab__container}>
              <PayPal price={subTypeValue} />
              {/*<div className={s.tab__img__wrapper}>
                <Image className={s.tab__img} src={"/img/paypal.png"} alt={"paypal"} width={70} height={47} />
              </div>*/}
              <p>or</p>
              <Stripe subTypeValue={subTypeValue} />
            </div>
          </>
        )}
      </div>
    </Tabs.Content>
  );
};
