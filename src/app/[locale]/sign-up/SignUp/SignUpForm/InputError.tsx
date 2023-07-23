import React from "react";
import { FieldError } from "react-hook-form";

type Props = {
  error: FieldError | undefined;
  errorMessage: string | undefined;
  id: string;
};

export const InputError: React.FC<Props> = ({ errorMessage, error, id }) => {
  return (
    <>
      {error && (
        <p className={"absolute left-[5%] text-[--danger-500] text-[12px]"} id={id}>
          {errorMessage}
        </p>
      )}
    </>
  );
};
