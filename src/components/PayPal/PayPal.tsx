import { useRouter } from 'next/navigation';
import { routes } from '@/api/routes';
import { onCreateStripeOptions } from '@/app/lib/actionOptions';
import Image from 'next/image';
import s from './PayPal.module.scss'

type PropsPaypal = {
  price: number;
  subTypeValue: string;
  baseUrl: any;
  token: string;
};

export const PayPal = ({
  price,
  baseUrl,
  token,
  subTypeValue,
}: PropsPaypal) => {
  const ButtonWithProps = ({ price, subTypeValue, token, baseUrl }: PropsPaypal) => {
    const router = useRouter();
    const onCreateStripeSubscriptionHandler = async () => {
      const res = await fetch(
        routes.CREATE_SUBSCRIPTION,
        onCreateStripeOptions(token, {
          paymentType: 'PAYPAL',
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
      <div
        className={`${s.wrapper}`}
        onClick={onCreateStripeSubscriptionHandler}
      >
        <Image
          className={s.img}
          src={'/img/paypal.png'}
          alt={'stripe'}
          width={70}
          height={30}
        />
      </div>
    );
  };

  return (
    <ButtonWithProps
      subTypeValue={subTypeValue}
      token={token}
      baseUrl={baseUrl}
      price={price}
    />
  );
};
