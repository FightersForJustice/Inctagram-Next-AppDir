import React from 'react';

import s from './pagination.module.scss';
import { usePagination } from '@/components/newPagination/hook/usePagination';
import { SelectPagination } from '@/components/newPagination/selectPagination/selectPagination';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
  paymentsPerPage: number
  setPaymentsPerPage: (newPageSize: number) => void
  siblingCount?: number
  totalCount: number
  options: Array<{ label: string, value: string }>
}

export const Pagination = ((props: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`PaginationSelect.${key}`);

  const { currentPage, setCurrentPage, paymentsPerPage, setPaymentsPerPage, siblingCount, totalCount, options } = props;

  const paginationRange = usePagination({
    currentPage,
    paymentsPerPage,
    siblingCount,
    totalCount,
  });

  if (!paginationRange || currentPage === 0 || paginationRange.length < 1) {
    return null;
  }

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.paginationContainer}>
        <button className={s.button} disabled={currentPage === 1} onClick={onPrevious}>
          {'❮'}
        </button>
        {paginationRange.map((pageNumber, index) => {
          if (typeof pageNumber !== 'number') {
            return (
              <span className={s.dots} key={index}>
                ...
              </span>
            );
          }
          const buttonClass = (pageNumber: number) => {
            return pageNumber === currentPage ? s.active : '';
          };

          return (
            <button
              className={`${s.button} ${buttonClass(pageNumber)}`}
              key={index}
              onClick={() => setCurrentPage(pageNumber)}
            >
              <span>{pageNumber}</span>
            </button>
          );
        })}
        <button
          className={s.button}
          disabled={currentPage === paginationRange[paginationRange.length - 1]}
          onClick={onNext}
        >
          {'❯'}
        </button>
      </div>
      <div className={s.select}>
        {translate('show')}
        <SelectPagination pageSize={paymentsPerPage} pageSizeChange={setPaymentsPerPage} options={options}/>
        {translate('onThePage')}
      </div>
    </div>
  );
});

