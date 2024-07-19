import { gql } from '@apollo/client';

export const GetAllUsers = gql`
  query getAllUsers(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $searchTerm: String
    $statusFilter: UserBlockStatus
  ) {
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
export const GetCurrentUser = gql`
  # Increments a back-end counter and gets its resulting valuequery GetPaymentsList {
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

export const BanCurrentUser = gql`
  # Increments a back-end counter and gets its resulting value
  mutation BanCurrentUser($banReason: String!, $userId: Int!) {
    banUser(banReason: $banReason, userId: $userId)
  }
`;

export const UnBanCurrentUserDocument = gql`
  # Increments a back-end counter and gets its resulting value
  mutation UnBanCurrentUser($userId: Int!) {
    unbanUser(userId: $userId)
  }
`;

export const RemoveCurrentUserDocument = gql`
  # Increments a back-end counter and gets its resulting value
  mutation RemoveCurrentUser($userId: Int!) {
    removeUser(userId: $userId)
  }
`;
