import { SignIn } from './SignIn';
import ServiceAuth from './SignIn/ServiceAuth';

import s from './SignIn.module.scss';

const SignInPage = () => {
  return (
    <div id={'sign-in'} className={s.container}>
      <ServiceAuth page={'SignInPage'} />
      <SignIn />
    </div>
  );
};

export default SignInPage;
