import { headers } from "next/headers";

export const accessToken = () => headers().get('accessToken');