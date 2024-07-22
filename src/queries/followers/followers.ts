import { gql } from '@apollo/client';

export const GetFollowers = gql`
  # Increments a back-end counter and gets its resulting valuequery GetPaymentsList {
  query getFollowersList(
    $userId: Int!
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
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
export const GetFollowing = gql`
  # Increments a back-end counter and gets its resulting valuequery GetPaymentsList {
  query getFollowingList(
    $userId: Int!
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
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
