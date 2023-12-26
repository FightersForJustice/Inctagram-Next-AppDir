import React, { useEffect, useRef, useState } from 'react';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import s from './DatePick.module.scss';
import Image from 'next/image';
import { check13YearsOld, convertToReactDatePickerObject } from '@/utils';
import Link from 'next/link';
import DatePicker, { DateObject } from 'react-multi-date-picker';
// import { DatePickerRef } from 'react-multi-date-picker';

type Props = {
  setDate: (date: string) => void;
  userBirthday: string;
  ageError: string | null;
  setAgeError: (value: string) => void;
};

export const DatePick: React.FC<Props> = ({
  setDate,
  userBirthday,
  ageError,
  setAgeError,
}) => {
  const datePickerRef = useRef<any>(null);

  const [value, setValue] = useState<DateObject | DateObject[] | null>(
    userBirthday ? convertToReactDatePickerObject(userBirthday) : null
  );

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
          value={userBirthday ? userBirthday : value}
          onChange={(e) => {
            if (e instanceof DateObject) {
              const formattedDate = e.format('DD.MM.YYYY');
              setDate(formattedDate);
            } else {
              setDate('');
            }
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
