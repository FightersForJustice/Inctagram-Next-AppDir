'use client';

import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Control, Controller, UseFormTrigger } from 'react-hook-form';
import {
  isMoreThen100YearsOld,
  isLessThen13YearsOld,
} from '@/utils/checkYears';

import './DatePick.scss';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import { convertToISOString } from '@/utils/convertTimeDatePicker';
import { ProfileFormValues } from '../ProfileSettings/SettingsForm/SettingsForm';
import { validateDatePicker } from '@/utils/dateToFormat';

export const DatePick = ({
  control,
  trigger,
  isObsoleteDateOfBirth,
}: {
  control: Control<ProfileFormValues>;
  trigger: UseFormTrigger<ProfileFormValues>;
  isObsoleteDateOfBirth: boolean;
}) => {
  const [fieldError, setFieldError] = useState<string>('');
  const [isObsoleteAge, setIsObsoleteAge] = useState<boolean>(
    isObsoleteDateOfBirth
  );

  const t = useTranslations('SettingsProfilePage.SettingsFormSchema');

  const displayError = !!fieldError.length || isObsoleteAge;

  return (
    <div className="rmdp-datePickerWrapper">
      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field: { onChange, value } }) => (
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
              //@ts-ignore
              onChange={(date: typeof value, { input, isTyping }) => {
                //validating typing of date input
                if (isTyping && !validateDatePicker(input)) {
                  return false;
                }

                isObsoleteAge && setIsObsoleteAge(false);
                const isAgeLessThan13 = isLessThen13YearsOld(date);
                const isAgeMoreThan100 = isMoreThen100YearsOld(date);
                setFieldError(
                  isAgeLessThan13
                    ? t('dateOfBirth.ageMore13')
                    : isAgeMoreThan100
                    ? t('dateOfBirth.ageLess100')
                    : ''
                );

                onChange(date?.isValid ? convertToISOString(date) : '');
              }}
              format="DD/MM/YYYY"
            />
            {displayError && (
              <p className="rmdp-error">
                {fieldError}
                {isObsoleteAge && t('dateOfBirth.ageMessage')}
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
        )}
      />
    </div>
  );
};
