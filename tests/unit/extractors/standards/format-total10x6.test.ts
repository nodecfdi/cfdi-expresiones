import { FormatTotal10x6 } from 'src/extractors/standards/format-total10x6';

describe('FormatTotal10x6', () => {
  /**
   * Total must be 6 decimals and 17 total length zero padding on left
   */
  test.each([
    ['123.45', '0000000123.450000'],
    ['0.123456', '0000000000.123456'],
    ['0.1234561', '0000000000.123456'],
    ['0.1234565', '0000000000.123457'],
    ['1000.00000', '0000001000.000000'],
    ['0', '0000000000.000000'],
    ['0.00', '0000000000.000000'],
    ['', '0000000000.000000'],
  ])('how total must be formatted input: %s - expected format: %s', (input: string, expectedFormat: string) => {
    const extractor = new FormatTotal10x6();

    expect(extractor.formatTotal(input)).toBe(expectedFormat);
  });
});
