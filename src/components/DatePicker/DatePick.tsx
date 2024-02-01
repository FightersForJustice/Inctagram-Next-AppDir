'use client';

import { useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Control, Controller, UseFormTrigger } from 'react-hook-form';
import {
  isMoreThen100YearsOld,
  isLessThen13YearsOld,
} from '@/utils/checkYears';
import { convertToISOString } from '@/utils/convertTimeDatePicker';
import { ProfileFormValues } from '../ProfileSettings/SettingsForm/SettingsForm';

import './DatePick.scss';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import DatePicker from 'react-multi-date-picker';

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

  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.SettingsFormSchema.${key}`);

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
              onChange={(date: typeof value) => {
                setFieldError('');

                isObsoleteAge && setIsObsoleteAge(false);
                const isAgeLessThan13 = isLessThen13YearsOld(date);
                const isAgeMoreThan100 = isMoreThen100YearsOld(date);

                isAgeLessThan13 &&
                  setFieldError(translate('dateOfBirth.ageMore13'));
                isAgeMoreThan100 &&
                  setFieldError(translate('dateOfBirth.ageLess100'));

                onChange(date ? convertToISOString(date) : '');
              }}
              format="DD/MM/YYYY"
            />
            {displayError && (
              <p className="rmdp-error">
                {fieldError}
                {isObsoleteAge && translate('dateOfBirth.ageMessage')}
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
