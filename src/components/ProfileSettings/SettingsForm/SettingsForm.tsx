'use client';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { updateProfileInfoAction } from '@/app/lib/actions';
import {
  ResponseCountries,
  UserProfileResponse,
} from '@/app/lib/dataResponseTypes';
import { DatePick } from '@/components/DatePicker';
import { CitySelectors } from '@/components/ProfileSettings/SettingsForm/CitySelector/CitySelector';
import { optionsType } from '@/components/Selector/Selector';
import { ProfileSettingsFormSkeleton } from '@/components/Skeletons/ProfileSettingsSkeletons';
import { SettingsFormSchema } from '@/features/schemas';
import { convertToReactDatePickerObject } from '@/utils';
import {
  isLessThen13YearsOld,
  isMoreThen100YearsOld,
} from '@/utils/checkYears';
import { filterValuesProfileForm } from '@/utils/filterValuesProfileForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { SettingsFormItem } from './SettingsFormItem';

import { convertToISOString } from '@/utils/convertTimeDatePicker';
import useFormPersist from '@/utils/useFormPersist';
import s from './SettingsForm.module.scss';

export type ProfileFormValues = {
  userName: string;
  firstName: string;
  lastName: string;
  city?: optionsType | null;
  country?: optionsType;
  dateOfBirth: any;
  aboutMe?: string | null | undefined;
};

export type ProfileFormSubmit = {
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  dateOfBirth: string;
  aboutMe: string;
};

const FORM_KEY = 'local-settings-profile';

export const SettingsForm = ({
  userInfo,
  countriesList,
}: {
  userInfo: UserProfileResponse;
  countriesList: ResponseCountries;
}) => {
  const { userName, firstName, lastName, dateOfBirth, city, aboutMe } =
    userInfo;

  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.GeneralInformationTab.${key}`);
  const translateErrors = (key: string): string =>
    t(`SettingsProfilePage.SettingsFormSchema.${key}`);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const datePickerObj = convertToReactDatePickerObject(dateOfBirth);
  let isObsoleteDateOfBirth =
    isMoreThen100YearsOld(datePickerObj) || isLessThen13YearsOld(datePickerObj);

  const cityArr = city?.split(',') || '';
  const usersCountry = cityArr[0] || '';
  const usersCity = cityArr[1] || '';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    setError,
    trigger,
    watch,
    setValue,
    getValues,
  } = useForm<ProfileFormValues>({
    //@ts-ignore
    resolver: yupResolver(SettingsFormSchema()),
    mode: 'onTouched',
    defaultValues: {
      dateOfBirth: dateOfBirth,
      city: { value: usersCountry + ',' + usersCity, label: usersCity },
      country: { value: usersCountry, label: usersCountry },
    },
  });

  const formStorage = useFormPersist(FORM_KEY, { setValue, trigger });

  const saveToSessionStorage = (key: string, data: any) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    //in case if back will change API , with adding country to endPoint
    const { country, city, aboutMe, dateOfBirth, ...others } = data;

    const optionsFormatData = {
      city: city?.value || '',
      aboutMe: aboutMe || '',
      dateOfBirth: convertToISOString(dateOfBirth) || '',
      ...others,
    };

    const submitData: ProfileFormSubmit =
      filterValuesProfileForm(optionsFormatData);

    updateProfileInfoAction(submitData)
      .then((res) => {
        setTimeout(() => {
          if (!res.success && res.modalText === 'updateProfileUserExist') {
            setError('userName', {
              type: 'manual',
              message: `userName.${res.modalText}`,
            });
          }
          res.success
            ? toast.success(translate(res.modalText))
            : toast.error(translate(res.modalText));
        }, 2000);
      })
      .then(() => {
        formStorage.clear();
      })
      .catch((errors) => console.log(errors))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 2000)
      );
  });

  return (
    <>
      {isLoading ? (
        <ProfileSettingsFormSkeleton />
      ) : (
        <form onSubmit={onSubmit} className={s.form}>
          <div className={s.formContent}>
            <SettingsFormItem
              defaultValue={userName ?? ''}
              translate={translate}
              id={'settings-profile-userName'}
              register={register}
              error={errors.userName}
              errorMessage={
                errors?.userName?.message &&
                translateErrors(errors?.userName?.message)
              }
              registerName={'userName'}
              translateName={'username'}
            />

            <SettingsFormItem
              defaultValue={firstName ?? ''}
              translate={translate}
              id={'settings-profile-firstName'}
              register={register}
              error={errors.firstName}
              errorMessage={
                errors?.firstName?.message &&
                translateErrors(errors?.firstName?.message)
              }
              registerName={'firstName'}
              translateName={'firstname'}
            />

            <SettingsFormItem
              defaultValue={lastName ?? ''}
              translate={translate}
              id={'settings-profile-lastName'}
              register={register}
              error={errors.lastName}
              errorMessage={
                errors?.lastName?.message &&
                translateErrors(errors?.lastName?.message)
              }
              registerName={'lastName'}
              translateName={'lastname'}
            />

            <div className={s.form__itemWrapper}>
              <label htmlFor="dateOfBirth" className={s.form__label}>
                {translate('birthday')}
                <span className={s.form__required}>*</span>
              </label>
              <DatePick
                onClickPrivacyPolicy={() =>
                  saveToSessionStorage(FORM_KEY, Object.assign({}, watch()))
                }
                translateErrors={translateErrors}
                isObsoleteDateOfBirth={isObsoleteDateOfBirth}
                trigger={trigger}
                control={control}
                getValues={getValues}
              />
            </div>

            <div className={s.form_itemSelector}>
              <CitySelectors
                countriesList={countriesList}
                control={control}
                country={usersCountry}
                city={usersCity}
                setValue={setValue}
              />
            </div>

            <div className={s.form__itemWrapper}>
              <label
                htmlFor="settings-profile-aboutMe"
                className={s.form__label}
              >
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
                    errors.aboutMe.message?.length! > 90 &&
                    s.form__textareaError__bottom
                  } `}
                >
                  {errors.aboutMe.message &&
                    translateErrors(errors.aboutMe.message)}
                </p>
              )}
            </div>
          </div>

          <div className={s.form__btn} id={'settings-profile-btn-container'}>
            <PrimaryBtn
              className={s.submit_btn}
              type="submit"
              disabled={!isValid}
            >
              {translate('saveBtn')}
            </PrimaryBtn>
          </div>
        </form>
      )}
    </>
  );
};
