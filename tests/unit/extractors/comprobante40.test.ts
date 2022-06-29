import { DomDocumentsTestCase } from '../dom-documents-test-case';
import { Comprobante40 } from '~/extractors/comprobante40';
import { UnmatchedDocumentException } from '~/exceptions/unmatched-document-exception';

describe('Extractors/Comprobante40', () => {
    let extractor: Comprobante40;
    let document: Document;

    beforeEach(() => {
        extractor = new Comprobante40();
        document = DomDocumentsTestCase.documentCfdi40();
    });

    test('unique name', () => {
        expect(extractor.uniqueName()).toBe('CFDI40');
    });

    test('matches cfdi40', () => {
        expect(extractor.matches(document)).toBeTruthy();
    });

    test('extract cfdi40', () => {
        const expectedExpression = [
            'https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?',
            'id=04BF2854-FE7D-4377-9196-71248F060ABB&re=CSM190311AH6&rr=MCI7306249Y1&tt=459.36&fe=5tSZhA=='
        ].join('');

        expect(extractor.extract(document)).toBe(expectedExpression);
    });

    test.each([[DomDocumentsTestCase.documentCfdi33(), DomDocumentsTestCase.documentCfdi32()]])(
        'not matches cfdi',
        (document: Document) => {
            expect(extractor.matches(document)).toBeFalsy();
        }
    );

    test.each([[DomDocumentsTestCase.documentCfdi33(), DomDocumentsTestCase.documentCfdi32()]])(
        'extract not matches throw exception',
        (document: Document) => {
            expect(() => extractor.extract(document)).toThrow(UnmatchedDocumentException);
            expect(() => extractor.extract(document)).toThrow('The document is not a CFDI 4.0');
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
});
