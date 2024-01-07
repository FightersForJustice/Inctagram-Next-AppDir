'use client';

import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { routes } from '@/api/routes';

import { loginGoogleAction } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { setAuthCookie } from '@/utils/cookiesActions';
import { GetService } from './GetService';

import s from './ServiceAuth.module.scss';

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
      const loginGoogleResponse = await loginGoogleAction(codeResponse.code);

      if (loginGoogleResponse.success) {
        setAuthCookie('accessToken', loginGoogleResponse?.data.accessToken);
        setAuthCookie('refreshToken', loginGoogleResponse?.data.refreshToken);
        setAuthCookie('userEmail', loginGoogleResponse?.data.email);

        router.replace('/my-profile');
      } else toast.error(loginGoogleResponse.data);
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
