'use client'

import React, { useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
import s from './GoTopButton.module.scss'
export const GoTopButton = () => {
  const [showBtn, setShowBtn] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setShowBtn(true)
    } else {
      setShowBtn(false)
    }
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
          onClick={() => {
            animateScroll.scrollToTop()
          }}
        >
          GOTOP
        </button>
      )}
    </>
  )
}

// const StyledGoTopBtn = styled.button`
//   background-color: rgba(0, 0, 0, 0.3);
//   padding: 8px;
//   position: fixed;
//   right: 30px;
//   bottom: 30px;
// `
