export const getSignUpFormItemsData = ({
  errors,
  showPass,
  showConfirmPass,
  setShowPass,
  setShowConfirmPass,
}: {
  errors: any | undefined;
  showPass?: boolean;
  showConfirmPass?: boolean;

  setShowPass?: (value: boolean) => void;
  setShowConfirmPass?: (value: boolean) => void;
}) => {
  return [
    {
      marginTop: 'mt-[10px]',
      error: errors.userName,
      errorMessage: errors?.userName?.message,
      registerName: 'userName',
      translateName: 'name',
      id: 'sign-up-userName',
    },
    {
      marginTop: '',
      error: errors.email,
      errorMessage: errors?.email?.message,
      registerName: 'email',
      translateName: 'email',
      id: 'sign-up-email',
    },
    {
      marginTop: '',
      error: errors.password,
      errorMessage: errors?.password?.message,
      registerName: 'password',
      translateName: 'password',
      id: 'sign-up-password',
      show: showPass,
      setShow: setShowPass,
      showPasswordIcon: true,
    },
    {
      marginTop: '',
      marginBottom: 'mb-[18px]',
      error: errors.passwordConfirm,
      errorMessage: errors?.passwordConfirm?.message,
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
