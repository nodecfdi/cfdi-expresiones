import { FormatTotal18x6 } from 'src/extractors/standards/format-total18x6';

describe('FormatTotal18x6', () => {
    test.each([
        ['123.45', '123.45'],
        ['0.123456', '0.123456'],
        ['0.1234561', '0.123456'],
        ['0.1234565', '0.123457'],
        ['1000.00000', '1000.0'],
        ['0', '0.0'],
        ['0.00', '0.0'],
        ['', '0.0'],
    ])('how total must be formatted input: %s - expected format: %s', (input: string, expectedFormat: string) => {
        const extractor = new FormatTotal18x6();

        expect(extractor.formatTotal(input)).toBe(expectedFormat);
    });
});
