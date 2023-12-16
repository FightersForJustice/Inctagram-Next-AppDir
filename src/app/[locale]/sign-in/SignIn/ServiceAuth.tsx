import s from './ServiceAuth.module.scss';
import { useGoogleLogin } from '@react-oauth/google';
import { useLoginWithGoogleOAuthMutation } from '@/api';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import GetService from './GetService';

type Props = {
  page: 'SignInPage' | 'SignUpPage';
};
const ServiceAuth = ({ page }: Props) => {
  const t = useTranslations(page);
  const [loginWithGoogle, { isLoading }] = useLoginWithGoogleOAuthMutation();

  const gitHubAuth = () => {
    //need change on local lang from state (header lang)
    window.location.assign(
      `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login`
    );
  };

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (codeResponse) => {
      loginWithGoogle({ code: codeResponse.code })
        .unwrap()
        .then((res) => {
          //need change on local lang from state (header lang)
          // I'll leave the then block for possible use when moving to a new translation library
        })
        .catch((err) => toast.error(err));
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
      {isLoading && <Loader />}
    </>
  );
};

export default ServiceAuth;
