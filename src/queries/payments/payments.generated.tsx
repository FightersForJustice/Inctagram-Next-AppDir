import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPaymentsListQueryVariables = Types.Exact<{
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetPaymentsListQuery = { __typename?: 'Query', getPayments: { __typename?: 'PaymentsPaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'SubscriptionPaymentsModel', id?: number | null, paymentMethod: Types.PaymentMethod, type: Types.SubscriptionType, userName: string, createdAt?: any | null, endDate?: any | null, amount?: number | null, currency?: Types.CurrencyType | null, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null }> } };

export type GetPaymentsByUserQueryQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetPaymentsByUserQueryQuery = { __typename?: 'Query', getPaymentsByUser: { __typename?: 'PaymentPaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'SubscriptionByPaymentModel', id: string, businessAccountId: number, status: Types.StatusSubscriptionType, dateOfPayment?: any | null, startDate?: any | null, endDate?: any | null, type: Types.SubscriptionType, price: number, paymentType?: Types.PaymentMethod | null }> } };


export const GetPaymentsListDocument = gql`
    query getPaymentsList($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $searchTerm: String) {
  getPayments(
    pageSize: $pageSize
    pageNumber: $pageNumber
    sortBy: $sortBy
    sortDirection: $sortDirection
    searchTerm: $searchTerm
  ) {
    pagesCount
    page
    pageSize
    totalCount
    items {
      id
      paymentMethod
      type
      userName
      createdAt
      endDate
      amount
      currency
      avatars {
        url
        width
        height
        fileSize
      }
    }
  }
}
    `;

/**
 * __useGetPaymentsListQuery__
 *
 * To run a query within a React component, call `useGetPaymentsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsListQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useGetPaymentsListQuery(baseOptions?: Apollo.QueryHookOptions<GetPaymentsListQuery, GetPaymentsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentsListQuery, GetPaymentsListQueryVariables>(GetPaymentsListDocument, options);
      }
export function useGetPaymentsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentsListQuery, GetPaymentsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentsListQuery, GetPaymentsListQueryVariables>(GetPaymentsListDocument, options);
        }
export function useGetPaymentsListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPaymentsListQuery, GetPaymentsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaymentsListQuery, GetPaymentsListQueryVariables>(GetPaymentsListDocument, options);
        }
export type GetPaymentsListQueryHookResult = ReturnType<typeof useGetPaymentsListQuery>;
export type GetPaymentsListLazyQueryHookResult = ReturnType<typeof useGetPaymentsListLazyQuery>;
export type GetPaymentsListSuspenseQueryHookResult = ReturnType<typeof useGetPaymentsListSuspenseQuery>;
export type GetPaymentsListQueryResult = Apollo.QueryResult<GetPaymentsListQuery, GetPaymentsListQueryVariables>;
export const GetPaymentsByUserQueryDocument = gql`
    query getPaymentsByUserQuery($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {
  getPaymentsByUser(
    userId: $userId
    pageSize: $pageSize
    pageNumber: $pageNumber
    sortBy: $sortBy
    sortDirection: $sortDirection
  ) {
    pagesCount
    page
    pageSize
    totalCount
    items {
      id
      businessAccountId
      status
      dateOfPayment
      startDate
      endDate
      type
      price
      paymentType
    }
  }
}
    `;

/**
 * __useGetPaymentsByUserQueryQuery__
 *
 * To run a query within a React component, call `useGetPaymentsByUserQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsByUserQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsByUserQueryQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetPaymentsByUserQueryQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentsByUserQueryQuery, GetPaymentsByUserQueryQueryVariables> & ({ variables: GetPaymentsByUserQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentsByUserQueryQuery, GetPaymentsByUserQueryQueryVariables>(GetPaymentsByUserQueryDocument, options);
      }
export function useGetPaymentsByUserQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentsByUserQueryQuery, GetPaymentsByUserQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentsByUserQueryQuery, GetPaymentsByUserQueryQueryVariables>(GetPaymentsByUserQueryDocument, options);
        }
export function useGetPaymentsByUserQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPaymentsByUserQueryQuery, GetPaymentsByUserQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaymentsByUserQueryQuery, GetPaymentsByUserQueryQueryVariables>(GetPaymentsByUserQueryDocument, options);
        }
export type GetPaymentsByUserQueryQueryHookResult = ReturnType<typeof useGetPaymentsByUserQueryQuery>;
export type GetPaymentsByUserQueryLazyQueryHookResult = ReturnType<typeof useGetPaymentsByUserQueryLazyQuery>;
export type GetPaymentsByUserQuerySuspenseQueryHookResult = ReturnType<typeof useGetPaymentsByUserQuerySuspenseQuery>;
export type GetPaymentsByUserQueryQueryResult = Apollo.QueryResult<GetPaymentsByUserQueryQuery, GetPaymentsByUserQueryQueryVariables>;