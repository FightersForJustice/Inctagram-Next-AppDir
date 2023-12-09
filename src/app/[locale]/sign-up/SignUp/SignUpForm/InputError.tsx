import { InputErrorProps } from './typesSignUp';
import s from './InputError.module.scss'

export const InputError = ({
  errorMessage,
  error,
  id,
  className,
}: InputErrorProps) => {
  return (
    error && (
      <p
        // className={`relative left-[0] text-[--danger-500] text-[12px] text-left ${
        className={`${s.container} ${
          className ? className : ''
        }`}
        id={id}
      >
        {errorMessage}
      </p>
    )
  );
};
