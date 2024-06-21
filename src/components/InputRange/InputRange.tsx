import { ChangeEvent } from 'react';
import './InputRange.scss';

type Props = {
  onValueChange: (value: number) => void;
  value: number;
};

export const InputRange = ({ onValueChange, value }: Props) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(+e.currentTarget.value);
  };

  return (
    <div className="inputWrapper">
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};
