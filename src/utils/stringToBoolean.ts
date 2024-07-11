export const stringToBoolean = (str: string) => {
    if (str.toLowerCase() === 'true') {
      return true;
    } else if (str.toLowerCase() === 'false') {
      return false;
    } else {
      throw new Error("Invalid input: the string must be 'true' or 'false'");
    }
  };