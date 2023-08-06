import React from "react";
import { FieldError } from "react-hook-form";

type Props = {
  error: FieldError | undefined;
  errorMessage: string | undefined;
  id: string;
  className?:string

};

export const InputError: React.FC<Props> = ({ errorMessage, error, id, className }) => {
  return (
    <>
      {error && (
        <p className={`absolute left-[5%] text-[--danger-500] text-[12px] ${className}`} id={id}>
          {errorMessage}
        </p>
      )}
    </>
  );
};
