const { add } = require('./../demo');



test('sum', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });