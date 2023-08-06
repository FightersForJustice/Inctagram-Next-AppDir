import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";

import s from "./AccountManagementTab.module.scss";
import { AccountTypeRadio } from "./AccountTypeRadio/AccountTypeRadio";
import { SubscriptionRadio } from "./SubscriptionRadio/SubscriptionRadio";
import Image from "next/image";

export const AccountManagementTab = () => {
  const [accountTypeValue, setAccountTypeValue] = useState("personal");
  const [subTypeValue, setSubTypeValue] = useState("10");

  console.log(subTypeValue);

  return (
    <Tabs.Content className={s.TabsContent} value="accountManagement">
      <div className={s.tab}>
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
              <div className={s.tab__img__wrapper}>
                <Image className={s.tab__img} src={"/img/paypal.png"} alt={"paypal"} width={70} height={47} />
              </div>
              <p>or</p>
              <div className={s.tab__img__wrapper}>
                <Image className={s.tab__img} src={"/img/stripe.png"} alt={"paypal"} width={70} height={30} />
              </div>
            </div>
          </>
        )}
      </div>
    </Tabs.Content>
  );
};
