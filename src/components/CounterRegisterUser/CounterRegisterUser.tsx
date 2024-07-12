'use client';
import React from 'react';
import s from '@/components/CounterRegisterUser/CounterRegisterUser.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  count: number
}

const CounterRegisterUser = ({ count }: Props) => {
  const { t } = useTranslation()
  const translate = (key: string): string => t(`CounterRegisterUser.${key}`)
  if (!count || count < 1) {
    return null
  }

  const arrayNumbers = Array.from('000' + count.toString(), Number)

  return (
    <div className={s.counterContainer}>
      <div className={s.registerUsers}>
        {translate('RegisterUsers')}:
      </div>
      <div className={s.displayContainer}>
        {arrayNumbers.map((item, index) => (
          <div className={`${s.number} ${index === arrayNumbers.length - 1 ? s.lastNumber : ''}`} key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterRegisterUser;
