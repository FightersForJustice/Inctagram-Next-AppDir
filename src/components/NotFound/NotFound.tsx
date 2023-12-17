import React from 'react';
import s from './NotFound.module.scss';
import img from './../../../public/img/404Page.svg';
import Image from 'next/image';

export const NotFound = ({ children }: Props) => {
  const [title, description] = React.Children.toArray(children);

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h1>{title}</h1>
      </div>
      <div className={s.description}>
        <p>{description}</p>
      </div>
      <div className={s.image}>
        <Image src={img} alt="404" />
      </div>
    </div>
  );
};

type Props = {
  children: React.ReactNode;
};
