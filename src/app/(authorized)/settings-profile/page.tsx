'use client';

import Tabs from './Tabs/Tabs';
import { usePathname } from 'next-intl/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import s from './SettingsProfile.module.scss';

const paypalClientId =
  'Afk1iTJpReNKk1221BifT5DK-ylDl6BTi-YUqoa464lzaGoSGk0hTlfnOVbiTY2bT7bio52y5yIa07L3';

const SettingsProfile = () => {
  const pathname = usePathname();

  return (
    <PayPalScriptProvider options={{ clientId: paypalClientId }}>
      <div className={s.container}>
        <div className={s.wrapper}>
          <Tabs />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default SettingsProfile;
