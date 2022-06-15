import { Retenciones20 } from '../../../src/extractors/retenciones20';
import { DomDocumentsTestCase } from '../dom-documents-test-case';
import { UnmatchedDocumentException } from '../../../src/exceptions/unmatched-document-exception';

describe('Extractors/Retenciones20', () => {
    let extractor: Retenciones20;
    let document: Document;

    beforeEach(() => {
        extractor = new Retenciones20();
        document = DomDocumentsTestCase.documentRet20Mexican();
    });

    test('unique name', () => {
        expect(extractor.uniqueName()).toBe('RET20');
    });

    test('matches retenciones20', () => {
        expect(extractor.matches(document)).toBeTruthy();
    });

    test('extract retenciones20 mexican', () => {
        document = DomDocumentsTestCase.documentRet20Mexican();
        const expectedExpression = [
            'https://prodretencionverificacion.clouda.sat.gob.mx/',
            '?id=4E3DD8EA-5220-8C42-85A8-E37F9D7502F8',
            '&re=AAA010101AAA&rr=SUL010720JN8&tt=4076.73&fe=qsIe6w==',
        ].join('');
        expect(extractor.extract(document)).toBe(expectedExpression);
    });

    test('format retenciones20 mexican on xml rfc with ampersand', () => {
        const expectedRetenciones10 = [
            'https://prodretencionverificacion.clouda.sat.gob.mx/',
            '?id=fc1b47b2-42f3-4ca2-8587-36e0a216c4d5',
            '&re=Ñ&amp;A010101AAA',
            '&rr=Ñ&amp;A991231AA0',
            '&tt=2000000.00',
            '&fe=qsIe6w==',
        ].join('');
        const parameters = {
            re: 'Ñ&A010101AAA',
            rr: 'Ñ&A991231AA0',
            tt: '2000000.00',
            id: 'fc1b47b2-42f3-4ca2-8587-36e0a216c4d5',
            fe: 'qsIe6w==',
        };
        expect(extractor.format(parameters)).toBe(expectedRetenciones10);
    });

    test('not matches retenciones10', () => {
        document = DomDocumentsTestCase.documentRet10Mexican();
        expect(extractor.matches(document)).toBeFalsy();
    });

    test('extract not matches throws exception', () => {
        document = DomDocumentsTestCase.documentRet10Mexican();
        expect(() => extractor.extract(document)).toThrow(UnmatchedDocumentException);
        expect(() => extractor.extract(document)).toThrow('The document is not a RET 2.0');
    });
});
