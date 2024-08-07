'use client';

import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { CreateNewPasswordFormSchema } from '@/features/schemas/CreateNewPasswordFormSchema';
import { CreateFormItem } from './CreateFormItem';
import { AuthSubmit } from '@/components/Input';
import {
  checkRecoveryCodeAction,
  deleteAllSessionsAction,
  getIpAddress,
  newPasswordAction,
  signInAction,
} from '@/app/lib/actions';

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

  const { t } = useTranslation();
  const translateError = (key: string): string => t(`Errors.${key}`);
  const router = useRouter();

  const onSubmit = async (data: { password: string }) => {
    let email: string = '';
    const ipAddress = await getIpAddress();
    checkRecoveryCodeAction(newPasswordCode)
      .then((res) => {
        email = res.data.email;
        return newPasswordAction(data.password, newPasswordCode);
      })
      .then(() => {
        toast.success(translate('newPasswordSuccess'));
        const password = data.password;

        return signInAction({ email, password }, '', ipAddress);
      })
      .then(() => deleteAllSessionsAction())
      .then(() => router.push('/'))
      .catch((error) => {
        console.error('Error during the process:', error);

        toast.error(translate('errorCode'));
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CreateFormItem
        register={register}
        showValue={showPass}
        setShowCallback={setShowPass}
        error={errors.password}
        errorMessage={
          errors?.password?.message && translateError(errors?.password?.message)
        }
        translateName={'password'}
        registerName={'password'}
      />

      <CreateFormItem
        register={register}
        showValue={showConfirmPass}
        setShowCallback={setShowConfirmPass}
        error={errors.passwordConfirm}
        errorMessage={
          errors?.passwordConfirm?.message &&
          translateError(errors?.passwordConfirm?.message)
        }
        translateName={'passwordConf'}
        registerName={'passwordConfirm'}
      />

      <p className={s.infoText}>{translate('desc')}</p>
      <AuthSubmit value={String(translate('btnName'))} disabled={!isValid} />
    </form>
  );
};
