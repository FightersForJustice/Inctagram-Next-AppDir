export const applyImageFilter = (
  imageElement: HTMLImageElement,
  filter: string,
  aspectRatio: string,
  zoomValue: string,
): string => {
  // Получение элемента <canvas>
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

  const aspectRatioValue = aspectRatio.split(":");

  // Вычисляем размеры холста на основе аспектного соотношения (aspectRatio)
  const canvasWidth = imageElement.width;
  const canvasHeight = imageElement.width / (+aspectRatioValue[0] / +aspectRatioValue[1]);

  console.log(aspectRatioValue);

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
  const modifiedImageData: string = canvas.toDataURL("image/jpeg");

  return modifiedImageData;
};

// Вспомогательная функция для разбора значения трансформации
const parseTransform = (transform: string): number[] => {
  // Ваша логика разбора значения трансформации
  // Здесь предполагается, что функция вернет массив чисел, которые будут переданы в метод ctx.transform()

  // Например, для строки "1.2, 0.3, -0.3, 1.2, 10, 20" вернется [1.2, 0.3, -0.3, 1.2, 10, 20]
  const values = transform.split(",").map(parseFloat);
  return values;
};
