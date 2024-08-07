import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import './SubscriptionRadio.css';
import { SubscriptionsCostType } from '@/app/(authorized)/profile/settings-profile/types';
import { useTranslation } from 'react-i18next';

type Props = {
  subTypeValue: string;
  prefix: string;
  cost: SubscriptionsCostType;
  setSubTypeValue: (value: string) => void;
};

export const SubscriptionRadio = ({
  subTypeValue,
  setSubTypeValue,
  cost,
  prefix,
}: Props) => {
  const { data } = cost;

  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.AccountManagementTab.SubscribePeriod.${key}`);

  const actualPeriod = (amount: number) => {
    switch (amount) {
      case 0:
        return translate('Day');
      case 1:
        return translate('Week');
      case 2:
        return translate('Month');
    }
  };

  return (
    <RadioGroup.Root
      className="RadioGroupRoot"
      defaultValue={subTypeValue}
      aria-label="View density"
      onValueChange={(value) => setSubTypeValue(value)}
    >
      {data.map((el, i) => {
        const typeDescription = data[i].typeDescription;
        // const subscriptionName =
        //   typeDescription.slice(0, 1) + typeDescription.slice(1).toLowerCase();

        const subscriptionName = actualPeriod(i);
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <RadioGroup.Item
              className="RadioGroupItem"
              value={typeDescription}
              id={typeDescription}
            >
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <label className="Label" htmlFor={typeDescription}>
              ${data[i].amount} {prefix} {subscriptionName}
            </label>
          </div>
        );
      })}
    </RadioGroup.Root>
  );
};
