import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type ParamsType = {
  key: string;
  value: string;
  direction: string;
  directionValue: string;
  baseUrl: string;
  set: boolean;
};

export function useSetParams({ key, value, set, baseUrl, direction, directionValue }: ParamsType) {
  const nextRouter = useRouter();
  const url = useSearchParams()!;
  const params = new URLSearchParams(url.toString());
  useEffect(() => {
    if (set) {
      params.set(key, value);
      params.set(direction, directionValue);
      return nextRouter.push(`${baseUrl}?${params.toString()}`);
    }
    params.delete(key);
    params.delete(direction);
    nextRouter.push( `${baseUrl}?${params.toString()}`);
  }, [set, value, directionValue]);
}