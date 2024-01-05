

import Tabs from './Tabs/Tabs';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import s from './SettingsProfile.module.scss';

const SettingsProfile = () => {
  return (
    // <PayPalScriptProvider options={{ clientId: paypalClientId }}>
    <div className={s.container}>
      <div className={s.wrapper}>
        <Tabs />
      </div>
    </div>
    // </PayPalScriptProvider>
  );
};

export default SettingsProfile;
