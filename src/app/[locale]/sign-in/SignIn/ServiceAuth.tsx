import { useGoogleLogin } from '@react-oauth/google';
import { useLoginWithGoogleOAuthMutation } from '@/api';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import GetService from './GetService';
import { FC } from 'react';

type Props = {
  page: 'SignInPage' | 'SignUpPage';
};
const ServiceAuth: FC<Props> = ({ page }) => {
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
    onSuccess: async (codeResponse) => {
      loginWithGoogle({ code: codeResponse.code })
        .unwrap()
        .then((res) => {
          //need change on local lang from state (header lang)
          toast.success(`Hello, ${res.email}!`);
        })
        .catch((err) => toast.error(err));
    },
    onError: (errorResponse) => toast.error(errorResponse.error),
  });
  return (
    <>
      <p className={'font-bold text-xl pt-[23px]'}>{t('title')}</p>
      <div className={'flex gap-[60px] justify-center mt-[13px]'}>
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
