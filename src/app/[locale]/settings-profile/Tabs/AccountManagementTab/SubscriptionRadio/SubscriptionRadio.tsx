import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

import "./SubscriptionRadio.css";

type Props = {
  subTypeValue: string;
  setSubTypeValue: (value: string) => void;
};

export const SubscriptionRadio: React.FC<Props> = ({ subTypeValue, setSubTypeValue }) => {
  return (
    <RadioGroup.Root
      className="RadioGroupRoot"
      defaultValue={subTypeValue}
      aria-label="View density"
      onValueChange={(value) => setSubTypeValue(value)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <RadioGroup.Item className="RadioGroupItem" value="10" id="r10">
          <RadioGroup.Indicator className="RadioGroupIndicator" />
        </RadioGroup.Item>
        <label className="Label" htmlFor="r10">
          $10 per 1 Day
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <RadioGroup.Item className="RadioGroupItem" value="50" id="r50">
          <RadioGroup.Indicator className="RadioGroupIndicator" />
        </RadioGroup.Item>
        <label className="Label" htmlFor="r50">
          $50 per 7 Day
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <RadioGroup.Item className="RadioGroupItem" value="100" id="r100">
          <RadioGroup.Indicator className="RadioGroupIndicator" />
        </RadioGroup.Item>
        <label className="Label" htmlFor="r100">
          $100 per month
        </label>
      </div>
    </RadioGroup.Root>
  );
};
