import Link from 'next/link';
import { FunctionComponent, createElement } from 'react';

import s from './Tabs.module.scss';

export const Tab = ({
  link,
  tabName,
  icon,
  className,
}: {
  link: string;
  tabName: string;
  icon?: FunctionComponent<any>;
  className: string;
}) => {
  return (
    <Link href={link} className={className}>
      <p className={s.tabName}>{tabName}</p>
      {icon && <div className={s.tabIcon}>{createElement(icon)}</div>}
    </Link>
  );
};
