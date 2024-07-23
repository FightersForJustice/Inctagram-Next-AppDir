import { gql } from '@apollo/client';

export const GetCurrentPosts = gql`
  # Increments a back-end counter and gets its resulting valuequery GetPaymentsList {
  query GetCurrentPosts(
    $pageSize: Int
    $endCursorPostId: Int
    $sortBy: String
    $sortDirection: SortDirection
    $searchTerm: String
  ) {
    getPosts(
      pageSize: $pageSize
      endCursorPostId: $endCursorPostId
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
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
export const GetCurrentUserPosts = gql`
  # Increments a back-end counter and gets its resulting valuequery GetPaymentsList {
  query GetCurrentUserPosts($userId: Int!, $endCursorId: Int) {
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
