'use client';

import { useForm } from 'react-hook-form';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { DatePick } from '@/components/DatePicker';
import { useState } from 'react';
// import {
//   PutProfileBody,
//   useLazyGetProfileQuery,
//   usePutProfileMutation,
// } from '@/api/profile.api';
import { StatusCode } from '@/api/auth.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Loader } from '@/components/Loader';
import { handleApiError } from '@/utils';
import { SettingsFormSchema } from '@/features/schemas';
import { SettingsFormItem } from './SettingsFormItem';
import CitySelector from '@/components/ProfileSettings/SettingsForm/CitySelector/CitySelector';
import { UserProfileResponse } from '@/app/lib/dataResponseTypes';
import { useTranslations } from 'next-intl';

import s from './SettingsForm.module.scss';

type FormValues = {
  userName: string;
  firstName: string;
  lastName: string;
  city: string | null;
  aboutMe: string | null | undefined;
};

export const SettingsForm = ({
  userInfo,
}: {
  userInfo: UserProfileResponse;
}) => {
  const { userName, firstName, lastName, dateOfBirth, city, aboutMe } =
    userInfo;

  const translate = useTranslations(
    'SettingsProfilePage.GeneralInformationTab'
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    control,
  } = useForm<FormValues>({
    //@ts-ignore
    resolver: yupResolver(SettingsFormSchema()),
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    // if (ageError) {
    //   setAgeError('');
    // }
    // let parts = dateOfBirth.split('.');
    // let birthdayDate: Date | string = new Date(
    //   +parts[2],
    //   +parts[1] - 1,
    //   +parts[0]
    // );
    // const result: PutProfileBody = {
    //   userName: data.userName,
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   city: userCity,
    //   dateOfBirth: dateOfBirth
    //     ? String(birthdayDate) === 'Invalid Date'
    //       ? userBirthday
    //       : String(birthdayDate)
    //     : userBirthday,
    //   aboutMe: data.aboutMe || ' ',
    // };
    // updateProfile(result)
    //   .unwrap()
    //   .then(() => {
    //     getUserProfile();
    //     toast.success('Profile successfully updated');
    //   })
    //   .catch((err) => {
    //     if (err.status === StatusCode.badRequest) {
    //       setError(err.data.messages[0]?.field, {
    //         message: err.data.messages[0]?.message,
    //       });
    //     }
    //     toast.error(err.error);
    //   });
  });

  // if (error) {
  //   handleApiError(error);
  // }

  return (
    <>
      <form onSubmit={onSubmit} className={s.form}>
        <div className={s.formContent}>
          <SettingsFormItem
            defaultValue={userName ?? ''}
            translate={translate}
            id={'settings-profile-userName'}
            register={register}
            error={errors.userName}
            errorMessage={errors?.userName?.message}
            registerName={'userName'}
            translateName={'username'}
            minLength={5}
            maxLength={15}
          />

          <SettingsFormItem
            defaultValue={firstName ?? ''}
            translate={translate}
            id={'settings-profile-firstName'}
            register={register}
            error={errors.firstName}
            errorMessage={errors?.firstName?.message}
            registerName={'firstName'}
            translateName={'firstname'}
            minLength={2}
            maxLength={15}
          />

          <SettingsFormItem
            defaultValue={lastName ?? ''}
            translate={translate}
            id={'settings-profile-lastName'}
            register={register}
            error={errors.lastName}
            errorMessage={errors?.lastName?.message}
            registerName={'lastName'}
            translateName={'lastname'}
            minLength={2}
            maxLength={15}
          />

          <div className={s.form__itemWrapper}>
            <label className={s.form__label}>{translate('birthday')}</label>
            <DatePick control={control} userBirthday={dateOfBirth ?? null} />
          </div>
          {/*           
          <CitySelector
            translate={translate}
            translateName={'city'}
            error={errors.city}
            errorMessage={errors?.city?.message}
            id={'settings-profile-city'}
            userCity={userCity}
            setUserCity={setUserCity}
          /> */}

          <div className={s.form__itemWrapper}>
            <label className={s.form__label}>{translate('aboutMe')}</label>
            <textarea
              defaultValue={aboutMe ?? ''}
              id={'settings-profile-aboutMe'}
              {...register('aboutMe', {
                required: false,
                minLength: 10,
                maxLength: 100,
              })}
              className={`${
                errors.aboutMe ? s.form__textarea__error : s.form__textarea
              }`}
            />
            {errors.aboutMe && (
              <p
                className={`${s.form__textareaError} ${
                  errors.aboutMe.message?.length! > 90
                    ? `${s.form__textareaError__bottom}`
                    : ''
                } `}
              >
                {errors.aboutMe.message}
              </p>
            )}
          </div>
        </div>

        <div className={s.form__btn} id={'settings-profile-btn-container'}>
          <PrimaryBtn type="submit" disabled={!isValid}>
            {translate('saveBtn')}
          </PrimaryBtn>
        </div>
      </form>
    </>
  );
};
