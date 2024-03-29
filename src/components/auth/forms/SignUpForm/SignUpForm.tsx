'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { AuthSubmit, FormItem } from '@/components/Input';
import { AgreeCheckbox, EmailSentModal } from '@/components/auth';
import { SignUpFormSchema } from '@/features/schemas';
import {
  getSignUpFormItemsData,
  resetObjSignUpForm,
} from '@/utils/data/sign-up-form-items-data';
import ServiceAuth from '../../ServiceAuth/ServiceAuth';

import { signUpAction } from '@/app/lib/actions';
import { SignInData } from '@/features/schemas/SignInSchema';

import { AUTH_ROUTES } from '@/appRoutes/routes';
import { Loader } from '@/components/Loader';
import s from './SignUpForm.module.scss';

export const SignUpForm = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`SignUpPage.${key}`);
  const translateErrors = (key: string): string => t(`Errors.${key}`);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(SignUpFormSchema()),
    mode: 'onTouched',
  });

  const { agreements } = getValues();
  const [showPass, setShowPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const processForm = async (data: SignInData) => {
    try {
      setLoading(true);
      const res = await signUpAction(data);
      if (!res?.success && res?.data) {
        if (res?.data === 'userName.nameExist') {
          return setError('userName', {
            type: 'manual',
            message: res?.data,
          });
        }
      }
      setUserEmail(data.email);
      setShowModal(true);
      reset(resetObjSignUpForm);
    } catch (error) {
      console.log(error);
      toast.error({ error }.toString());
    } finally {
      setLoading(false);
    }
  };

  const formItemsProps = getSignUpFormItemsData({
    translateErrors,
    errors,
    showPass,
    showConfirmPass,
    setShowPass,
    setShowConfirmPass,
  });

  const [passwordMismatch, setPasswordMismatch] = useState('');
  const watchedData = watch();

  useEffect(() => {
    if (getValues('passwordConfirm')) {
      watch().password != watch().passwordConfirm
        ? setPasswordMismatch('Пароли не совпадают')
        : setPasswordMismatch('');
    }
  }, [watchedData]);

  return (
    <div className={s.container}>
      <ServiceAuth page={'SignUpPage'} />
      <form onSubmit={handleSubmit(processForm)}>
        <div className={s.formContainer}>
          {formItemsProps.map((formItem) => (
            <FormItem
              passwordMismatch={passwordMismatch}
              translate={translate}
              register={register}
              {...formItem}
              key={formItem.id}
            />
          ))}
        </div>

        <AgreeCheckbox
          agree={agreements}
          translate={translate}
          register={register}
          error={errors.agreements}
          errorMessage={errors?.agreements?.message}
          registerName={'agreements'}
          id={'sign-up-agreements'}
        />
        <AuthSubmit
          id={'sign-up-submit'}
          value={String(translate('btnName'))}
          disabled={!isValid}
        />
        <p className={s.questionContainer}>{translate('question')}</p>
        <Link
          href={AUTH_ROUTES.SIGN_IN}
          className={s.redirectSignIn}
          id={'sign-up-link-to-sign-in'}
        >
          {translate('btnBottomName')}
        </Link>
      </form>
      {showModal && (
        <EmailSentModal
          translate={String(translate('sentEmailConfirm'))}
          userEmail={userEmail}
          setShowModal={setShowModal}
        />
      )}
      {loading && <Loader />}
    </div>
  );
};
