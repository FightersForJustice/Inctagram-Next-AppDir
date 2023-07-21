import { formatServerDate } from "./formatServerDate";

export const actualCreateDate = (createdAt: string, updatedAt: string) => {
  if (updatedAt) {
    return `обнавленно ${formatServerDate(updatedAt)}`;
  } else {
    return `созданно ${formatServerDate(createdAt)}`;
  }
};
