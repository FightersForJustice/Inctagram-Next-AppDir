'use client';

import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import GetService from './GetService';
import { routes } from '@/api/routes';

import s from './ServiceAuth.module.scss';
import { loginGoogleAction } from '@/app/actions';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { setAuthCookie } from '@/utils/cookiesActions';

type Props = {
  page: 'SignInPage' | 'SignUpPage';
};
const ServiceAuth = ({ page }: Props) => {
  const t = useTranslations(page);
  const router = useRouter();

  const gitHubAuth = () => {
    //need change on local lang from state (header lang)
    window.location.assign(routes.GITHUB_LOGIN);
  };

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const data = await loginGoogleAction(codeResponse.code);

        setAuthCookie('accessToken', data?.data.accessToken);
        setAuthCookie('refreshToken', data?.data.refreshToken);
        setAuthCookie('userEmail', data?.data.email);

        router.push('/my-profile');
      } catch (error) {
        console.log('error', error);
      }
    },
    onError: (errorResponse) => toast.error(errorResponse.error),
  });
  return (
    <>
      <p className={s.title}>{t('title')}</p>
      <div className={s.container}>
        <GetService
          onClick={googleLogin}
          img="/img/google.svg"
          alt="google-icon"
        />
        <GetService
          onClick={gitHubAuth}
          img="/img/github.svg"
          alt="github-icon"
        />
      </div>
    </>
  );
};

export default ServiceAuth;
