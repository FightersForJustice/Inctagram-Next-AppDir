'use client';

import { useEffect, useState } from 'react';
import { TranslationSelect } from './HeaderTranslation/TranslationSelect';

export const HeaderClient = () => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setShowComponent(true);
  }, []);

  return <div>{showComponent && <TranslationSelect />}</div>;
};
