export const translateError = (err: string, translate: any) =>
  ({
    'User with this userName is already exist': String(translate('nameExist')),
    'User with this email is already exist': String(translate('emailExist')),
  })[err];
