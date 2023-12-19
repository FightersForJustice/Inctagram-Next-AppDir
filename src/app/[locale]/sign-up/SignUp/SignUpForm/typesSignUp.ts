import { ReactNode } from 'react';
import {
  FieldError,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';

export type SignUpFormProps = {
  lang: 'en' | 'ru';
};

export type SubmitProps = {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type UserEmail = {
  email: string;
};

export type FormItemProps = {
  marginTop: string;
  marginBottom?: string;
  translate: (value: string) => ReactNode;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  registerName: string;
  translateName: string;
  id: string;
  show?: boolean;
  setShow?: (value: boolean) => void;
  showPasswordIcon?: boolean;
  isTouched?: boolean;
};

export type AgreeCheckboxProps = {
  translate: any;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  registerName: string;
  id: string;
};

export type EmailSentModalProps = {
  userEmail: string | undefined;
  setShowModal: (value: boolean) => void;
  translate: string;
};

export type InputErrorProps = {
  error: FieldError | undefined;
  errorMessage: string | undefined;
  id: string;
  className?: string;
};
