import { DomDocumentsTestCase } from '../dom-documents-test-case';
import { Comprobante33 } from '~/extractors/comprobante33';
import { UnmatchedDocumentException } from '~/exceptions/unmatched-document-exception';

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
            'id=CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC&re=POT9207213D6&rr=DIM8701081LA&tt=2010.01&fe=/OAgdg=='
        ].join('');

        expect(extractor.extract(document)).toBe(expectedExpression);
    });

    test.each([[DomDocumentsTestCase.documentCfdi40(), DomDocumentsTestCase.documentCfdi32()]])(
        'not matches cfdi',
        (document: Document) => {
            expect(extractor.matches(document)).toBeFalsy();
        }
    );

    test.each([[DomDocumentsTestCase.documentCfdi40(), DomDocumentsTestCase.documentCfdi32()]])(
        'extract not matches throw exception',
        (document: Document) => {
            expect(() => extractor.extract(document)).toThrow(UnmatchedDocumentException);
            expect(() => extractor.extract(document)).toThrow('The document is not a CFDI 3.3');
        }
    );

    test('format uses formatting', () => {
        const expected33 = [
            'https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx',
            '?id=CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC',
            '&re=Ñ&amp;A010101AAA',
            '&rr=Ñ&amp;A991231AA0',
            '&tt=1234.5678',
            '&fe=23456789'
        ].join('');
        const parameters = {
            id: 'CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC',
            re: 'Ñ&A010101AAA',
            rr: 'Ñ&A991231AA0',
            tt: '1234.5678',
            fe: 'xxx23456789'
        };
        expect(extractor.format(parameters)).toBe(expected33);
    });

    test('format with empty', () => {
        expect(extractor.format({})).not.toBe('');
    });
});
