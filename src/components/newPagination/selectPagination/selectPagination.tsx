import { Select } from '@/components/Select';


type Props = {
  pageSize: number
  pageSizeChange: (newPageSize: number) => void
  options: Array<{ label: string, value: string }>
}
export const SelectPagination = ({ pageSize, pageSizeChange, options }: Props) => {

  const onValueChange = (value: string) => {
    pageSizeChange(+value);
  };



  return (
    <Select
      onValueChange={onValueChange}
      isPagination
      selectedValue={pageSize.toString()}
      options={options}
    />
  );
};
