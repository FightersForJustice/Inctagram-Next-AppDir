import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
};

export type Query = {
  __typename?: 'Query';
  me: User;
  user?: Maybe<User>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  search: Array<SearchResult>;
  myChats: Array<Chat>;
};

export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySearchArgs = {
  term: Scalars['String']['input'];
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

export type Node = {
  id: Scalars['ID']['output'];
};

export type SearchResult = User | Chat | ChatMessage;

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
  email: Scalars['String']['output'];
  role: Role;
};

export type Chat = Node & {
  __typename?: 'Chat';
  id: Scalars['ID']['output'];
  users: Array<User>;
  messages: Array<ChatMessage>;
};

export type ChatMessage = Node & {
  __typename?: 'ChatMessage';
  id: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  time: Scalars['Date']['output'];
  user: User;
};

export type FindUserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;

export type FindUserQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    id: string;
    username: string;
    role: Role;
  } | null;
};

export type UserFieldsFragment = {
  __typename?: 'User';
  id: string;
  username: string;
  role: Role;
};

export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    username
    role
  }
`;
export const FindUserDocument = gql`
  query findUser($userId: ID!) {
    user(id: $userId) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useFindUserQuery__
 *
 * To run a query within a React component, call `useFindUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserQuery(
  baseOptions: Apollo.QueryHookOptions<FindUserQuery, FindUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserQuery, FindUserQueryVariables>(
    FindUserDocument,
    options
  );
}
export function useFindUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserQuery,
    FindUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindUserQuery, FindUserQueryVariables>(
    FindUserDocument,
    options
  );
}
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>;
export type FindUserLazyQueryHookResult = ReturnType<
  typeof useFindUserLazyQuery
>;
export type FindUserQueryResult = Apollo.QueryResult<
  FindUserQuery,
  FindUserQueryVariables
>;
