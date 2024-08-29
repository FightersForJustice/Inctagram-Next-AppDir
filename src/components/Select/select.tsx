import * as RadixSelect from '@radix-ui/react-select';
import { clsx } from 'clsx';

import s from './select.module.scss';
import Image from 'next/image';
import img from './../../../public/img/arrow.svg';

export type SelectProps = {
  disabled?: boolean
  fullWidth?: boolean
  onValueChange: (value: string) => void
  isPagination?: boolean
  label?: string
  selectedValue: string
  options: { label: string, value: string }[]
}

export const Select = ((props: SelectProps) => {
  const {
    disabled,
    fullWidth,
    onValueChange,
    isPagination,
    label,
    selectedValue,
    options,
  } = props;

  console.log(selectedValue)

  return (
    <div className={s.container}>
      {label && label}
      <RadixSelect.Root
        defaultValue={'10'}
        onValueChange={selectedValue => onValueChange(selectedValue)}
        value={selectedValue}
      >
        <RadixSelect.Trigger
          className={clsx(s.trigger, isPagination && s.pagination, fullWidth && s.fullWidth)}
          disabled={disabled}
        >
          <RadixSelect.Value placeholder={selectedValue} />
          <div className={s.arrow}>
            <Image
              alt="arrow"
              src={img}
              width={16}
              height={16}
            />
          </div>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={s.content} position={'popper'} sideOffset={-1}>
            <RadixSelect.Viewport
              className={clsx(s.viewport, isPagination && s.pagination, fullWidth && s.fullWidth)}
            >
              {options.map((el, index) => (
                <RadixSelect.Item
                  className={clsx(s.item, isPagination && s.pagination)}
                  key={index}
                  value={el.label}
                >
                  <RadixSelect.ItemText>
                    {el.label}
                  </RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
});