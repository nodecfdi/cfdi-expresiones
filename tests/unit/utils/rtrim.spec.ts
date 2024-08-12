import { encode } from 'entities';
import rtrim from '#src/utils/rtrim';

describe('rtrim', () => {
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
    const result = encode('today & tomorrow is a good day');
    expect(result).toBe(expected);
  });
});
