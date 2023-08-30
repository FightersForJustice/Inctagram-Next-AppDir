import { baseUrl } from "@/helpers/config";

export const GetDefaultValuesForm = async () => {
  let data;
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    const response = await fetch(`${baseUrl}users/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    data = await response.json();
  }

  return {
    userName: data?.userName!,
    firstName: data?.firstName!,
    lastName: data?.lastName!,
    city: data?.city!,
    aboutMe: data?.aboutMe!,
  };
};
