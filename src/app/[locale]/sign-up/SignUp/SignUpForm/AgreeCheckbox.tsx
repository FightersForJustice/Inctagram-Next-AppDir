import React, { FC } from 'react';
import Link from 'next/link';
import { InputError } from './InputError';
import { AgreeCheckboxProps } from './typesSignUp';
import s from './AgreeCheckbox.module.scss';

export const AgreeCheckbox: FC<AgreeCheckboxProps> = ({
  translate,
  register,
  error,
  errorMessage,
  registerName,
  id,
}) => {
  return (
    <div className={s.container}>
      <label className={'relative'}>
        <div className={s.text}>
          <input
            type="checkbox"
            className={s.checkbox}
            {...register(registerName)}
            id={id}
          />

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
