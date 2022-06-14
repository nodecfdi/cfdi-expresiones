import { DomDocumentsTestCase } from '../dom-documents-test-case';
import { Comprobante40 } from '../../../src/extractors/comprobante40';
import { UnmatchedDocumentException } from '../../../src/exceptions/unmatched-document-exception';

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
            'id=3680B4AB-7D42-570A-9618-4A7D6701C44D&re=EKU9003173C9&rr=CUSC850516316&tt=1.16&fe=qsIe6w==',
        ].join('');

        expect(extractor.extract(document)).toBe(expectedExpression);
    });

    test('format cfdi40 on xml rfc with ampersand', () => {
        const expected33 = [
            'https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx',
            '?id=CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC',
            '&re=Ñ&amp;A010101AAA',
            '&rr=Ñ&amp;A991231AA0',
            '&tt=1234.5678',
            '&fe=23456789',
        ].join('');
        const parameters = {
            id: 'CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC',
            re: 'Ñ&A010101AAA',
            rr: 'Ñ&A991231AA0',
            tt: '1234.5678',
            fe: '0123456789'.slice(-8),
        };
        expect(extractor.format(parameters)).toBe(expected33);
    });

    test('not matches cfdi33', () => {
        document = DomDocumentsTestCase.documentCfdi33();
        expect(extractor.matches(document)).toBeFalsy();
    });

    test('extract not matches throw exception', () => {
        document = DomDocumentsTestCase.documentCfdi33();
        expect(() => extractor.extract(document)).toThrow(UnmatchedDocumentException);
        expect(() => extractor.extract(document)).toThrow('The document is not a CFDI 4.0');
    });
});
