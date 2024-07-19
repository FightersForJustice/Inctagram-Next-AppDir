import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllUsersQueryVariables = Types.Exact<{
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  statusFilter?: Types.InputMaybe<Types.UserBlockStatus>;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'UsersPaginationModel', users: Array<{ __typename?: 'User', id: number, userName: string, email: string, createdAt: any, profile: { __typename?: 'Profile', id: number, userName?: string | null, createdAt: any }, userBan?: { __typename?: 'UserBan', reason: string, createdAt: any } | null }>, pagination: { __typename?: 'PaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number } } };

export type GetCurrentUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type GetCurrentUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: number, userName: string, email: string, createdAt: any, profile: { __typename?: 'Profile', id: number, createdAt: any, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null } } };

export type BanCurrentUserMutationVariables = Types.Exact<{
  banReason: Types.Scalars['String']['input'];
  userId: Types.Scalars['Int']['input'];
}>;


export type BanCurrentUserMutation = { __typename?: 'Mutation', banUser: boolean };

export type UnBanCurrentUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type UnBanCurrentUserMutation = { __typename?: 'Mutation', unbanUser: boolean };

export type RemoveCurrentUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type RemoveCurrentUserMutation = { __typename?: 'Mutation', removeUser: boolean };


export const GetAllUsersDocument = gql`
    query getAllUsers($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $searchTerm: String, $statusFilter: UserBlockStatus) {
  getUsers(
    pageSize: $pageSize
    pageNumber: $pageNumber
    sortBy: $sortBy
    sortDirection: $sortDirection
    searchTerm: $searchTerm
    statusFilter: $statusFilter
  ) {
    users {
      id
      userName
      email
      createdAt
      profile {
        id
        userName
        createdAt
      }
      userBan {
        reason
        createdAt
      }
    }
    pagination {
      pagesCount
      page
      pageSize
      totalCount
    }
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      searchTerm: // value for 'searchTerm'
 *      statusFilter: // value for 'statusFilter'
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser($userId: Int!) {
  getUser(userId: $userId) {
    id
    userName
    email
    createdAt
    profile {
      id
      createdAt
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
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables> & ({ variables: GetCurrentUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const BanCurrentUserDocument = gql`
    mutation BanCurrentUser($banReason: String!, $userId: Int!) {
  banUser(banReason: $banReason, userId: $userId)
}
    `;
export type BanCurrentUserMutationFn = Apollo.MutationFunction<BanCurrentUserMutation, BanCurrentUserMutationVariables>;

/**
 * __useBanCurrentUserMutation__
 *
 * To run a mutation, you first call `useBanCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banCurrentUserMutation, { data, loading, error }] = useBanCurrentUserMutation({
 *   variables: {
 *      banReason: // value for 'banReason'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useBanCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<BanCurrentUserMutation, BanCurrentUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BanCurrentUserMutation, BanCurrentUserMutationVariables>(BanCurrentUserDocument, options);
      }
export type BanCurrentUserMutationHookResult = ReturnType<typeof useBanCurrentUserMutation>;
export type BanCurrentUserMutationResult = Apollo.MutationResult<BanCurrentUserMutation>;
export type BanCurrentUserMutationOptions = Apollo.BaseMutationOptions<BanCurrentUserMutation, BanCurrentUserMutationVariables>;
export const UnBanCurrentUserDocument = gql`
    mutation UnBanCurrentUser($userId: Int!) {
  unbanUser(userId: $userId)
}
    `;
export type UnBanCurrentUserMutationFn = Apollo.MutationFunction<UnBanCurrentUserMutation, UnBanCurrentUserMutationVariables>;

/**
 * __useUnBanCurrentUserMutation__
 *
 * To run a mutation, you first call `useUnBanCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnBanCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unBanCurrentUserMutation, { data, loading, error }] = useUnBanCurrentUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnBanCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<UnBanCurrentUserMutation, UnBanCurrentUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnBanCurrentUserMutation, UnBanCurrentUserMutationVariables>(UnBanCurrentUserDocument, options);
      }
export type UnBanCurrentUserMutationHookResult = ReturnType<typeof useUnBanCurrentUserMutation>;
export type UnBanCurrentUserMutationResult = Apollo.MutationResult<UnBanCurrentUserMutation>;
export type UnBanCurrentUserMutationOptions = Apollo.BaseMutationOptions<UnBanCurrentUserMutation, UnBanCurrentUserMutationVariables>;
export const RemoveCurrentUserDocument = gql`
    mutation RemoveCurrentUser($userId: Int!) {
  removeUser(userId: $userId)
}
    `;
export type RemoveCurrentUserMutationFn = Apollo.MutationFunction<RemoveCurrentUserMutation, RemoveCurrentUserMutationVariables>;

/**
 * __useRemoveCurrentUserMutation__
 *
 * To run a mutation, you first call `useRemoveCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCurrentUserMutation, { data, loading, error }] = useRemoveCurrentUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCurrentUserMutation, RemoveCurrentUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCurrentUserMutation, RemoveCurrentUserMutationVariables>(RemoveCurrentUserDocument, options);
      }
export type RemoveCurrentUserMutationHookResult = ReturnType<typeof useRemoveCurrentUserMutation>;
export type RemoveCurrentUserMutationResult = Apollo.MutationResult<RemoveCurrentUserMutation>;
export type RemoveCurrentUserMutationOptions = Apollo.BaseMutationOptions<RemoveCurrentUserMutation, RemoveCurrentUserMutationVariables>;