export type HeadType =
  | 'Payment'
  | 'UsersList'
  | 'UploadFiles'
  | 'UserPayments';

type HeaderListType = {
  Payment: Array<string>;
  UsersList: Array<string>;
  UploadFiles: Array<string>;
  UserPayments: Array<string>;
  UserFollowers: Array<string>;
  UserFolloweing: Array<string>;
  PaymentsList: Array<string>;
  Posts: Array<string>;
};

export const headerList: HeaderListType = {
  Payment: ['DateOfPayment', 'EndOfPayment', 'Price', 'Period', 'Type'],
  PaymentsList: ['userName', 'createdAt', 'price', 'period', 'type'],
  UsersList: ['id', 'username', 'profile-link', 'createdBy'],
  UploadFiles: ['UserId', 'UserName', 'ProfileLink', 'DateAdded'],
  UserPayments: [
    'startDate',
    'endDate',
    'price',
    'type',
    'paymentType',
  ],
  UserFollowers: ['UserId', 'UserName', 'ProfileLink', 'SubscriptionDate'],
  UserFolloweing: ['UserId', 'UserName', 'ProfileLink', 'SubscriptionDate'],
  Posts: ['UserId', 'UserName', 'ProfileLink', 'SubscriptionDate'],
};
