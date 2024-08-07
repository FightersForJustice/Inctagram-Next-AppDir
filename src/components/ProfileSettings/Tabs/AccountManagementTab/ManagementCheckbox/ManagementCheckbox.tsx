import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import './ManagementCheckbox.css';

type Props = {
  autoRenewal: boolean;
  title: string;
};

export const ManagementCheckbox: React.FC<Props> = ({ autoRenewal, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
    <Checkbox.Root className="CheckboxRoot" defaultChecked={autoRenewal} id="c1">
      <Checkbox.Indicator className="CheckboxIndicator">
        <CheckIcon height={22} width={22} />
      </Checkbox.Indicator>
    </Checkbox.Root>
    <label className="Label" htmlFor="c1">
      {title}
    </label>
  </div>
);
