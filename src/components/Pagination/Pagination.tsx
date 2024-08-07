import Link from 'next/link';
import React, { ChangeEvent } from 'react';

export const Pagination = ({
  paymentsPerPage,
  totalPayments,
  paginate,
  setCurrentPage,
  currentPage,
  setPaymentsPerPage,
}: {
  paymentsPerPage: number;
  totalPayments: number;
  paginate: (pageNumber: number) => void;
  setCurrentPage: (value: number) => void;
  currentPage: number;
  setPaymentsPerPage: (value: number) => void;
}) => {
  const pageNumbers = [];
  // console.log(totalPayments, paymentsPerPage)
  for (let i = 1; i <= Math.ceil(totalPayments / paymentsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={'flex items-center mt-4'}>
      <div
        onClick={() =>
          setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      >
        <Link href={'#'}>{'<'}</Link>
      </div>
      <ul className={'flex items-center'}>
        {pageNumbers.map((number) => {
          if (number <= 5 && currentPage <= 5) {
            return (
              <li
                className={`mx-1.5 transition-all cursor-pointer px-2 ${
                  number === currentPage
                    ? 'bg-slate-100 text-black rounded-sm'
                    : ''
                }`}
                key={number}
                onClick={() => {
                  paginate(number);
                }}
              >
                <Link href={'#'}>{number}</Link>
              </li>
            );
          }
          if (
            currentPage !== 1 &&
            currentPage + 1 <= number + 2 &&
            number - 3 <= currentPage - 2 &&
            currentPage !== 5 &&
            totalPayments - 4 !== currentPage
          ) {
            return (
              <li
                className={`mx-1.5 transition-all cursor-pointer px-2 ${
                  number === currentPage
                    ? 'bg-slate-100 text-black rounded-sm'
                    : ''
                }`}
                key={number}
                onClick={() => {
                  paginate(number);
                }}
              >
                <Link href={'#'}>{number}</Link>
              </li>
            );
          }
        })}
      </ul>

      <div className={'flex items-center'}>
        <Link
          href={'#'}
          onClick={() =>
            setCurrentPage(
              currentPage < totalPayments / paymentsPerPage
                ? currentPage + 1
                : currentPage
            )
          }
        >
          {'>'}
        </Link>
        <div className={'ml-2'}>
          Show
          <select
            defaultValue={paymentsPerPage}
            className={'bg-black border-b-white mx-2'}
            name="paymentsOnOePage"
            id="paymentsOnOePage"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setCurrentPage(1);
              setPaymentsPerPage(+e.currentTarget.value);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="10">10</option>
          </select>
          on Page
        </div>
      </div>
    </div>
  );
};
