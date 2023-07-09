import React, { useEffect, useRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

import s from "./DatePick.module.scss";
import Image from "next/image";

type Props = {
  setDate: (date: string) => void;
};

export const DatePick: React.FC<Props> = ({ setDate }) => {
  const datePickerRef = useRef<any>();
  const [value, setValue] = useState<DateObject | DateObject[] | null>();

  useEffect(() => {
    setDate(formatDate(value!));
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
          value={value}
          onChange={setValue}
          ref={datePickerRef}
          className={"bg-dark"}
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
      </div>
    </>
  );
};
