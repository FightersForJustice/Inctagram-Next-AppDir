import { ChangeEvent } from 'react';
import './InputRange.scss';

type Props = {
  onZoomImage: (value: string) => void;
  zoomImage: string;
};

export const InputRange = ({ onZoomImage, zoomImage }: Props) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onZoomImage(e.currentTarget.value);
  };

  return (
    <div className="inputWrapper">
      <input
        type="range"
        min="1"
        max="100"
        value={zoomImage}
        onChange={onChangeHandler}
      />
    </div>
  );
};
