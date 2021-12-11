import { Comprobante32 } from '../../../src/extractors/comprobante32';
import { DomDocumentsTestCase } from '../dom-documents-test-case';
import { UnmatchedDocumentException } from '../../../src/exceptions/unmatched-document-exception';

describe('Extractors/Comprobante32', () => {
    let extractor: Comprobante32;
    let document: Document;

    beforeEach(() => {
        extractor = new Comprobante32();
        document = DomDocumentsTestCase.documentCfdi32();
    });

    test('unique name', () => {
        expect(extractor.uniqueName()).toBe('CFDI32');
    });

    test('matches cfdi32', () => {
        expect(extractor.matches(document)).toBeTruthy();
    });

    test('extract cfdi32', () => {
        const expectedExpression =
            '?re=CTO021007DZ8&rr=XAXX010101000&tt=0000004685.000000&id=80824F3B-323E-407B-8F8E-40D83FE2E69F';
        expect(extractor.extract(document)).toBe(expectedExpression);
    });

    test('not matches cfdi33', () => {
        document = DomDocumentsTestCase.documentCfdi33();
        expect(extractor.matches(document)).toBeFalsy();
    });

    test('extract not matches throw exception', () => {
        document = DomDocumentsTestCase.documentCfdi33();
        expect(() => extractor.extract(document)).toThrow(UnmatchedDocumentException);
        expect(() => extractor.extract(document)).toThrow('The document is not a CFDI 3.2');
    });

    /**
     * CFDI 3.2 total must be 6 decimals and 17 total length zero padding on left
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
    ])('how total must be formatted', (input, expectedFormat) => {
        expect(extractor.formatTotal(input)).toBe(expectedFormat);
    });
});
