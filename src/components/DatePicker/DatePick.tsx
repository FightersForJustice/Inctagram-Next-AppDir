import React, { useRef } from "react";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

import s from "./DatePick.module.scss";
import Image from "next/image";

export const DatePick = () => {
  const datePickerRef = useRef<HTMLDivElement>();

  return (
    <>
      <div className={s.datePicker__wrapper}>
        <label className={s.datePicker__label}>Date of birthday</label>
        <DatePicker
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
          <button
            style={{ margin: "5px" }}
            // @ts-ignore
            onClick={() => datePickerRef?.current?.closeCalendar()}
          >
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
