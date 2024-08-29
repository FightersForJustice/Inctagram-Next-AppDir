import { UserNavigation } from '../userNavigation/userNavigation';
import { AdminNavigation } from '../adminNavigation/adminNavigation';

type UserNavType = {
  id: number;
  pathname: string;
  el: {
    href: string;
    img: JSX.Element;
  };
  paidAccount: boolean;
  admin?: boolean;
  showCreatePostModal: boolean;
  t: (value: string) => string;
  createHandler: () => void;
};

export const Links = (prop: UserNavType) => {
  return prop.admin ? (
    <AdminNavigation prop={prop} />
  ) : (
    <UserNavigation prop={prop} />
  );
};
