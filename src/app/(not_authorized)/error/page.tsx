'use client';
import Link from 'next/link';
import s from './style.module.scss';

const Error = () => {
  return (
    <div className={s.content}>
      <h3>Ошибка</h3>
      <Link className={s.button} href="/">
        Перейти на главную
      </Link>
    </div>
  );
};

export default Error;
