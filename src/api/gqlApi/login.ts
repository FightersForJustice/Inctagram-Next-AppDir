import { gql } from '@apollo/client';

export const Login = gql`
  # Increments a back-end counter and gets its resulting value
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      logged
    }
  }
`;

export const GetUsers = gql`
  # Increments a back-end counter and gets its resulting value
   query AdminGetUsers($pageSize: Int, 
   $pageNumber: Int, 
   $sortBy: String, 
   $sortDirection: String, 
   $searchTerm: String, 
   $statusFilter: String) {
   getUsers(
      pageSize: $pageSize,
      pageNumber: $pageNumber,
      sortBy: $sortBy,  
      sortDirection: $sortDirection,
      searchTerm: $searchTerm,
      statusFilter: $statusFilter
    ) {
    users
    pagination
    }
    }
`;
