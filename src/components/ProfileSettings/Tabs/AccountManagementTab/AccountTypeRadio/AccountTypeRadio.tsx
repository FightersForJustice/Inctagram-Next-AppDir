import React, { useEffect, useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import './AccountTypeRadio.css';

type Props = {
  radioValue: string;
  radioName: string;
  radioName2: string;
  setRadioValue: (value: string) => void;
};

export const AccountTypeRadio: React.FC<Props> = ({
  radioValue,
  radioName,
  radioName2,
  setRadioValue,
}) => (
  <>
    <RadioGroup.Root
      className="RadioGroupRoot"
      defaultValue={radioValue}
      aria-label="View density"
      onValueChange={(value) => setRadioValue(value)}
      value={radioValue}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className="RadioGroupItem" value="personal" id="r1">
          <RadioGroup.Indicator className="RadioGroupIndicator" />
        </RadioGroup.Item>
        <label className="Label" htmlFor="r1">
          {radioName}
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className="RadioGroupItem" value="business" id="r2">
          <RadioGroup.Indicator className="RadioGroupIndicator" />
        </RadioGroup.Item>
        <label className="Label" htmlFor="r2">
        {radioName2}
        </label>
      </div>
    </RadioGroup.Root>
  </>
);
