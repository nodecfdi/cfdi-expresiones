import { AttributeNotFoundException } from '~/exceptions/attribute-not-found-exception';
import { UnmatchedDocumentException } from '~/exceptions/unmatched-document-exception';
import { Retenciones10 } from '~/extractors/retenciones10';
import { DomDocumentsTestCase } from '../dom-documents-test-case';

describe('Extractors/Retenciones10', () => {
    let extractor: Retenciones10;
    let document: Document;
    const providerCfdiDifferentVersions = [
        [DomDocumentsTestCase.documentRet20Mexican()],
        [DomDocumentsTestCase.documentRet20Foreign()]
    ];

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
            '&id=fc1b47b2-42f3-4ca2-8587-36e0a216c4d5'
        ].join('');
        expect(extractor.extract(document)).toBe(expectedExpression);
    });

    test('extract retenciones10 mexican', () => {
        document = DomDocumentsTestCase.documentRet10Mexican();
        const expectedExpression = [
            '?re=AAA010101AAA&rr=SUL010720JN8&tt=0002000000.000000',
            '&id=fc1b47b2-42f3-4ca2-8587-36e0a216c4d5'
        ].join('');
        expect(extractor.extract(document)).toBe(expectedExpression);
    });

    test.each(providerCfdiDifferentVersions)('not matches cfdi', (document: Document) => {
        expect(extractor.matches(document)).toBeFalsy();
    });

    test.each(providerCfdiDifferentVersions)('extract not matches throw exception', (document: Document) => {
        expect(() => extractor.extract(document)).toThrow(UnmatchedDocumentException);
        expect(() => extractor.extract(document)).toThrow('The document is not a RET 1.0');
    });

    test('extract without receptor throws exception', () => {
        document = DomDocumentsTestCase.documentLoad('ret10-without-receptor-tax-id.xml');

        expect(() => extractor.extract(document)).toThrow(AttributeNotFoundException);
        expect(() => extractor.extract(document)).toThrow('RET 1.0 receiver tax id cannot be found');
    });

    test('format mexican', () => {
        const expectedRetenciones10 = [
            '?re=Ñ&amp;A010101AAA',
            '&rr=Ñ&amp;A991231AA0',
            '&tt=0002000000.000000',
            '&id=fc1b47b2-42f3-4ca2-8587-36e0a216c4d5'
        ].join('');
        const parameters = {
            re: 'Ñ&A010101AAA',
            rr: 'Ñ&A991231AA0',
            tt: '2000000.00',
            id: 'fc1b47b2-42f3-4ca2-8587-36e0a216c4d5'
        };
        expect(extractor.format(parameters)).toBe(expectedRetenciones10);
    });

    test('format foreign', () => {
        const expectedRetenciones10 = [
            '?re=ÑA&amp;010101AA1',
            '&nr=0000000000000000000X',
            '&tt=0000012345.670000',
            '&id=AAAAAAAA-BBBB-CCCC-DDDD-000000000000'
        ].join('');
        const parameters = {
            re: 'ÑA&010101AA1',
            nr: 'X',
            id: 'AAAAAAAA-BBBB-CCCC-DDDD-000000000000',
            tt: '12345.67'
        };
        expect(extractor.format(parameters)).toBe(expectedRetenciones10);
    });

    test.each([
        ['X', '0000000000000000000X'],
        ['12345678901234567890', '12345678901234567890'],
        ['12345678901234567890_1234', '12345678901234567890'],
        ['ÑÑÑ', '00000000000000000ÑÑÑ'],
        ['A&Z', '0000000000000A&amp;Z']
    ])('format foreign tax id', (input: string, expected: string) => {
        expect(extractor.formatForeignTaxId(input)).toBe(expected);
    });
});
