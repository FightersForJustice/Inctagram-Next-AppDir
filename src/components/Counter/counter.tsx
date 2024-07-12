import React from 'react';

import s from './counter.module.scss';

const Counter = () => {
  return (
    <div className={s.counterContainer}>
      <div className={s.registerUsers}>
        Registered users:
      </div>
      <div className={s.displayContainer}>
        <button>0</button>
        <button>1</button>
        <button>4</button>
        <button>5</button>
        <button>5</button>
      </div>
    </div>
  );
};

export default Counter;