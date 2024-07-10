import Image from 'next/image';

import s from './Stripe.module.scss';
import { useCreateSubscriptionMutation } from '@/api';
import { Loader } from '../Loader/Loader';
import { toast } from 'react-toastify';
import { onCreateStripeSubscription } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import { routes } from '@/api/routes';
import { onCreateStripeOptions } from '@/app/lib/actionOptions';

type Props = {
  price: number;
  subTypeValue: string;
  baseUrl: any;
  token: string;
};

export const Stripe = ({ price, subTypeValue, token, baseUrl }: Props) => {
  const router = useRouter();
  const onCreateStripeSubscriptionHandler = async () => {
    const res = await fetch(
      routes.CREATE_SUBSCRIPTION,
      onCreateStripeOptions(token, {
        paymentType: 'STRIPE',
        amount: price,
        typeSubscription: subTypeValue,
        baseUrl,
      })
    )
      .then((res) =>
        res.json().then((res) => {
          router.push(res.url);

          return Promise.reject(
            new Error(`Error accountPaymentStripe, status ${res.status}`)
          );
        })
      )
      .catch((error) => {
        console.error(error);
        return { success: false, modalText: 'accountPaymentStripe' };
      });
  };

  return (
    <>
      <div
        className={`${s.wrapper}`}
        onClick={onCreateStripeSubscriptionHandler}
      >
        <Image
          className={s.img}
          src={'/img/stripe.png'}
          alt={'stripe'}
          width={70}
          height={30}
        />
      </div>
    </>
  );
};
