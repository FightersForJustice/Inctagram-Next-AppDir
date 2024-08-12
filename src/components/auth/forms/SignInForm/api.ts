import { gql, useMutation } from '@apollo/client';

export const Login = gql`
  # Increments a back-end counter and gets its resulting value
  mutation LoginAdmin(email: String!, password: String!) {
    loginAdmin(email: $email, password: $password) {
      email
      password
    }
    
  }
`;
