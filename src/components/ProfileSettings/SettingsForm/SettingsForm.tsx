'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { DatePick } from '@/components/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertToReactDatePickerObject } from '@/utils';
import { SettingsFormSchema } from '@/features/schemas';
import { SettingsFormItem } from './SettingsFormItem';
import { CitySelectors } from '@/components/ProfileSettings/SettingsForm/CitySelector/CitySelector';
import { UserProfileResponse } from '@/app/lib/dataResponseTypes';
import { optionsType } from '@/components/Selector/Selector';
import { updateProfileInfoAction } from '@/app/lib/actions';
import { filterValuesProfileForm } from '@/utils/filterValuesProfileForm';

import s from './SettingsForm.module.scss';

export type ProfileFormValues = {
  userName: string;
  firstName: string;
  lastName: string;
  city?: optionsType | null;
  country?: optionsType;
  dateOfBirth?: any;
  aboutMe?: string | null | undefined;
};

export type ProfileFormSubmit = {
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  dateOfBirth?: string;
  aboutMe: string;
};

export const SettingsForm = ({
  userInfo,
}: {
  userInfo: UserProfileResponse;
}) => {
  const { userName, firstName, lastName, dateOfBirth, city, aboutMe } =
    userInfo;

  console.log(userInfo);

  const translate = useTranslations(
    'SettingsProfilePage.GeneralInformationTab'
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    trigger,
    setValue,
  } = useForm<ProfileFormValues>({
    //@ts-ignore
    resolver: yupResolver(SettingsFormSchema()),
    mode: 'onTouched',
    defaultValues: {
      dateOfBirth: convertToReactDatePickerObject(dateOfBirth),
    },
  });

  const onSubmit = handleSubmit((data) => {
    //in case if back will change API , with adding country to endPoint
    const { country, city, aboutMe, ...others } = data;

    const optionsFormatData = {
      city: city?.value || '',
      aboutMe: aboutMe || '',
      ...others,
    };

    const submitData: ProfileFormSubmit =
      filterValuesProfileForm(optionsFormatData);

    updateProfileInfoAction(submitData)
      .then((res) => {
        res.success ? toast.success(res.modalText) : toast.error(res.modalText);
      })
      .catch((errors) => console.log(errors));
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
              setValue={setValue}
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
