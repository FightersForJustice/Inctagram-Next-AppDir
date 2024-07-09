import React, { useState } from 'react';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
  OnClickActions,
} from '@paypal/paypal-js';

type Props = {
  price: string;
};

const initialOptions = {
  clientId: "test",
  currency: "USD",
  intent: "capture",
};

export const PayPal: React.FC<Props> = ({ price }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = (orderId: string) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if response is error
    // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  };

  const onCreateOrder = (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const description =
      price === '10'
        ? '$10 per 1 Day Subscription'
        : price === '50'
        ? '$50 per 7 Day Subscription'
        : '$100 per month Subscription';

    return actions.order.create({
      purchase_units: [
        {
          description: description,
          amount: {
            value: price,
          },
        },
      ],
    });
  };

  const onApproveOrder = async (
    data: OnApproveData,
    actions: OnApproveActions
  ) => {
    const order = await actions?.order?.capture();
    console.log('order', order);

    handleApprove(data.orderID);
  };

  const onErrorOrder = (err: any) => {
    setError(err);
    console.error('PayPal Checkout onError', err);
  };

  const onClickOrder = (
    data: Record<string, unknown>,
    actions: OnClickActions
  ) => {
    // Validate on button click, client or server side
    const hasAlreadyBoughtCourse = false;

    if (hasAlreadyBoughtCourse) {
      setError(
        'You already bought this course. Go to your account to view your list of courses.'
      );

      return actions.reject();
    } else {
      return actions.resolve();
    }
  };

  const onCancelOrder = () => {};

  if (paidFor) {
    // Display success message, modal or redirect user to success page
    console.log('Thank you for your purchase!');
  }

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }

  const ButtonWithProps = () => {
    return (
      <PayPalButtons
        style={{
          color: 'gold',
          layout: 'horizontal',
          shape: 'rect',
          height: 55,
        }}
        className={'flex'}
        createOrder={onCreateOrder}
        onApprove={onApproveOrder}
        onError={onErrorOrder}
        onClick={onClickOrder}
        onCancel={onCancelOrder}
      />
    );
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <ButtonWithProps />
    </PayPalScriptProvider>
  );
};
