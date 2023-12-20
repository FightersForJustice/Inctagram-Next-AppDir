'use client';

import { useEffect, useState } from 'react';
import s from './SignUpForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { StatusCode, usePostAuthorizationMutation } from '@/api/auth.api';
import { SignUpFormSchema } from '@/features/schemas';
import { Loader } from '@/components/Loader';
import { EmailSentModal } from './EmailSentModal';
import { FormItem } from './FormItem';
import { AgreeCheckbox } from './AgreeCheckbox';
import { toast } from 'react-toastify';
import { SignUpFormProps, SubmitProps } from './typesSignUp';
import { AuthSubmit } from '@/components/Input';
import {
  getSignUpFormItemsData,
  resetObjSignUpForm,
} from '@/utils/data/sign-up-form-items-data';
import { translateError } from '@/utils/translateErrorSignUpForm';
import ServiceAuth from '@/app/(locale)/sign-in/SignIn/ServiceAuth';
import { useTranslations } from 'next-intl';

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setError,
  } = useForm({
    resolver: yupResolver(SignUpFormSchema()),
    mode: 'onTouched',
  });

  const [showPass, setShowPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const translate = useTranslations('SignUpPage');

  const [postAuthorization, { isSuccess, isLoading }] =
    usePostAuthorizationMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowModal(true);
      reset(resetObjSignUpForm);
    }
  }, [isSuccess]);

  const onSubmit = (data: SubmitProps) => {
    try {
      postAuthorization({
        userName: data.userName,
        email: data.email,
        password: data.password,
      })
        .unwrap()
        .catch((err) => {
          if (err?.data?.statusCode === StatusCode.badRequest) {
            setError(err.data.messages[0]?.field, {
              message: translateError(err.data.messages[0]?.message, translate),
            });
          } else {
            toast.error(err.error);
          }
        });
      setUserEmail(data.email);
    } catch (error) {
      toast.error({ error }.toString());
    }
  };

  const formItemsProps = getSignUpFormItemsData({
    errors,
    showPass,
    showConfirmPass,
    setShowPass,
    setShowConfirmPass,
  });

  return (
    <>
      <div>
        <ServiceAuth page={'SignUpPage'} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.formContainer}>
          {formItemsProps.map((formItem) => (
            <FormItem
              translate={translate}
              register={register}
              {...formItem}
              key={formItem.id}
            />
          ))}
        </div>

        <AgreeCheckbox
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
          href={'/sign-in'}
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
      {isLoading && <Loader />}
    </>
  );
};
