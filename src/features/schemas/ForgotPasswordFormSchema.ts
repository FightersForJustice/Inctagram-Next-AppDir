import * as yup from 'yup';

export const ForgotPasswordSchema = () => {
  return yup
    .object({
      email: yup.string().email('email.email').required('email.required'),
    })
    .required();
};
