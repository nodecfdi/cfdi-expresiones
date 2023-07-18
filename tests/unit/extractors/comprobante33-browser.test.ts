/**
 * \@vitest-environment jsdom
 */

import { useDomDocuments } from '../dom-documents-test-case';
import { Comprobante33 } from 'src/extractors/comprobante33';
import { UnmatchedDocumentException } from 'src/exceptions/unmatched-document-exception';

describe('Extractors/Comprobante33_Browser', () => {
    let extractor: Comprobante33;
    let _document: Document;
    const { documentCfdi32, documentCfdi33, documentCfdi40 } = useDomDocuments(
        new DOMParser(),
        new XMLSerializer(),
        document.implementation,
    );

    beforeEach(() => {
        extractor = new Comprobante33();
        _document = documentCfdi33();
    });

    test('unique name', () => {
        expect(extractor.uniqueName()).toBe('CFDI33');
    });

    test('matches cfdi33', () => {
        expect(extractor.matches(_document)).toBeTruthy();
    });

    test('extract cfdi33', () => {
        const expectedExpression = [
            'https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?',
            'id=CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC&re=POT9207213D6&rr=DIM8701081LA&tt=2010.01&fe=/OAgdg==',
        ].join('');

        expect(extractor.extract(_document)).toBe(expectedExpression);
    });

    test.each([
        ['cfdi40', documentCfdi40()],
        ['cfdi32', documentCfdi32()],
    ])('not matches cfdi with %s', (_name: string, _document: Document) => {
        expect(extractor.matches(_document)).toBeFalsy();
    });

    test.each([
        ['cfdi40', documentCfdi40()],
        ['cfdi32', documentCfdi32()],
    ])('extract not matches throw exception with %', (_name: string, _document: Document) => {
        expect(() => extractor.extract(_document)).toThrow(UnmatchedDocumentException);
        expect(() => extractor.extract(_document)).toThrow('The document is not a CFDI 3.3');
    });

    test('format uses formatting', () => {
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
            fe: 'xxx23456789',
        };
        expect(extractor.format(parameters)).toBe(expected33);
    });

    test('format with empty', () => {
        expect(extractor.format({})).not.toBe('');
    });
});
