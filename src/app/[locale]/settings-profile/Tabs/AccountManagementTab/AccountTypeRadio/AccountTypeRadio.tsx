import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import './AccountTypeRadio.css';

type Props = {
  radioValue: string;
  setRadioValue: (value: string) => void;
};

export const AccountTypeRadio: React.FC<Props> = ({
  radioValue,
  setRadioValue,
}) => (
  <>
    <RadioGroup.Root
    className="RadioGroupRoot"
    defaultValue={radioValue}
    aria-label="View density"
    onValueChange={(value) => setRadioValue(value)}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <RadioGroup.Item className="RadioGroupItem" value="personal" id="r1">
        <RadioGroup.Indicator className="RadioGroupIndicator" />
      </RadioGroup.Item>
      <label className="Label" htmlFor="r1">
        Personal
      </label>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <RadioGroup.Item className="RadioGroupItem" value="business" id="r2">
        <RadioGroup.Indicator className="RadioGroupIndicator" />
      </RadioGroup.Item>
      <label className="Label" htmlFor="r2">
        Business
      </label>
    </div>
    </RadioGroup.Root>
  </>
);
