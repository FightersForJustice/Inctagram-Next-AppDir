export type RowType = 'Payment' | 'UsersList' | 'Posts';

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

type UserBanType = {
  createdAt: string;
  reason: string;
};
