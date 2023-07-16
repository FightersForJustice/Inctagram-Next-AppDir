import React, { useState } from "react";
import "./InputRange.scss";

export const InputRange = () => {
  const [value, setValue] = useState("0");

  return (
    <div className="inputWrapper">
      <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    </div>
  );
};
