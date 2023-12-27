import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { CreateNewPasswordFormSchema } from '@/features/schemas/CreateNewPasswordFormSchema';
import { CreateFormItem } from './CreateFormItem';
import { AuthSubmit } from '@/components/Input';
import {
  checkRecoveryCodeAction,
  deleteAllSessionsAction,
  newPasswordAction,
  signInAction,
} from '@/app/actions';
import { setAuthCookie } from '@/utils/cookiesActions';

import s from './CreateNewPasswordForm.module.scss';

type Props = {
  translate: (value: string) => ReactNode;
  newPasswordCode: string | undefined;
};

export const CreateNewPasswordForm = ({
  newPasswordCode,
  translate,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(CreateNewPasswordFormSchema()),
  });

  const [showPass, setShowPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const router = useRouter();

  const onSubmit = async (data: { password: string }) => {
    const isRecoveryCodeValid = await checkRecoveryCodeAction(newPasswordCode);

    if (isRecoveryCodeValid?.success) {
      const changePasswordResult = await newPasswordAction(
        data.password,
        newPasswordCode
      );

      if (changePasswordResult.success) {
        toast.success(translate('newPasswordSuccess'));
        const { email } = isRecoveryCodeValid.data;
        const password = data.password;

        const signInResult = await signInAction({ email, password });
        if (signInResult?.success) {
          setAuthCookie('accessToken', signInResult.data.accessToken);
          setAuthCookie('refreshToken', signInResult.data.refreshToken);

          const deleteAllSessionsResult = await deleteAllSessionsAction(
            signInResult.data.accessToken, signInResult.data.refreshToken
          );

          if (deleteAllSessionsResult?.success) {
            router.push('/my-profile');
          }
        }
      } else {
        toast.error(translate('errorCode'));
      }
    } else toast.error(translate('errorCode'));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CreateFormItem
        translate={translate}
        register={register}
        showValue={showPass}
        setShowCallback={setShowPass}
        error={errors.password}
        errorMessage={errors?.password?.message}
        translateName={'password'}
        registerName={'password'}
      />

      <CreateFormItem
        translate={translate}
        register={register}
        showValue={showConfirmPass}
        setShowCallback={setShowConfirmPass}
        error={errors.passwordConfirm}
        errorMessage={errors?.passwordConfirm?.message}
        translateName={'passwordConf'}
        registerName={'passwordConfirm'}
      />

      <p className={s.infoText}>{translate('desc')}</p>
      <AuthSubmit value={String(translate('btnName'))} disabled={!isValid} />
    </form>
  );
};
