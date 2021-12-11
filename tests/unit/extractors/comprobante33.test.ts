import { DomDocumentsTestCase } from '../dom-documents-test-case';
import { Comprobante33 } from '../../../src/extractors/comprobante33';
import { UnmatchedDocumentException } from '../../../src/exceptions/unmatched-document-exception';

describe('Extractors/Comprobante33', () => {
    let extractor: Comprobante33;
    let document: Document;

    beforeEach(() => {
        extractor = new Comprobante33();
        document = DomDocumentsTestCase.documentCfdi33();
    });

    test('unique name', () => {
        expect(extractor.uniqueName()).toBe('CFDI33');
    });

    test('matches cfdi33', () => {
        expect(extractor.matches(document)).toBeTruthy();
    });

    test('extract cfdi33', () => {
        const expectedExpression = [
            'https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?',
            'id=CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC&re=POT9207213D6&rr=DIM8701081LA&tt=2010.01&fe=/OAgdg==',
        ].join('');

        expect(extractor.extract(document)).toBe(expectedExpression);
    });

    test('not matches cfdi32', () => {
        document = DomDocumentsTestCase.documentCfdi32();
        expect(extractor.matches(document)).toBeFalsy();
    });

    test('extract not matches throw exception', () => {
        document = DomDocumentsTestCase.documentCfdi32();
        expect(() => extractor.extract(document)).toThrow(UnmatchedDocumentException);
        expect(() => extractor.extract(document)).toThrow('The document is not a CFDI 3.3');
    });

    test.each([
        ['123.45', '123.45'],
        ['0.123456', '0.123456'],
        ['0.1234561', '0.123456'],
        ['0.1234565', '0.123457'],
        ['1000.00000', '1000.0'],
        ['0', '0.0'],
        ['0.00', '0.0'],
        ['', '0.0'],
    ])('how total must be formatted', (input, expectedFormat) => {
        expect(extractor.formatTotal(input)).toBe(expectedFormat);
    });
});
