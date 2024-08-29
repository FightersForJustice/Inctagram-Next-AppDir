'use client';

import { useEffect, useState } from 'react';
import { Pagination } from '@/components/newPagination/pagination';

import { PaymentsType } from '@/app/(authorized)/profile/settings-profile/types';
import { useTranslation } from 'react-i18next';
import { PaymentsTable } from '@/components/ProfileSettings/Tabs/MyPaymentsTab/PaymentsTable/PaymentsTable';
import {
  PaymentsTableMobile
} from '@/components/ProfileSettings/Tabs/MyPaymentsTab/PaymentsTableMobile/PaymentsTableMobile';

export const MyPaymentsTab = ({ data }: { data: Array<PaymentsType> }) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.MyPaymentsTab.${key}`);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(5);
  const [width, setWidth] = useState(1920);
  const lastPaymentIndex = currentPage * paymentsPerPage;
  const firstPaymentIndex = lastPaymentIndex - paymentsPerPage;
  const currentData = data.slice(firstPaymentIndex, lastPaymentIndex);

  const tableHeaderData = [
    translate('DateOfPayment'),
    translate('EndOfPayment'),
    translate('Price'),
    translate('Period'),
    translate('Type')
  ]

  const options = [
    { label: '3', value: '3' },
    { label: '5', value: '5' },
    { label: '7', value: '7' },
  ];

  if (currentData.length === 0) {
    setCurrentPage(1);
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {width <= 521 ?
        <PaymentsTableMobile currentData={currentData} tableHeaderData={tableHeaderData}/>
        :
        <PaymentsTable currentData={currentData} tableHeaderData={tableHeaderData}/>}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paymentsPerPage={paymentsPerPage}
        setPaymentsPerPage={setPaymentsPerPage}
        totalCount={data.length}
        options={options}
      />
    </>
  );
};
