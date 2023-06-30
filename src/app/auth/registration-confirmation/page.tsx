"use client";

import Confirm from "./Confirm";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

const RegistrationConfirmation = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { code: string };
}) => {
  return (
    <Provider store={store}>
      <Confirm code={String(searchParams.code)} />
    </Provider>
  );
};

export default RegistrationConfirmation;
