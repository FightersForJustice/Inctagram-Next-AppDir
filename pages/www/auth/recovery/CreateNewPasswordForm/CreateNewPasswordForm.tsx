import React, { ReactNode, useEffect, useState } from 'react';
import s from './CreateNewPasswordForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/navigation';
import {
  StatusCode,
  usePostNewPasswordMutation,
  usePostPasswordCheckRecoveryCodeMutation,
} from '@/api/auth.api';
import { Loader } from '@/components/Loader/Loader';
import { CreateNewPasswordFormSchema } from '@/features/schemas/CreateNewPasswordFormSchema';
import { toast } from 'react-toastify';
import { CreateFormItem } from './CreateFormItem';
import { AuthSubmit } from '@/components/Input';

type Props = {
  translate: (value: string) => ReactNode;
};

export const CreateNewPasswordForm: React.FC<Props> = ({ translate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(CreateNewPasswordFormSchema()),
  });

  const [showPass, setShowPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  const [postNewPassword, { isSuccess, isLoading }] =
    usePostNewPasswordMutation();
  const [checkCode, { isLoading: isCheckLoading }] =
    usePostPasswordCheckRecoveryCodeMutation();

  useEffect(() => {
    setRecoveryCode(sessionStorage.getItem('userEmailRecoveryCode')!);

    if (recoveryCode) {
      checkCode({ recoveryCode })
        .unwrap()
        .then(() => setIsCodeSuccess(true))
        .catch((err) => {
          toast.error(err.error);
          if (err.data.statusCode === StatusCode.badRequest) {
            setServerError(err.data.messages[0]?.message);
            //setError("passwordConfirm", { message: err.data.messages[0]?.message });
          }
        });
    }
  }, [recoveryCode]);

  useEffect(() => {
    if (isSuccess) {
      router.push('/sign-in');
    }
  }, [isSuccess, router]);

  const onSubmit = (data: { password: string }) => {
    if (isCodeSuccess) {
      postNewPassword({ newPassword: data.password, recoveryCode })
        .unwrap()
        .catch((err) => toast.error(err.error));
      sessionStorage.removeItem('userEmailRecoveryCode');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateFormItem
          marginTop={' mt-[36px]'}
          placeholder="******************"
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
          placeholder="******************"
          marginTop={'mt-[28px]'}
          marginBottom={'mb-[8px]'}
          translate={translate}
          register={register}
          showValue={showConfirmPass}
          setShowCallback={setShowConfirmPass}
          error={errors.passwordConfirm}
          errorMessage={errors?.passwordConfirm?.message}
          translateName={'passwordConf'}
          registerName={'passwordConfirm'}
        />

        {serverError && <p className={s.errorMessage}>{serverError}</p>}
        <p className={s.infoText}>{translate('desc')}</p>
        <AuthSubmit
          value={String(translate('btnName'))}
          disabled={!!serverError || !isValid}
        />
      </form>
      {isLoading || (isCheckLoading && <Loader />)}
    </>
  );
};
