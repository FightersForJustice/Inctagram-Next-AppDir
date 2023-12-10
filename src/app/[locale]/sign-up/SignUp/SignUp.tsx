import { FC } from 'react';
import s from './SignUp.module.scss';
import { SignUpForm } from './SignUpForm';
import { useTranslations } from 'next-intl';
import ServiceAuth from '../../sign-in/SignIn/ServiceAuth';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { redirect } from 'next/navigation';

type Props = {
  lang: 'en' | 'ru';
};

export const SignUp: FC<Props> = ({ lang }) => {
  const t = useTranslations('SignUpPage');
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (isAuth) {
    redirect('/my-profile');
  }

  return (
    <div className={s.container}>
      <div className={s.serviceAuth}>
        <ServiceAuth page={'SignUpPage'} />
      </div>
      <SignUpForm lang={lang} translate={t} />
    </div>
  );
};
