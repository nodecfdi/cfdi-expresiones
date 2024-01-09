import { FormatForeignTaxId20 } from 'src/extractors/standards/format-foreign-tax-id20';

describe('FormatForeignTaxId20', () => {
  test.each([
    ['X', '0000000000000000000X'],
    ['12345678901234567890', '12345678901234567890'],
    ['12345678901234567890_1234', '12345678901234567890'],
    ['ÑÑÑ', '00000000000000000ÑÑÑ'],
    ['ÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑ', 'ÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑ'],
    ['A&Z', '0000000000000A&amp;Z'],
  ])('format foreign tax id input: %s - expected %s', (input: string, expected: string) => {
    const extractor = new FormatForeignTaxId20();

    expect(extractor.formatForeignTaxId(input)).toBe(expected);
  });
});
