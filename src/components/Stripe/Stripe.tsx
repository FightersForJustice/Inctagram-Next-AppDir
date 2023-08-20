import React from "react";
import Image from "next/image";

import s from "./Stripe.module.scss";
import { useCreateSubscriptionMutation } from "../../api/subscriptions.api";
import { Loader } from "../Loader/Loader";

type Props = {
  subTypeValue: string;
  baseUrl: any;
};

export const Stripe: React.FC<Props> = ({ subTypeValue, baseUrl }) => {
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

  const onCreateStripeSubscription = () => {
    createSubscription({ paymentType: "STRIPE", amount: 1, typeSubscription: subTypeValue, baseUrl: baseUrl.origin })
      .unwrap()
      .then((res) => {
        window.location.href = res.url;
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className={`${s.wrapper} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={onCreateStripeSubscription}
      >
        <Image className={s.img} src={"/img/stripe.png"} alt={"stripe"} width={70} height={30} />
      </div>
      {isLoading && <Loader />}
    </>
  );
};
