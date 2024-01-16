export type UserProfileResponse = {
  id: number;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  city: string | null;
  dateOfBirth: string | null;
  aboutMe: string | null;
  createdAt: string;
  avatars: Avatars[] | [];
};

type Avatars = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
};

export type ResponseCountries = {
  error: boolean;
  msg: string;
  data: ResponseCountriesItem[];
};

export type ResponseCountriesItem = {
  iso2: string;
  iso3: string;
  country: string;
  cities: string[];
};
