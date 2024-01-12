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
import {
  isLessThen100YearsOld,
  isMoreThen13YearsOld,
} from '@/utils/checkYears';

import './DatePick.scss';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

export const DatePick = ({
  control,
  trigger,
}: {
  control: Control<FormValues>;
  trigger: UseFormTrigger<FormValues>;
}) => {
  const [fieldError, setFieldError] = useState<{
    count: number;
    message: string;
  }>({ count: 0, message: '' });

  const t = useTranslations('SettingsProfilePage.SettingsFormSchema');

  const isErrorField = !!fieldError.message.length && fieldError.count > 1;

  return (
    <div className="rmdp-datePickerWrapper">
      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field: { onChange, value } }) => (
          <div
            className={clsx({
              'rmdp-datePickerError': isErrorField,
            })}
          >
            <DatePicker
              id='dateOfBirth'
              className="bg-dark"
              value={value}
              calendarPosition="top-right"
              onClose={() => {
                trigger('dateOfBirth');
                //adding count to simulate onBlur DatePicker action (there is no onBlur in lib)
                setFieldError((prev) => ({
                  count: prev.count + 1,
                  message: prev.message,
                }));
              }}
              onChange={(date: typeof value) => {
                const isAgeMoreThan13 = isMoreThen13YearsOld(
                  convertToReactDatePickerObject(date)
                );
                const isAgeLessThan100 = isLessThen100YearsOld(
                  convertToReactDatePickerObject(date)
                );

                //set the error manually with count, to avoid first useForm error
                setFieldError((prev) => ({
                  count: prev.count + 1,
                  message: !isAgeMoreThan13
                    ? t('dateOfBirth.ageMore13')
                    : !isAgeLessThan100
                    ? t('dateOfBirth.ageLess100')
                    : '',
                }));

                onChange(date?.isValid ? date?.toDate() : '');
              }}
              format="DD/MM/YYYY"
            />
            {isErrorField && (
              <p className="rmdp-error">
                {fieldError.message}
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
                isErrorField
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
