export const applyImageFilter = (
  imageElement: HTMLImageElement,
  filter: string,
  aspectRatio: string,
  zoomValue: string
): string => {
  // Получение элемента <canvas>
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

  const aspectRatioArray = aspectRatio.split(':');
  const aspectRatioValue = +aspectRatioArray[0] / +aspectRatioArray[1];

  // Вычисляем размеры холста на основе аспектного соотношения (aspectRatio)
  const canvasWidth = imageElement.width;
  const canvasHeight = aspectRatio
    ? imageElement.width / aspectRatioValue
    : imageElement.height;

  // Устанавливаем размер холста с учетом аспектного соотношения
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Применяем стили или фильтры на холсте
  ctx.filter = filter;
  ctx.drawImage(imageElement, 0, 0, canvasWidth, canvasHeight);

  // Применяем дополнительные стили трансформации (transform) на холсте
  const scaleFactor = +zoomValue / 10;

  ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);

  // Получаем измененное изображение в формате Data URL
  const modifiedImageData: string = canvas.toDataURL('image/jpeg');

  return modifiedImageData;
};
