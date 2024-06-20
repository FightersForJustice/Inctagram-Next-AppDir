module.exports = {
  rules: {
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'header-full-stop': [2, 'never', '.'],
    'subject-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // Фича
        'fix', // Исправление бага
        'refactor', // Рефакторинг кода
        'chore', // Изменение файлов, которые не являются частью проекта (Конфиги, библиотеки)
        'docs', // исправление документации
      ],
    ],
  },
};
