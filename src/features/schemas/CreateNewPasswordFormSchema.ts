import * as yup from 'yup';

export const CreateNewPasswordFormSchema = () => {
  const passwordCompletely =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|])[A-Za-z0-9'"`!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]{6,20}$/;

  return yup.object({
    password: yup
      .string()
      .required('password.required')
      .test('not-spaces', 'password.spaces', (value) => {
        return value.trim() !== '' && !/\s/.test(value);
      })
      .min(6, 'password.min')
      .max(20, 'password.max')
      .matches(passwordCompletely, `${'password.complexity'} `),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'passwordConfirm.oneOf')
      .min(6, 'passwordConfirm.min')
      .required('passwordConfirm.required'),
  });
};
