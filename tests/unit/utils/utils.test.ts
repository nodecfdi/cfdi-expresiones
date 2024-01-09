import { htmlEntities, rtrim, toFixed } from 'src/utils';

describe('utils', () => {
  test('to Fixed floating point with another decimal different of 5', () => {
    expect(toFixed(1e-8, 8)).toBe('0.00000001');
  });

  test('toFixed floating point number 5 upper half of an integer', () => {
    expect(toFixed(0.123_456_5, 6)).toBe('0.123457');
  });

  test('rtrim default charList', () => {
    const expected = '    Kevin van Zonneveld';
    const result = rtrim('    Kevin van Zonneveld    ');
    expect(result).toBe(expected);
  });

  test('rtrim with custom char', () => {
    const expected = '  0000000000.';
    const result = rtrim('  0000000000.000000', '0');
    expect(result).toBe(expected);
  });

  test('html_entities with ampersand', () => {
    const expected = 'today &amp; tomorrow is a good day';
    const result = htmlEntities('today & tomorrow is a good day');
    expect(result).toBe(expected);
  });
});
