export const usePlaceholder = (registerName: string) => {
  const passPlaceholder = String.fromCharCode(8727).repeat(10);

  switch (registerName) {
    case 'userName':
      return 'Epam11';

    case 'email':
      return 'Epam@epam.com';

    case 'password':
      return passPlaceholder;

    case 'passwordConfirm':
      return passPlaceholder;

    default:
      return 'plz create placeholder, bro';
  }
};
