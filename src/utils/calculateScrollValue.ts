export const calculateScrollValue = (pagesCount: number): number => {
  if (pagesCount === 1) {
    return 0;
  } else if (pagesCount >= 2 && pagesCount <= 10) {
    return (pagesCount - 2) * 12 + 12; // Исправлено здесь
  } else {
    throw new Error('Invalid pagesCount value. Supported range: 1 to 10.');
  }
};
