import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import s from './ManagementCheckbox.module.scss';
import clsx from 'clsx';

type Props = {
  autoRenewal: boolean;
  title: string;
  autoRenewalHandler: (checked: boolean) => void;
};

export const ManagementCheckbox: React.FC<Props> = ({ autoRenewal, title, autoRenewalHandler }) => (
  <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
    <Checkbox.Root className={s.CheckboxRoot} defaultChecked={autoRenewal} disabled={!autoRenewal} id="c1" onCheckedChange={(checked: boolean) => autoRenewalHandler(checked)}>
      <Checkbox.Indicator className={s.CheckboxIndicator}>
        <CheckIcon height={22} width={22}/>
      </Checkbox.Indicator>
    </Checkbox.Root>
    <label className={clsx(s.Label, !autoRenewal && s.LabelDisabled)} htmlFor="c1">
      {title}
    </label>
  </div>
);
