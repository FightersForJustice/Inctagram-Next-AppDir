import { getPayments } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import { gql } from '@apollo/client';

export const GetPayments = gql`
  # Increments a back-end counter and gets its resulting valuequery GetPaymentsList {
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
