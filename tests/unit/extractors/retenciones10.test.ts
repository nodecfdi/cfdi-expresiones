import { Retenciones10 } from '../../../src/extractors/retenciones10';
import { DomDocumentsTestCase } from '../dom-documents-test-case';
import { UnmatchedDocumentException } from '../../../src/exceptions/unmatched-document-exception';
import { Xml } from '@nodecfdi/cfdiutils-common';
import { AttributeNotFoundException } from '../../../src/exceptions/attribute-not-found-exception';

describe('Extractors/Retenciones10', () => {
    let extractor: Retenciones10;
    let document: Document;

    beforeEach(() => {
        extractor = new Retenciones10();
        document = DomDocumentsTestCase.documentRet10Foreign();
    });

    test('unique name', () => {
        expect(extractor.uniqueName()).toBe('RET10');
    });

    test('matches retenciones10', () => {
        expect(extractor.matches(document)).toBeTruthy();
    });

    test('extract retenciones10 foreign', () => {
        const expectedExpression = [
            '?re=AAA010101AAA&nr=00000000001234567890&tt=0002000000.000000',
            '&id=fc1b47b2-42f3-4ca2-8587-36e0a216c4d5',
        ].join('');
        expect(extractor.extract(document)).toBe(expectedExpression);
    });

    test('extract retenciones10 mexican', () => {
        document = DomDocumentsTestCase.documentRet10Mexican();
        const expectedExpression = [
            '?re=AAA010101AAA&rr=SUL010720JN8&tt=0002000000.000000',
            '&id=fc1b47b2-42f3-4ca2-8587-36e0a216c4d5',
        ].join('');
        expect(extractor.extract(document)).toBe(expectedExpression);
    });

    test('format retenciones10 mexican on xml rfc with ampersand', () => {
        const expectedRetenciones10 = [
            '?re=Ñ&amp;A010101AAA',
            '&rr=Ñ&amp;A991231AA0',
            '&tt=0002000000.000000',
            '&id=fc1b47b2-42f3-4ca2-8587-36e0a216c4d5',
        ].join('');
        const parameters = {
            re: 'Ñ&A010101AAA',
            rr: 'Ñ&A991231AA0',
            tt: '2000000.00',
            id: 'fc1b47b2-42f3-4ca2-8587-36e0a216c4d5',
        };
        expect(extractor.format(parameters)).toBe(expectedRetenciones10);
    });

    test('not matches cfdi33', () => {
        document = DomDocumentsTestCase.documentCfdi33();
        expect(extractor.matches(document)).toBeFalsy();
    });

    test('extract not matches throws exception', () => {
        document = DomDocumentsTestCase.documentCfdi33();
        expect(() => extractor.extract(document)).toThrow(UnmatchedDocumentException);
        expect(() => extractor.extract(document)).toThrow('The document is not a RET 1.0');
    });

    test('extract without receptor throws exception', () => {
        document = Xml.newDocumentContent(DomDocumentsTestCase.fileContentPath('ret10-without-receptor-tax-id.xml'));
        expect(() => extractor.extract(document)).toThrow(AttributeNotFoundException);
        expect(() => extractor.extract(document)).toThrow('RET 1.0 receiver tax id cannot be found');
    });

    /**
     * RET 1.0 total must be 6 decimals and 17 total length zero padding on left
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
