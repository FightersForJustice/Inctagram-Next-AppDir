import { InputErrorProps } from './typesSignUp';
import s from './InputError.module.scss';

export const InputError = ({
  errorMessage,
  error,
  id,
  className,
}: InputErrorProps) => {
  return (
    error && (
      <p className={`${s.container} ${className ? className : ''}`} id={id}>
        {errorMessage}
      </p>
    )
  );
};
