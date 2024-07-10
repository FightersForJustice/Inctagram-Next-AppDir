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
