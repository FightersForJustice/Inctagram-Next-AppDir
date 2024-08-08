export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Avatar = {
  __typename?: 'Avatar';
  fileSize?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export enum CurrencyType {
  Eur = 'EUR',
  Usd = 'USD'
}

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type FollowPaginationModel = {
  __typename?: 'FollowPaginationModel';
  items: Array<Follow>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ImagePost = {
  __typename?: 'ImagePost';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileSize?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type LoginAdmin = {
  __typename?: 'LoginAdmin';
  logged: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  banUser: Scalars['Boolean']['output'];
  loginAdmin: LoginAdmin;
  removeUser: Scalars['Boolean']['output'];
  unbanUser: Scalars['Boolean']['output'];
};


export type MutationBanUserArgs = {
  banReason: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationLoginAdminArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationUnbanUserArgs = {
  userId: Scalars['Int']['input'];
};

export type PaginationModel = {
  __typename?: 'PaginationModel';
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<CurrencyType>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  type?: Maybe<SubscriptionType>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum PaymentMethod {
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE'
}

export type PaymentPaginationModel = {
  __typename?: 'PaymentPaginationModel';
  items: Array<SubscriptionByPaymentModel>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PaymentsPaginationModel = {
  __typename?: 'PaymentsPaginationModel';
  items: Array<SubscriptionPaymentsModel>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<Array<ImagePost>>;
  ownerId: Scalars['Int']['output'];
  postOwner: PostOwnerModel;
  updatedAt: Scalars['DateTime']['output'];
};

export type PostOwnerModel = {
  __typename?: 'PostOwnerModel';
  avatars?: Maybe<Array<Avatar>>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  userName: Scalars['String']['output'];
};

export type PostsByUserModel = {
  __typename?: 'PostsByUserModel';
  items?: Maybe<Array<ImagePost>>;
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PostsPaginationModel = {
  __typename?: 'PostsPaginationModel';
  items: Array<Post>;
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  aboutMe?: Maybe<Scalars['String']['output']>;
  avatars?: Maybe<Array<Avatar>>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getFollowers: FollowPaginationModel;
  getFollowing: FollowPaginationModel;
  getPayments: PaymentsPaginationModel;
  getPaymentsByUser: PaymentPaginationModel;
  getPosts: PostsPaginationModel;
  getPostsByUser: PostsByUserModel;
  getUser: User;
  getUsers: UsersPaginationModel;
};


export type QueryGetFollowersArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  userId: Scalars['Int']['input'];
};


export type QueryGetFollowingArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  userId: Scalars['Int']['input'];
};


export type QueryGetPaymentsArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryGetPaymentsByUserArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  userId: Scalars['Int']['input'];
};


export type QueryGetPostsArgs = {
  endCursorPostId?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryGetPostsByUserArgs = {
  endCursorId?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};


export type QueryGetUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetUsersArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  statusFilter?: InputMaybe<UserBlockStatus>;
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum StatusSubscriptionType {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Finished = 'FINISHED',
  Pending = 'PENDING'
}

export type Subscription = {
  __typename?: 'Subscription';
  postAdded: Post;
};

export type SubscriptionByPaymentModel = {
  __typename?: 'SubscriptionByPaymentModel';
  businessAccountId: Scalars['Int']['output'];
  dateOfPayment?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  paymentType?: Maybe<PaymentMethod>;
  payments: Array<Payment>;
  price: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status: StatusSubscriptionType;
  type: SubscriptionType;
};

export type SubscriptionPaymentsModel = {
  __typename?: 'SubscriptionPaymentsModel';
  amount?: Maybe<Scalars['Int']['output']>;
  avatars?: Maybe<Array<Avatar>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<CurrencyType>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentMethod: PaymentMethod;
  type: SubscriptionType;
  userId?: Maybe<Scalars['Int']['output']>;
  userName: Scalars['String']['output'];
};

export enum SubscriptionType {
  Day = 'DAY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  profile: Profile;
  userBan?: Maybe<UserBan>;
  userName: Scalars['String']['output'];
};

export type UserBan = {
  __typename?: 'UserBan';
  createdAt: Scalars['DateTime']['output'];
  reason: Scalars['String']['output'];
};

export enum UserBlockStatus {
  All = 'ALL',
  Blocked = 'BLOCKED',
  Unblocked = 'UNBLOCKED'
}

export type UsersPaginationModel = {
  __typename?: 'UsersPaginationModel';
  pagination: PaginationModel;
  users: Array<User>;
};
