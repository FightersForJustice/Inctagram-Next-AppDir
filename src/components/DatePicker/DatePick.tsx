import React, { useEffect, useRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

import s from "./DatePick.module.scss";
import Image from "next/image";
import { convertToReactDatePickerObject } from "@/utils";

type Props = {
  setDate: (date: string) => void;
  userBirthday: string;
  ageError: string | null;
  setAgeError: (value: string) => void;
};

export const DatePick: React.FC<Props> = ({ setDate, userBirthday, ageError, setAgeError }) => {
  const datePickerRef = useRef<any>();

  const [value, setValue] = useState<DateObject | DateObject[] | null>(
    userBirthday ? convertToReactDatePickerObject(userBirthday) : null,
  );

  useEffect(() => {
    if (value) {
      const selectedDate = new Date(value.toString());
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
        // If the selected date's birthday hasn't occurred this year yet, decrease age by 1
        setAgeError(age - 1 < 13 ? "A user under 13 cannot create a profile" : "");
      } else {
        setAgeError(age < 13 ? "A user under 13 cannot create a profile" : "");
      }

      setDate(formatDate(value));
    }
  }, [value]);

  function formatDate(date: DateObject | DateObject[] | null) {
    // @ts-ignore
    const formattedDate = new Date(date?.toDate?.().toString());
    const day = ("0" + formattedDate.getDate()).slice(-2);
    const month = ("0" + (formattedDate.getMonth() + 1)).slice(-2);
    const year = formattedDate.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return (
    <>
      <div className={s.datePicker__wrapper}>
        <DatePicker
          value={userBirthday}
          onChange={setValue}
          ref={datePickerRef}
          format={"DD.MM.YYYY"}
          className={"bg-dark"}
          editable={false}
          style={{
            background: "var(--dark-900)",
            border: "1px solid var(--dark-300)",
            padding: "6px 12px",
            height: "36px",
            borderRadius: "2px",
            maxWidth: "158px",
            marginBottom: "24px",
            cursor: "pointer",
          }}
        >
          <button style={{ margin: "5px" }} onClick={() => datePickerRef?.current?.closeCalendar()}>
            close
          </button>
        </DatePicker>
        <Image
          src={"/img/settings-profile/calendar.svg"}
          alt={"calendar"}
          width={24}
          height={24}
          className={s.datePicker__icon}
        />
        {ageError && <p className={"text-red-600 text-[12px] absolute top-[40px] left-0"}>{ageError}</p>}
      </div>
    </>
  );
};
