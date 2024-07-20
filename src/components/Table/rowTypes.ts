import { Avatar, CurrencyType, PaymentMethod, SubscriptionType } from '@/types';

export type RowType = 'Payment' | 'UsersList' | 'Posts' | 'PaymentsList';

export type PaymentType = {
  dateOfPayment: string;
  endDateOfSubscription: string;
  price: number;
  subscriptionType: string;
  paymentType: string;
};

export type UsersListType = {
  createdAt: string;
  email: string;
  id: number;
  currentActionId: number;
  userBan: null | UserBanType;
  userName: string;
  profile: {
    userName: string | null | undefined;
  };
  moreAction: (value: number) => void;
};
export type UsersPaymentType = {
  id: number;
  paymentMethod: PaymentMethod;
  amount: number | undefined | null;
  currency: CurrencyType;
  createdAt: string;
  endDate: string;
  type: SubscriptionType;
  userName: string;
  avatars: Array<Avatar>;
};

type UserBanType = {
  createdAt: string;
  reason: string;
};
