export interface SubscriptionsType {
  data: Datum[];
  hasAutoRenewal: boolean;
}

export interface Datum {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  autoRenewal: boolean;
}

export interface SubscriptionsCostType {
  data: SubscriptionsCost[];
}

export interface SubscriptionsCost {
  amount: number;
  typeDescription: string;
}

export interface PaymentsType {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  price: number;
  subscriptionType: string;
  paymentType: string;
}

export interface myPayment {
  dateOfPayment: string;
  endDateOfSubscription: string;
  price: number;
  subscriptionType: 'MONTHLY' | 'WEEKLY';
  paymentType: 'STRIPE' | 'PAYPAL';
}
