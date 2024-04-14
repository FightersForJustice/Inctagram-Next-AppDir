'use client';
import { useRouter } from 'next/navigation';
import s from './style.module.scss';

const Error = () => {
  const router = useRouter();
  function handleHome() {
    router.push('/');
  }

  return (
    <div className={s.content}>
      <h3>Ошибка</h3>
      <button className={s.button} onClick={handleHome}>
        Перейти на главную
      </button>
    </div>
  );
};

export default Error;
