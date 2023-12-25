'use client';

import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
    >
      <Provider store={store}>{children}</Provider>
    </GoogleOAuthProvider>
  );
}
export default Providers;
