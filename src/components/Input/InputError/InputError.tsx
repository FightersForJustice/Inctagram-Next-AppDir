import { InputErrorProps } from '@/types/signUpTypes';
import { dictionary } from '@/features/data/passwordSymbols';
import { errorStyle, setStyle } from './utils';

export const InputError = ({ errorMessage, error, id }: InputErrorProps) => {
  return (
    error && (
      <p
        className={setStyle(id, error.toString(), id.slice(0, 7) === 'sign-in')}
        id={id}
      >
        {errorMessage} {errorStyle(error.message) && dictionary}
      </p>
    )
  );
};
