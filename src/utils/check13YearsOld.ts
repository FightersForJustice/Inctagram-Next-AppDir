import { DateObject } from 'react-multi-date-picker';

export function check13YearsOld(
  date: DateObject | DateObject[] | null,
  setAgeError: (value: string) => void
) {
  if (date) {
    // @ts-ignore
    const birthDate = new Date(date.toDate().toString());
    const today = new Date();
    const ageYears = today.getFullYear() - birthDate.getFullYear();
    const ageMonths = today.getMonth() - birthDate.getMonth();
    const ageDays = today.getDate() - birthDate.getDate();

    // check age for 13 y.o.
    if (
      ageYears < 13 ||
      (ageYears === 13 && ageMonths < 0) ||
      (ageYears === 13 && ageMonths === 0 && ageDays < 0)
    ) {
      setAgeError('You must be over 13 years old');
    } else {
      setAgeError('');
    }
  }
}
