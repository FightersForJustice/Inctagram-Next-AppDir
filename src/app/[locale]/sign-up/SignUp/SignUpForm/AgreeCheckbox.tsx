import Link from 'next/link';
import { InputError } from './InputError';
import { AgreeCheckboxProps } from './typesSignUp';

const linkStyle =
  'text-blue-500 underline hover:text-blue-700 hover:no-underline';

export const AgreeCheckbox: React.FC<AgreeCheckboxProps> = ({
  translate,
  register,
  error,
  errorMessage,
  registerName,
  id,
}) => {
  return (
    <div
      className={
        ' mb-[18px] pt-[6px] pb-[6px] cursor-pointer flex justify-center  '
      }
    >
      <label className={'relative'}>
        <div
          className={`text-[12px] pr-[30px] pl-[30px] flex justify-center  items-start`}
        >
          <input
            type="checkbox"
            className={`mr-2 accent-white w-[20px] mt-[2px] `}
            {...register(registerName)}
            id={id}
          />

          <p>
            {translate.rich('agreemetsCheckText', {
              link: (chunks: string) => (
                <Link
                  className={linkStyle}
                  href="./agreemets-page/terms-of-service"
                >
                  {chunks}
                </Link>
              ),
              link2: (chunks: string) => (
                <Link
                  className={linkStyle}
                  href="./agreemets-page/privacy-policy"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>

        <InputError
          error={error}
          errorMessage={errorMessage}
          id={id}
          className={'left-[6.3rem]'}
        />
      </label>
    </div>
  );
};
