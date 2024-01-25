'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import ServiceAuth from '../../ServiceAuth/ServiceAuth';
import { SignUpFormSchema } from '@/features/schemas';
import { AuthSubmit, FormItem } from '@/components/Input';
import {
  getSignUpFormItemsData,
  resetObjSignUpForm,
} from '@/utils/data/sign-up-form-items-data';
import { AgreeCheckbox, EmailSentModal } from '@/components/auth';

import { signUpAction } from '@/app/lib/actions';
import { SignInData } from '@/features/schemas/SignInSchema';

import s from './SignUpForm.module.scss';

export const SignUpForm = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`SignUpPage.${key}`);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(SignUpFormSchema()),
    mode: 'onTouched',
  });

  const { agreements } = getValues();
  const [showPass, setShowPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const processForm = async (data: SignInData) => {
    console.log("url", process.env.NEXT_PUBLIC_APP_URL);
    
    try {
      await signUpAction(data, process.env.NEXT_PUBLIC_APP_URL).then(() => {
        setUserEmail(data.email);
        setShowModal(true);
        reset(resetObjSignUpForm);
      });
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
    <div className={s.container}>
      <ServiceAuth page={'SignUpPage'} />
      <form onSubmit={handleSubmit(processForm)}>
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
    </div>
  );
};
