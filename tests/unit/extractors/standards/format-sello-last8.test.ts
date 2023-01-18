import { FormatSelloLast8 } from '~/extractors/standards/format-sello-last8';

describe('FormatSelloLast8', () => {
    test.each([
        ['12345678', '12345678'],
        ['xxx12345678', '12345678'],
        ['1234', '1234']
    ])('format sello takes only the last eight chars input: %s - expected: %s', (input: string, expected: string) => {
        const extractor = new FormatSelloLast8();

        expect(extractor.formatSello(input)).toBe(expected);
    });
});
