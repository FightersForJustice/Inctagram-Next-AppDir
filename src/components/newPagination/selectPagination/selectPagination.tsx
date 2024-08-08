import { Select } from '@/components/Select';


type Props = {
  pageSize: number
  pageSizeChange: (newPageSize: number) => void
}
export const SelectPagination = ({ pageSize, pageSizeChange }: Props) => {

  const onValueChange = (value: string) => {
    pageSizeChange(+value);
  };

  const options = [
    { label: '3', value: '3' },
    { label: '5', value: '5' },
    { label: '7', value: '7' },
  ];

  return (
    <Select
      onValueChange={onValueChange}
      isPagination
      selectedValue={pageSize.toString()}
      options={options}
    />
  );
};
