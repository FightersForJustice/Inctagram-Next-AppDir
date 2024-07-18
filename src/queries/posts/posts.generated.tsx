import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCurrentPostsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'PostsPaginationModel', pagesCount: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'Post', id: number, ownerId: number, description: string, createdAt: any, updatedAt: any, images?: Array<{ __typename?: 'ImagePost', id?: number | null, createdAt?: any | null, url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null, postOwner: { __typename?: 'PostOwnerModel', id: number, userName: string, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null } }> } };

export type GetCurrentUserPostsQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  endCursorId: Types.Scalars['Int']['input'];
}>;


export type GetCurrentUserPostsQuery = { __typename?: 'Query', getPostsByUser: { __typename?: 'PostsByUserModel', pagesCount: number, pageSize: number, totalCount: number, items?: Array<{ __typename?: 'ImagePost', id?: number | null, createdAt?: any | null, url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null } };


export const GetCurrentPostsDocument = gql`
    query GetCurrentPosts {
  getPosts {
    pagesCount
    pageSize
    totalCount
    items {
      images {
        id
        createdAt
        url
        width
        height
        fileSize
      }
      id
      ownerId
      description
      createdAt
      updatedAt
      postOwner {
        id
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
}
    `;

/**
 * __useGetCurrentPostsQuery__
 *
 * To run a query within a React component, call `useGetCurrentPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentPostsQuery, GetCurrentPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentPostsQuery, GetCurrentPostsQueryVariables>(GetCurrentPostsDocument, options);
      }
export function useGetCurrentPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentPostsQuery, GetCurrentPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentPostsQuery, GetCurrentPostsQueryVariables>(GetCurrentPostsDocument, options);
        }
export function useGetCurrentPostsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentPostsQuery, GetCurrentPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentPostsQuery, GetCurrentPostsQueryVariables>(GetCurrentPostsDocument, options);
        }
export type GetCurrentPostsQueryHookResult = ReturnType<typeof useGetCurrentPostsQuery>;
export type GetCurrentPostsLazyQueryHookResult = ReturnType<typeof useGetCurrentPostsLazyQuery>;
export type GetCurrentPostsSuspenseQueryHookResult = ReturnType<typeof useGetCurrentPostsSuspenseQuery>;
export type GetCurrentPostsQueryResult = Apollo.QueryResult<GetCurrentPostsQuery, GetCurrentPostsQueryVariables>;
export const GetCurrentUserPostsDocument = gql`
    query GetCurrentUserPosts($userId: Int!, $endCursorId: Int!) {
  getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
    pagesCount
    pageSize
    totalCount
    items {
      id
      createdAt
      url
      width
      height
      fileSize
    }
  }
}
    `;

/**
 * __useGetCurrentUserPostsQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserPostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      endCursorId: // value for 'endCursorId'
 *   },
 * });
 */
export function useGetCurrentUserPostsQuery(baseOptions: Apollo.QueryHookOptions<GetCurrentUserPostsQuery, GetCurrentUserPostsQueryVariables> & ({ variables: GetCurrentUserPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserPostsQuery, GetCurrentUserPostsQueryVariables>(GetCurrentUserPostsDocument, options);
      }
export function useGetCurrentUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserPostsQuery, GetCurrentUserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserPostsQuery, GetCurrentUserPostsQueryVariables>(GetCurrentUserPostsDocument, options);
        }
export function useGetCurrentUserPostsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentUserPostsQuery, GetCurrentUserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserPostsQuery, GetCurrentUserPostsQueryVariables>(GetCurrentUserPostsDocument, options);
        }
export type GetCurrentUserPostsQueryHookResult = ReturnType<typeof useGetCurrentUserPostsQuery>;
export type GetCurrentUserPostsLazyQueryHookResult = ReturnType<typeof useGetCurrentUserPostsLazyQuery>;
export type GetCurrentUserPostsSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserPostsSuspenseQuery>;
export type GetCurrentUserPostsQueryResult = Apollo.QueryResult<GetCurrentUserPostsQuery, GetCurrentUserPostsQueryVariables>;