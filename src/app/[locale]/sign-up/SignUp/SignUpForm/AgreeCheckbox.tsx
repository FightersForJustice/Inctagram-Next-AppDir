import { useState } from 'react';
import Link from 'next/link';
import { InputError } from './InputError';
import { AgreeCheckboxProps } from './typesSignUp';
import s from './AgreeCheckbox.module.scss';

export const AgreeCheckbox = ({
  translate,
  register,
  error,
  errorMessage,
  registerName,
  id,
}: AgreeCheckboxProps) => {
  const [agree, setAgree] = useState(false);
  return (
    <div className={s.container}>
      <label htmlFor={id} className={s.checkBoxContainer}>
        <div className={s.text}>
          <input
            type="checkbox"
            className={s.checkbox}
            onClick={() => setAgree(!agree)}
            {...register(registerName)}
            id={id}
          />

          <svg height={24} width={24} viewBox="0 0 24 24" fill="none">
            {(!agree && (
              <g>
                <path
                  d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                  fill="#C3C1C7"
                />
              </g>
            )) || (
              <g>
                <rect x="4" y="6" width="16" height="12" fill="black" />
                <path
                  d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                  fill="white"
                />
              </g>
            )}
          </svg>
          <p>
            {translate.rich('agreementsCheckText', {
              link: (chunks: string) => (
                <Link
                  className={s.link}
                  href="./agreements-page/terms-of-service"
                >
                  {chunks}
                </Link>
              ),
              link2: (chunks: string) => (
                <Link
                  className={s.link}
                  href="./agreements-page/privacy-policy"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>

        <InputError error={error} errorMessage={errorMessage} id={id} />
      </label>
    </div>
  );
};
