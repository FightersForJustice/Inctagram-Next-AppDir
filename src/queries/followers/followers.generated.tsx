import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetFollowersListQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetFollowersListQuery = { __typename?: 'Query', getFollowers: { __typename?: 'FollowPaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'Follow', id: number, userId: number, userName?: string | null, createdAt: any }> } };

export type GetFollowingListQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetFollowingListQuery = { __typename?: 'Query', getFollowing: { __typename?: 'FollowPaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'Follow', id: number, userId: number, userName?: string | null, createdAt: any }> } };


export const GetFollowersListDocument = gql`
    query getFollowersList($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {
  getFollowers(
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
      userId
      userName
      createdAt
    }
  }
}
    `;

/**
 * __useGetFollowersListQuery__
 *
 * To run a query within a React component, call `useGetFollowersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowersListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowersListQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetFollowersListQuery(baseOptions: Apollo.QueryHookOptions<GetFollowersListQuery, GetFollowersListQueryVariables> & ({ variables: GetFollowersListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowersListQuery, GetFollowersListQueryVariables>(GetFollowersListDocument, options);
      }
export function useGetFollowersListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowersListQuery, GetFollowersListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowersListQuery, GetFollowersListQueryVariables>(GetFollowersListDocument, options);
        }
export function useGetFollowersListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFollowersListQuery, GetFollowersListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFollowersListQuery, GetFollowersListQueryVariables>(GetFollowersListDocument, options);
        }
export type GetFollowersListQueryHookResult = ReturnType<typeof useGetFollowersListQuery>;
export type GetFollowersListLazyQueryHookResult = ReturnType<typeof useGetFollowersListLazyQuery>;
export type GetFollowersListSuspenseQueryHookResult = ReturnType<typeof useGetFollowersListSuspenseQuery>;
export type GetFollowersListQueryResult = Apollo.QueryResult<GetFollowersListQuery, GetFollowersListQueryVariables>;
export const GetFollowingListDocument = gql`
    query getFollowingList($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {
  getFollowing(
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
      userId
      userName
      createdAt
    }
  }
}
    `;

/**
 * __useGetFollowingListQuery__
 *
 * To run a query within a React component, call `useGetFollowingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingListQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetFollowingListQuery(baseOptions: Apollo.QueryHookOptions<GetFollowingListQuery, GetFollowingListQueryVariables> & ({ variables: GetFollowingListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowingListQuery, GetFollowingListQueryVariables>(GetFollowingListDocument, options);
      }
export function useGetFollowingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowingListQuery, GetFollowingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowingListQuery, GetFollowingListQueryVariables>(GetFollowingListDocument, options);
        }
export function useGetFollowingListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFollowingListQuery, GetFollowingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFollowingListQuery, GetFollowingListQueryVariables>(GetFollowingListDocument, options);
        }
export type GetFollowingListQueryHookResult = ReturnType<typeof useGetFollowingListQuery>;
export type GetFollowingListLazyQueryHookResult = ReturnType<typeof useGetFollowingListLazyQuery>;
export type GetFollowingListSuspenseQueryHookResult = ReturnType<typeof useGetFollowingListSuspenseQuery>;
export type GetFollowingListQueryResult = Apollo.QueryResult<GetFollowingListQuery, GetFollowingListQueryVariables>;