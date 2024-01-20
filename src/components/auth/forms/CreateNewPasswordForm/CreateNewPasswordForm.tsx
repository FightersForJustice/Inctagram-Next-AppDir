'use client';

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
} from '@/app/lib/actions';
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
    let email: string = '';

    checkRecoveryCodeAction(newPasswordCode)
      .then((res) => {
        email = res.data.email;
        return newPasswordAction(data.password, newPasswordCode);
      })
      .then(() => {
        toast.success(translate('newPasswordSuccess'));
        const password = data.password;
        return signInAction({ email, password });
      })
      .then((signInResult) => {
        setAuthCookie('accessToken', signInResult?.data.accessToken);
        setAuthCookie('refreshToken', signInResult?.data.refreshToken);
        return deleteAllSessionsAction(
          signInResult?.data.accessToken,
          signInResult?.data.refreshToken
        );
      })
      .then(() => router.push('/my-profile'))
      .catch((error) => {
        console.error('Error during the process:', error);

        toast.error(translate('errorCode'));
      });
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
