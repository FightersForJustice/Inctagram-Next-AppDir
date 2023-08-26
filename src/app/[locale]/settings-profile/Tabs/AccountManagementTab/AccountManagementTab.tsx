import React, { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";

import s from "./AccountManagementTab.module.scss";
import { AccountTypeRadio } from "./AccountTypeRadio";
import { SubscriptionRadio } from "./SubscriptionRadio";
import { Subscription } from "./Subscription";
import { Stripe } from "@/components/Stripe";
import { PayPal } from "@/components/PayPal";
import { GetCurrentSubscription, useGetCurrentSubscriptionQuery, useGetPaymentsQuery } from "@/api/subscriptions.api";

export const AccountManagementTab = () => {
  const [userSubInfo, setUserSubInfo] = useState<GetCurrentSubscription>({
    data: [
      {
        dateOfPayment: "",
        endDateOfSubscription: "",
        autoRenewal: false,
        subscriptionId: "",
        userId: 0,
      },
    ],
    hasAutoRenewal: false,
  });
  const [accountTypeValue, setAccountTypeValue] = useState("personal");
  const [subTypeValue, setSubTypeValue] = useState("MONTHLY");
  const [baseUrl, setBaseUrl] = useState<any>("");

  const { data } = useGetPaymentsQuery();
  const { data: currentSubData, isLoading: isLoadingSub } = useGetCurrentSubscriptionQuery();

  useEffect(() => {
    if (currentSubData?.data[0]?.subscriptionId.length! > 0) {
      setAccountTypeValue("business");
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
              <p>or</p>
              <Stripe subTypeValue={subTypeValue} baseUrl={baseUrl} />
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
