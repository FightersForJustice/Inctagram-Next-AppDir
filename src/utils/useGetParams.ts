import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const paramsMockObj = {
  sortDirection: 'string | undefined',
  pageNumber: 'string | undefined',
  pageSize: 'string | undefined',
  sortBy: 'string | undefined',
  searchTerm: 'string | undefined',
  statusFilter: 'string | undefined',
};

const correctParams = Object.keys(paramsMockObj);

export function useGetParams() {
  const url = useSearchParams();
  const paramsStart = '?';

  const [params, setParams] = useState([]);

  useEffect(() => {
    const currentParams = new URLSearchParams(url.toString());
    let paramsObj: any = [];
    correctParams.map((el, i) => {
      if (currentParams.get(el)) {
        paramsObj.push(
          `${(correctParams[i] + '=' + currentParams.get(el)) as string}`
        );
      }
    });
    setParams(paramsObj);
  }, [url]);

  return params.length ? paramsStart + params.join('&') : null;
}