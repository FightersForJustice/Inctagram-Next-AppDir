import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPaymentsListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPaymentsListQuery = { __typename?: 'Query', getPayments: { __typename?: 'PaymentsPaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'SubscriptionPaymentsModel', id?: number | null, paymentMethod: Types.PaymentMethod, type: Types.SubscriptionType, userName: string, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null }> } };


export const GetPaymentsListDocument = gql`
    query getPaymentsList {
  getPayments {
    pagesCount
    page
    pageSize
    totalCount
    items {
      id
      paymentMethod
      type
      userName
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