'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import DatePicker from 'react-multi-date-picker';

import { convertToISOString } from '@/utils/convertTimeDatePicker';
import { Control, UseFormTrigger, useController } from 'react-hook-form';
import { ProfileFormValues } from '../ProfileSettings/SettingsForm/SettingsForm';

import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import './DatePick.scss';

export const DatePick = ({
  control,
  trigger,
  isObsoleteDateOfBirth,
  translateErrors,
  isMoreThen100YearsOld,
  isLessThen13YearsOld,
}: {
  control: Control<ProfileFormValues>;
  trigger: UseFormTrigger<ProfileFormValues>;
  isObsoleteDateOfBirth: boolean;
  translateErrors: (key: string) => string;
  isLessThen13YearsOld: boolean;
  isMoreThen100YearsOld: boolean;
}) => {
  const [fieldError, setFieldError] = useState<string>('');
  // const [isObsoleteAge, setIsObsoleteAge] = useState<boolean>(
  //   isObsoleteDateOfBirth
  // );

  // const displayError = !!fieldError.length || isObsoleteAge;
  const displayError =
    !!fieldError.length || isLessThen13YearsOld || isMoreThen100YearsOld;

  const {
    field: { onChange, value },
  } = useController<ProfileFormValues>({ control, name: 'dateOfBirth' });

  useEffect(() => {
    console.log(isLessThen13YearsOld);
    console.log(isMoreThen100YearsOld);
    isLessThen13YearsOld && setFieldError('dateOfBirth.ageMore13');
    isMoreThen100YearsOld && setFieldError('dateOfBirth.ageLess100');
  }, []);

  return (
    <div className="rmdp-datePickerWrapper">
      <div
        className={clsx({
          'rmdp-datePickerError': displayError,
        })}
      >
        <DatePicker
          id="dateOfBirth"
          className="bg-dark"
          value={value}
          calendarPosition="top-right"
          onClose={() => {
            trigger('dateOfBirth');
          }}
          onChange={(date: typeof value) => {
            setFieldError('');

            // isObsoleteAge && setIsObsoleteAge(false);
            // const isAgeLessThan13 = isLessThen13YearsOld(date);
            // const isAgeMoreThan100 = isMoreThen100YearsOld(date);

            // isAgeLessThan13 && setFieldError('dateOfBirth.ageMore13');
            // isAgeMoreThan100 && setFieldError('dateOfBirth.ageLess100');

            onChange(date ? convertToISOString(date) : '');
          }}
          format="DD/MM/YYYY"
        />
        {displayError && (
          <p className="rmdp-error">
            {!!fieldError.length && translateErrors(fieldError)}
            {isObsoleteAge && translateErrors('dateOfBirth.ageMessage')}
            <Link
              href={'/agreements/privacy-policy-profile'}
              className={'underline pl-[5px]'}
            >
              Privacy policy
            </Link>
          </p>
        )}
        <Image
          className="rmdp-datePickerIcon"
          src={
            displayError
              ? '/img/settings-profile/calendarError.svg'
              : '/img/settings-profile/calendar.svg'
          }
          alt={'calendar'}
          width={24}
          height={24}
        />
      </div>
      {/*<Controller*/}
      {/*  control={control}*/}
      {/*  name="dateOfBirth"*/}
      {/*  render={({ field: { onChange, value } }) => (*/}
      {/*    <div*/}
      {/*      className={clsx({*/}
      {/*        'rmdp-datePickerError': displayError,*/}
      {/*      })}*/}
      {/*    >*/}
      {/*      <DatePicker*/}
      {/*        id="dateOfBirth"*/}
      {/*        className="bg-dark"*/}
      {/*        value={value}*/}
      {/*        calendarPosition="top-right"*/}
      {/*        onClose={() => {*/}
      {/*          trigger('dateOfBirth');*/}
      {/*        }}*/}
      {/*        onChange={(date: typeof value) => {*/}
      {/*          setFieldError('');*/}

      {/*          isObsoleteAge && setIsObsoleteAge(false);*/}
      {/*          const isAgeLessThan13 = isLessThen13YearsOld(date);*/}
      {/*          const isAgeMoreThan100 = isMoreThen100YearsOld(date);*/}

      {/*          isAgeLessThan13 && setFieldError('dateOfBirth.ageMore13');*/}
      {/*          isAgeMoreThan100 && setFieldError('dateOfBirth.ageLess100');*/}

      {/*          onChange(date ? convertToISOString(date) : '');*/}
      {/*        }}*/}
      {/*        format="DD/MM/YYYY"*/}
      {/*      />*/}
      {/*      {displayError && (*/}
      {/*        <p className="rmdp-error">*/}
      {/*          {!!fieldError.length && translateErrors(fieldError)}*/}
      {/*          {isObsoleteAge && translateErrors('dateOfBirth.ageMessage')}*/}
      {/*          <Link*/}
      {/*            href={'/agreements/privacy-policy-profile'}*/}
      {/*            className={'underline pl-[5px]'}*/}
      {/*          >*/}
      {/*            Privacy policy*/}
      {/*          </Link>*/}
      {/*        </p>*/}
      {/*      )}*/}
      {/*      <Image*/}
      {/*        className="rmdp-datePickerIcon"*/}
      {/*        src={*/}
      {/*          displayError*/}
      {/*            ? '/img/settings-profile/calendarError.svg'*/}
      {/*            : '/img/settings-profile/calendar.svg'*/}
      {/*        }*/}
      {/*        alt={'calendar'}*/}
      {/*        width={24}*/}
      {/*        height={24}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*/>*/}
    </div>
  );
};
