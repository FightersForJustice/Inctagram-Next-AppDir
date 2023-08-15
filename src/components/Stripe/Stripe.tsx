import React, { useState } from "react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

import s from "./Stripe.module.scss";

const stripePublishableKey =
  "pk_test_51NctuwJ6UOT6foZodz3kfC6eZp8EmMvOGBFxg1EDsQqbIOh0X1SlD7jjZvDGhoJvqj7aIheWCfCSABz2CkmvZHUS00lZvaCO6J";
const priceApiId10 = "price_1NejO9J6UOT6foZoBn3oXw4a";
const priceApiId50 = "price_1NejPKJ6UOT6foZobjMiJI5T";
const priceApiId100 = "price_1NejPvJ6UOT6foZoMuV4Wgib";

let stripePromise: Promise<any>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }

  return stripePromise;
};

export const Stripe: React.FC<Props> = ({ subTypeValue }) => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const item = {
    price: subTypeValue === "10" ? priceApiId10 : subTypeValue === "50" ? priceApiId50 : priceApiId100,
    quantity: 1,
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/settings-profile`,
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <button onClick={redirectToCheckout} disabled={isLoading}>
      <div className={`${s.wrapper} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}>
        <Image className={s.img} src={"/img/stripe.png"} alt={"stripe"} width={70} height={30} />
      </div>
    </button>
  );
};

type Props = {
  subTypeValue: string;
};
