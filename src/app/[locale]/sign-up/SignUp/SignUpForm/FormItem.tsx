import React, { ReactNode } from "react";
import { InputError } from "./InputError";
import { FieldError, UseFormRegister } from "react-hook-form";
import { ShowHidePass } from "../../../../../components/ShowHidePass/ShowHidePass";

type Props = {
  marginTop: string;
  marginBottom?: string;
  translate: (value: string) => ReactNode;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  registerName: string;
  translateName: string;
  id: string;
  show?: boolean;
  setShow?: (value: boolean) => void;
  showPasswordIcon?: boolean;
};

export const FormItem: React.FC<Props> = ({
  errorMessage,
  error,
  register,
  marginTop,
  translate,
  registerName,
  translateName,
  marginBottom,
  id,
  show,
  setShow,
  showPasswordIcon,
}) => {
  const type = showPasswordIcon !== undefined && show;

  return (

   
    
    <div className={`${marginTop} ${marginBottom}`}>
      <div className={"text-left ml-5 text-[--light-900] text-[14px]"}>
        <label>{translate(translateName)}</label>
      </div>
      <div className={"relative"}>
        <input
          {...register(registerName)}
          className={` bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[90%] ${
            error ? "border-red-700" : ""
          }`}
          id={id}
          type={`${!type ? "text" : "password"}`}
        />
        {showPasswordIcon && <ShowHidePass show={show!} setShow={setShow!} />}
        <InputError error={error} errorMessage={errorMessage} id={"sign-up-userName-error"} />
      </div>
    </div>
  );
};
