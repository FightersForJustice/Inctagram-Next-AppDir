import React from 'react';
import { InputErrorProps } from './typesSignUp';

export const InputError: React.FC<InputErrorProps> = ({
  errorMessage,
  error,
  id,
  className,
}) => {
  return (
    <>
      {error && (
        <p
          className={`absolute left-[5%] text-[--danger-500] text-[12px] text-left ${className}`}
          id={id}
        >
          {errorMessage}
        </p>
      )}
    </>
  );
};
