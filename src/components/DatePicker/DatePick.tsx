'use client';

import { useEffect, useRef, useState } from 'react';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import Image from 'next/image';
import { check13YearsOld, convertToReactDatePickerObject } from '@/utils';
import Link from 'next/link';
import DatePicker, { DateObject } from 'react-multi-date-picker';

import s from './DatePick.module.scss';
import { Control } from 'react-hook-form';

export const DatePick = ({
  userBirthday,
  control,
}: {
  userBirthday: string | null;
  control: Control<any>;
}) => {
  const [dateOfBirthText, setDateOfBirthText] = useState(userBirthday);

  const [ageError, setAgeError] = useState('');
  const [value, setValue] = useState<DateObject | DateObject[] | null>(
    userBirthday ? convertToReactDatePickerObject(userBirthday) : null
  );

  const datePickerRef = useRef<any>(null);

  useEffect(() => {
    check13YearsOld(value, setAgeError);
    console.log('dateOfBirthText', dateOfBirthText);

    var el = document.querySelector('div.rmdp-container');
    el?.classList.add(s.border);
  }, [value, setAgeError]);

  const finalInput = ageError ? s.container + ' ' + s.borderError : s.container;

  return (
    <>
      <div className={s.datePicker__wrapper}>
        <DatePicker
          value={value}
          onChange={(e) => {
            if (e instanceof DateObject) {
              const formattedDate = e.format('DD.MM.YYYY');
              setDateOfBirthText(formattedDate);
            } else {
              setDateOfBirthText('');
            }
            console.log(value);

            setValue(e);
          }}
          ref={datePickerRef}
          format={'DD.MM.YYYY'}
          className={'bg-dark'}
          inputClass={finalInput}
          editable={true}
        >
          <button
            style={{ margin: '5px' }}
            onClick={() => datePickerRef?.current?.closeCalendar()}
          >
            close
          </button>
        </DatePicker>
        <Image
          src={'/img/settings-profile/calendar.svg'}
          alt={'calendar'}
          width={24}
          height={24}
          className={s.datePicker__icon}
        />
        {ageError && (
          <p className={s.error}>
            {ageError}
            <Link
              href={'/agreements/privacy-policy-profile'}
              className={'underline'}
            >
              Privacy policy
            </Link>
          </p>
        )}
      </div>
    </>
  );
};
