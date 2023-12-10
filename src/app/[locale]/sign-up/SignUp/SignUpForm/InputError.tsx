import { FC } from 'react';
import { InputErrorProps } from './typesSignUp';

export const InputError: FC<InputErrorProps> = ({
  errorMessage,
  error,
  id,
  className,
}) => {
  return (
    <>
      {error && (
        <p
          className={`absolute left-[0] text-[--danger-500] text-[12px] text-left ${className}`}
          id={id}
        >
          {errorMessage}
        </p>
      )}
    </>
  );
};
