import { fetchGetMyProfile } from '@/app/lib/data';
import {
  ResponseCountries,
  UserProfileResponse,
} from '@/app/lib/dataResponseTypes';
import { GeneralInformationTab } from '@/components/ProfileSettings/Tabs/GeneralInformationTab/GeneralInformationTab';
import { fetchCountriesList } from '@/app/lib/actions';
import { useQuery } from '@apollo/client';
import { GetUsers } from '@/api/gqlApi/login';
import { UsersListClient } from '@/components/admin/usersList/usersList';

export default async function UsersList() {
  //   const [userInfo, countriesList]: [
  //     userInfo: UserProfileResponse,
  //     countriesList: ResponseCountries,
  //   ] = await Promise.all([fetchGetMyProfile(), fetchCountriesList()]);

  return <UsersListClient/>;
}
