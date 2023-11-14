import ReCAPTCHA from 'react-google-recaptcha';
import s from './Recaptcha.module.scss'
import { useRef } from 'react';

type ReCAPTCHAType = {
  setRecaptcha: (value: string) => void;
};

export const ReCAPTCHAComponent = ({ setRecaptcha }: ReCAPTCHAType) => {

// setTimeout(()=>{
//     const rootEl = document.getElementById("rc-anchor-container");
//     console.log(rootEl)
// },4000)
const paragraph = useRef(null);
// const styleNames = rootEl.classList
// console.log(rootEl)
// rootEl.add(s.container)
// rootEl.remove("rc-anchor-dark")
  const reCaptchaHandler = (token: string | null) => {
    setRecaptcha(token!);
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey="6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ"
        onChange={reCaptchaHandler}
        theme='dark'
        // className={s.container}
        // grecaptcha={(grecaptcha: any)=>console.log(grecaptcha)}
        // hl='ru'
        // className={'flex justify-center items-center border-solid border-1 border-[--dark-300] bg-[--dark-500]'}
        className={'flex justify-center items-center'}
        // theme='dark'
      />
    </div>
  );
};
