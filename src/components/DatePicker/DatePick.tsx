'use client';

// {
//   "userName": "string",
//   "firstName": "string",
//   "lastName": "string",
//   "city": "string",
//   "dateOfBirth": "2024-01-08T14:29:12.070Z",
//   "aboutMe": "string"
// }

import { useEffect, useRef, useState } from 'react';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import Image from 'next/image';
import { check13YearsOld, convertToReactDatePickerObject } from '@/utils';
import Link from 'next/link';
import DatePicker, { DateObject } from 'react-multi-date-picker';

import s from './DatePick.module.scss';

export const DatePick = ({ userBirthday }: { userBirthday: string | null }) => {
  const [dateOfBirthText, setDateOfBirthText] = useState(userBirthday);

  const [ageError, setAgeError] = useState('');
  const [value, setValue] = useState<DateObject | DateObject[] | null>(
    userBirthday ? convertToReactDatePickerObject(userBirthday) : null
  );

  const datePickerRef = useRef<any>(null);

  useEffect(() => {
    check13YearsOld(value, setAgeError);
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
