'use client';

import React, { useEffect, useState } from 'react';
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

type FormType = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    agreements: NonNullable<boolean | undefined>;
};

export const SignUpForm: React.FC<Props> = ({ translate}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
        setError,
    } = useForm<FormType>({
        resolver: yupResolver(SignUpFormSchema()),
        mode: 'onTouched',
    });

  const [showPass, setShowPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const resetObj = {
    name: '',
    agreements: false,
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const [postAuthorization, { isSuccess, isLoading }] =
    usePostAuthorizationMutation();

  useEffect(() => {
    isSuccess && setShowModal(true);
    reset(resetObj);
  }, [isSuccess]);

    const translateError = (err: string) => ({
            'User with this name is already exist': String(translate('nameExist')),
            'User with this email is already exist': String(translate('emailExist'))
        }[err])


    const onSubmit = (data: SubmitProps) => {
        postAuthorization({
            userName: data.name,
            email: data.email,
            password: data.password,
        }).unwrap().catch((err) => {
                if (err?.data?.statusCode === StatusCode.badRequest) {
                    setError(err.data.messages[0]?.field, {
                        message: translateError(err.data.messages[0]?.message),
                    });
                } else {
                    toast.error(err.error);
                }
            });
        setUserEmail(data.email);

        localStorage.setItem('user-email', data.email);
    };

    const formItemsProps = getSignUpFormItemsData({
        errors,
        showPass,
        showConfirmPass,
        setShowPass,
        setShowConfirmPass
    })

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={' mt-[24px] mb-2 pb-[24px]'}
            >
                {
                    formItemsProps.map(formItem => {
                        return (
                            <FormItem translate={translate}
                                      register={register} {...formItem} />
                        )
                    })

                }
                <AgreeCheckbox
                    translate={translate}
                    register={register}
                    error={errors.agreements}
                    errorMessage={errors?.agreements?.message}
                    registerName={'agreements'}
                    id={'sign-up-agreemets'}
                />

                <input
                    type="submit"
                    className={
                        'mb-[18px] bg-[--primary-500] w-[90%] pt-[6px] pb-[6px] cursor-pointer disabled:bg-[--primary-100] disabled:text-gray-300 disabled:cursor-not-allowed '
                    }
                    id={'sign-up-submit'}
                    value={String(translate('btnName'))}
                    disabled={!isValid}
                />
                <p className={'pb-5'}>{translate('question')}</p>
                <Link
                    href={'/sign-in'}
                    className={'text-[--primary-500]'}
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
            {isLoading && <Loader/>}
        </>
    );
};
