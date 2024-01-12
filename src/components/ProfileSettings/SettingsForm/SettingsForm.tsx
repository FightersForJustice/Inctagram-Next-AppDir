'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { DatePick } from '@/components/DatePicker';
import { StatusCode } from '@/api/auth.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from '@/components/Loader';
import { convertToReactDatePickerObject } from '@/utils';
import { SettingsFormSchema } from '@/features/schemas';
import { SettingsFormItem } from './SettingsFormItem';
import { CitySelectors } from '@/components/ProfileSettings/SettingsForm/CitySelector/CitySelector';
import { UserProfileResponse } from '@/app/lib/dataResponseTypes';
import { optionsType } from '@/components/Selector/Selector';

import s from './SettingsForm.module.scss';

export type FormValues = {
  userName: string;
  firstName: string;
  lastName: string;
  city: optionsType;
  country: optionsType;
  dateOfBirth: any;
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
    control,
    trigger,
    resetField,
    reset
  } = useForm<FormValues>({
    //@ts-ignore
    resolver: yupResolver(SettingsFormSchema()),
    mode: 'onTouched',
    defaultValues: {
      dateOfBirth: convertToReactDatePickerObject(dateOfBirth),
    },
  });

  const onSubmit = handleSubmit((data) => {
    const { dateOfBirth, country, city, ...others } = data;
    const formatData = dateOfBirth;
    // ?.toISOString();
    const formatCity = city?.value || '';
    const submitData = { data: formatData, city: formatCity, ...others };
    console.log(submitData);

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
          />

          <div className={s.form__itemWrapper}>
            <label htmlFor="dateOfBirth" className={s.form__label}>
              {translate('birthday')}
            </label>
            <DatePick trigger={trigger} control={control} />
          </div>

          <div className={s.form_itemSelector}>
            <CitySelectors
              control={control}
              userCity={city}
              resetField={resetField}
              reset={reset}
            />
          </div>

          <div className={s.form__itemWrapper}>
            <label htmlFor="settings-profile-aboutMe" className={s.form__label}>
              {translate('aboutMe')}
            </label>
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
