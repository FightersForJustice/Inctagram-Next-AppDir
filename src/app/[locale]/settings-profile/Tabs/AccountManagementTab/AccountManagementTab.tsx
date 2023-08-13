import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";

import s from "./AccountManagementTab.module.scss";
import { AccountTypeRadio } from "./AccountTypeRadio/AccountTypeRadio";
import { SubscriptionRadio } from "./SubscriptionRadio/SubscriptionRadio";
import Image from "next/image";
import { Subscription } from "./Subscription/Subscription";

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

/*
----------stripe code-----------------

import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "sk_test_51NctuwJ6UOT6foZoziOJwGc3PR7MZ3mHzIGXT8turcVW46Va6FWPykZweYeSVRjyBgSacmhdvoF5Y0HDwMCW6uu1003TPstc9p",
);
export const AccountManagementTab = () => {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log("Order canceled -- continue to shop around and checkout when you’re ready.");
    }
  }, []);

  return (
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
};
*/
