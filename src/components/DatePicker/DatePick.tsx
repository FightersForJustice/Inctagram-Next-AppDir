import React, { useEffect, useRef, useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import s from './DatePick.module.scss';
import Image from 'next/image';
import { check13YearsOld, convertToReactDatePickerObject } from '@/utils';

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
  // @ts-ignore
  const datePickerRef = useRef<DatePicker | null>(null);

  const [value, setValue] = useState<DateObject | DateObject[] | null>(
    userBirthday ? convertToReactDatePickerObject(userBirthday) : null
  );

  useEffect(() => {
    check13YearsOld(value, setAgeError);
  }, [value, setAgeError]);

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
          editable={true}
          style={{
            background: 'var(--dark-900)',
            border: '1px solid var(--dark-300)',
            padding: '6px 12px',
            height: '36px',
            borderRadius: '2px',
            maxWidth: '158px',
            marginBottom: '24px',
            cursor: 'pointer',
          }}
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
          <p className={'text-red-600 text-[12px] absolute top-[40px] left-0'}>
            {ageError}
          </p>
        )}
      </div>
    </>
  );
};
