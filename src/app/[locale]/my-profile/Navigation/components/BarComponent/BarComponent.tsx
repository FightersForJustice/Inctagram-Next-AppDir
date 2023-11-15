import React from 'react';

type BarType = {
  children: React.ReactNode;
};

const BarComponent = ({ children }: BarType) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      {children}
      <defs>
        <clipPath id="clip0_12478_5201">
          <rect width="24" height="24" fill="yellow" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BarComponent;
