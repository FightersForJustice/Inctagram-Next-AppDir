import { gql } from '@apollo/client';

export const GetPayments = gql`
  # Increments a back-end counter and gets its resulting valuequery GetPaymentsList {
  query getPaymentsList(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $searchTerm: String
  ) {
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
