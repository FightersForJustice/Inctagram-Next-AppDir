'use client'

import React, { useEffect, useState } from 'react';
import s from './GoTopButton.module.scss'

import Image from 'next/image';

export const GoTopButton = () => {
  const [showBtn, setShowBtn] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setShowBtn(true)
    } else {
      setShowBtn(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [])

  return (
    <>
      {showBtn && (
        <button className={s.button}
                onClick={scrollToTop}
        >
          <Image
            className={s.arrow}
            alt="arrow-top-image"
            src="/img/arrow-top.svg"
            width={40}
            height={40}
          />
        </button>
      )}
    </>
  )
}
