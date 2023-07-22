import { formatServerDate } from "./formatServerDate";

export const actualCreateDate = (createdAt?: string, updatedAt?: string) => {
  if (createdAt) {
    if (updatedAt !== createdAt) {
      return `update ${formatServerDate(updatedAt)}`;
    } else {
      return `create ${formatServerDate(createdAt ?? "")}`;
    }
  }
};
