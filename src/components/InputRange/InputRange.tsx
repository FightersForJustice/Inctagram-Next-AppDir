import React, { ChangeEvent, useState } from 'react';
import './InputRange.scss';

type Props = {
  onZoomImage: (value: string) => void;
  zoomImage: string;
};

export const InputRange: React.FC<Props> = ({ onZoomImage, zoomImage }) => {
  const [value, setValue] = useState(zoomImage ? zoomImage : '0');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onZoomImage(e.currentTarget.value);
    setValue(e.currentTarget.value);
  };

  return (
    <div className="inputWrapper">
      <input
        type="range"
        min="10"
        max="100"
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};
