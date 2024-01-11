'use client';

import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Control, Controller, UseFormTrigger } from 'react-hook-form';
import { FormValues } from '../ProfileSettings/SettingsForm/SettingsForm';
import { convertToReactDatePickerObject } from '@/utils';


import './DatePick.scss';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import { isLessThen100YearsOld, isMoreThen13YearsOld } from '@/utils/checkYears';

export const DatePick = ({
  control,
  trigger,
}: {
  control: Control<FormValues>;
  trigger: UseFormTrigger<FormValues>;
}) => {
  const [fieldError, setFieldError] = useState<string>('');

  const t = useTranslations('SettingsProfilePage.SettingsFormSchema');

  return (
    <div className="rmdp-datePickerWrapper">
      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field: { onChange, value } }) => (
          <div
            className={clsx({
              'rmdp-datePickerError': !!fieldError.length,
            })}
          >
            <DatePicker
              className="bg-dark"
              value={value}
              calendarPosition="top-right"
              onClose={() => {
                trigger('dateOfBirth');
              }}
              onChange={function (date: typeof value) {
                if (
                  !isMoreThen13YearsOld(convertToReactDatePickerObject(date))
                ) {
                  setFieldError(t('dateOfBirth.ageMore13'));
                } else if (
                  !isLessThen100YearsOld(convertToReactDatePickerObject(date))
                ) {
                  setFieldError(t('dateOfBirth.ageLess100'));
                } else {
                  setFieldError('');
                  onChange(date?.isValid ? date?.toDate() : '');
                }
              }}
              format="DD/MM/YYYY"
            />
            {!!fieldError.length && (
              <p className="rmdp-error">
                {fieldError}
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
                !!fieldError.length
                  ? '/img/settings-profile/calendarError.svg'
                  : '/img/settings-profile/calendar.svg'
              }
              alt={'calendar'}
              width={24}
              height={24}
            />
          </div>
        )}
      />
    </div>
  );
};
