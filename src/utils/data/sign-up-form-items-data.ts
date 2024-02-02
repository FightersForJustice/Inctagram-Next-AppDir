export const getSignUpFormItemsData = ({
  translateErrors,
  errors,
  showPass,
  showConfirmPass,
  setShowPass,
  setShowConfirmPass,
}: {
  translateErrors: (key: string) => string;
  errors: any | undefined;
  showPass?: boolean;
  showConfirmPass?: boolean;

  setShowPass?: (value: boolean) => void;
  setShowConfirmPass?: (value: boolean) => void;
}) => {
  return [
    {
      error: errors.userName,
      errorMessage: translateErrors(errors?.userName?.message),
      registerName: 'userName',
      translateName: 'name',
      id: 'sign-up-userName',
    },
    {
      error: errors.email,
      errorMessage: translateErrors(errors?.email?.message),
      registerName: 'email',
      translateName: 'email',
      id: 'sign-up-email',
    },
    {
      error: errors.password,
      errorMessage: translateErrors(errors?.password?.message),
      registerName: 'password',
      translateName: 'password',
      id: 'sign-up-password',
      show: showPass,
      setShow: setShowPass,
      showPasswordIcon: true,
    },
    {
      error: errors.passwordConfirm,
      errorMessage: translateErrors(errors?.passwordConfirm?.message),
      registerName: 'passwordConfirm',
      translateName: 'passwordConf',
      id: 'sign-up-passwordConfirm',
      show: showConfirmPass,
      setShow: setShowConfirmPass,
      showPasswordIcon: true,
    },
  ];
};

export const resetObjSignUpForm = {
  userName: '',
  agreements: false,
  email: '',
  password: '',
  passwordConfirm: '',
};
