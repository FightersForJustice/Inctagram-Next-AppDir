import { InputErrorProps } from './typesSignUp';

export const InputError = ({
  errorMessage,
  error,
  id,
  className,
}: InputErrorProps) => {
  return (
    error && (
      <p
        className={`relative left-[0] text-[--danger-500] text-[12px] text-left ${
          className ? className : ''
        }`}
        id={id}
      >
        {errorMessage}
      </p>
    )
  );
};
