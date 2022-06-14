import {
    Comprobante40,
    Comprobante32,
    Comprobante33,
    Retenciones10,
    Retenciones20,
    DiscoverExtractor,
} from '../../src';
import { Xml } from '@nodecfdi/cfdiutils-common';
import { UnmatchedDocumentException } from '../../src/exceptions/unmatched-document-exception';
import { DomDocumentsTestCase } from './dom-documents-test-case';

describe('DiscoverExtractor', () => {
    let extractor: DiscoverExtractor;
    const providerExpressionOnValidDocuments: [string, Document, string][] = [
        ['cfdi40', DomDocumentsTestCase.documentCfdi40(), 'CFDI40'],
        ['cfdi33', DomDocumentsTestCase.documentCfdi33(), 'CFDI33'],
        ['cfdi32', DomDocumentsTestCase.documentCfdi32(), 'CFDI32'],
        ['ret10mexican', DomDocumentsTestCase.documentRet10Mexican(), 'RET10'],
        ['ret10foreign', DomDocumentsTestCase.documentRet10Foreign(), 'RET10'],
        ['ret20mexican', DomDocumentsTestCase.documentRet20Mexican(), 'RET20'],
    ];

    beforeEach(() => {
        extractor = new DiscoverExtractor();
    });

    test('unique name', () => {
        expect(extractor.uniqueName()).toBe('discover');
    });

    test('generic extractor uses default', () => {
        const currentExpressionExtractors = extractor.currentExpressionExtractors();
        expect(currentExpressionExtractors).toHaveLength(5);
        expect(currentExpressionExtractors).toStrictEqual([
            new Comprobante40(),
            new Comprobante33(),
            new Comprobante32(),
            new Retenciones20(),
            new Retenciones10(),
        ]);
    });

    test('dont match using empty document', () => {
        const document = Xml.newDocument();
        expect(extractor.matches(document)).toBeFalsy();
    });

    test('throw exception on unmatched document', () => {
        const document = Xml.newDocument();
        expect(() => extractor.extract(document)).toThrow(UnmatchedDocumentException);
        expect(() => extractor.extract(document)).toThrow(
            'Cannot discover any DiscoverExtractor that matches with document'
        );
    });

    test.each([...providerExpressionOnValidDocuments])('expression on valid documents %s', (value, document) => {
        expect(extractor.matches(document)).toBeTruthy();
        expect(extractor.extract(document)).not.toBe('');
    });

    test.each([...providerExpressionOnValidDocuments])(
        'extract produces the same results as obtain and format on %s',
        (value, document, type) => {
            const values = extractor.obtain(document);
            const expression = extractor.format(values, type);
            const expectedExpression = extractor.extract(document);
            expect(expression).toBe(expectedExpression);
        }
    );

    test('format using no type', () => {
        expect(() => extractor.format({})).toThrow(UnmatchedDocumentException);
        expect(() => extractor.format({})).toThrow('DiscoverExtractor requires type key with an extractor identifier');
    });

    test('format using cfdi33', () => {
        expect(extractor.format({}, 'CFDI33')).not.toBe('');
    });
});
