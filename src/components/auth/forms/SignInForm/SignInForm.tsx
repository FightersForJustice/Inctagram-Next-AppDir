import { ReactNode, useState } from 'react';
import s from './SignInForm.module.scss';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { Loader } from '@/components/Loader';
import { FormItem } from '../../../Input/FormItem/FormItem';
import { SignInSchema } from '@/features/schemas';
import { usePostLoginMutation } from '@/api';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { IUserLoginRequest } from '@/types/userTypes';
import { AuthSubmit } from '@/components/Input';
import { toast } from 'react-toastify';
import { ServerError } from '@/types/serverResponseTypes';

type Props = {
  translate: (value: string) => ReactNode;
};

export const SignInForm = ({ translate }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(SignInSchema()),
    mode: 'onTouched',
  });
  const [showPass, setShowPass] = useState(true);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [postLogin, { isLoading }] = usePostLoginMutation();

  const onSubmit = async (data: IUserLoginRequest) => {
    const { email, password } = data;
    try {
      await postLogin({ email: email.toLowerCase(), password }).unwrap();
      reset();
    } catch (error) {
      const {
        status,
        data: { messages },
      } = error as ServerError;
      if (status < 500) {
        const message = `${translate(`error${status}`)}`;
        setError('password', {
          type: 'custom',
          message,
        });
      } else {
        toast.error(messages);
      }
    }
  };

  if (isAuth) {
    redirect('/my-profile');
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormItem
          translate={translate}
          register={register}
          error={errors.email}
          errorMessage={errors?.email?.message}
          registerName={'email'}
          translateName={'email'}
          id={'sign-in-email-input'}
        />
        <FormItem
          translate={translate}
          register={register}
          error={errors.password}
          errorMessage={errors?.password?.message}
          registerName={'password'}
          translateName={'password'}
          id={'sign-in-password-input'}
          showPasswordIcon={true}
          show={showPass}
          setShow={setShowPass}
        />
        <div className={s.forgot}>
          <Link
            href={'/forgot-password'}
            className={errors.password ? s.password : ''}
            id={'sign-in-link-forgot-password'}
          >
            {translate('forgotPass')}
          </Link>
        </div>
        <AuthSubmit
          id={'sign-in-submit'}
          value={String(translate('btnName'))}
          error={errors.password ? errors.password + '' : ''}
          disabled={!isValid}
        />
        <p className={s.alreadyHaveText}>{translate('question')}</p>
        <Link
          href={'/sign-up'}
          className={s.signUpBtn}
          id={'sign-in-link-sign-up'}
        >
          {translate('btnBottomName')}
        </Link>
      </form>
      {isLoading && <Loader />}
    </>
  );
};
