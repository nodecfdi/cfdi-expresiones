import toFixed from '../../../src/utils/to_fixed.js';

describe('toFixed', () => {
  test('floating point with another decimal different of 5', () => {
    expect(toFixed(1e-8, 8)).toBe('0.00000001');
  });

  test('floating point number 5 upper half of an integer', () => {
    expect(toFixed(0.1234565, 6)).toBe('0.123457');
  });

  test('other numbers with fraction such as .005', () => {
    expect(toFixed(1.015, 2)).toBe('1.02');
    expect(toFixed(4.015, 2)).toBe('4.02');
    expect(toFixed(5.015, 2)).toBe('5.02');
    expect(toFixed(6.015, 2)).toBe('6.02');
    expect(toFixed(7.015, 2)).toBe('7.02');
    expect(toFixed(128.015, 2)).toBe('128.02');
    expect(toFixed(0.005, 2)).toBe('0.01');
  });
});
