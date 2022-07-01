import { Xml, install } from '@nodecfdi/cfdiutils-common';
import { XMLSerializer, DOMImplementation, DOMParser } from '@xmldom/xmldom';
import { Comprobante40, Comprobante32, Comprobante33, Retenciones10, Retenciones20, DiscoverExtractor } from '~/index';
import { UnmatchedDocumentException } from '~/exceptions/unmatched-document-exception';
import { DomDocumentsTestCase } from './dom-documents-test-case';

describe('DiscoverExtractor', () => {
    let extractor: DiscoverExtractor;
    const providerExpressionOnValidDocuments: [Document, string][] = [
        [DomDocumentsTestCase.documentCfdi40(), 'CFDI40'],
        [DomDocumentsTestCase.documentCfdi33(), 'CFDI33'],
        [DomDocumentsTestCase.documentCfdi32(), 'CFDI32'],
        [DomDocumentsTestCase.documentRet10Mexican(), 'RET10'],
        [DomDocumentsTestCase.documentRet10Foreign(), 'RET10'],
        [DomDocumentsTestCase.documentRet20Mexican(), 'RET20']
    ];

    beforeEach(() => {
        install(new DOMParser(), new XMLSerializer(), new DOMImplementation());
        extractor = new DiscoverExtractor();
    });

    test('unique name', () => {
        expect(extractor.uniqueName()).toBe('discover');
    });

    test('generic extractor uses default', () => {
        extractor = new DiscoverExtractor();
        const currentExpressionExtractors = extractor.currentExpressionExtractors();
        expect(currentExpressionExtractors).toHaveLength(5);
        expect(currentExpressionExtractors).toStrictEqual([
            new Comprobante40(),
            new Comprobante33(),
            new Comprobante32(),
            new Retenciones20(),
            new Retenciones10()
        ]);
    });

    test('generic extractor use specific extractors', () => {
        extractor = new DiscoverExtractor(new Comprobante40(), new Comprobante33(), new Comprobante32());
        const currentExpressionExtractors = extractor.currentExpressionExtractors();
        expect(currentExpressionExtractors).toHaveLength(3);
        expect(currentExpressionExtractors).toStrictEqual([
            new Comprobante40(),
            new Comprobante33(),
            new Comprobante32()
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

    test.each(providerExpressionOnValidDocuments)('expression on valid documents', (document) => {
        expect(extractor.matches(document)).toBeTruthy();
        expect(extractor.extract(document)).not.toBe('');
    });

    test.each(providerExpressionOnValidDocuments)(
        'extract produces the same results as obtain and format',
        (document, type) => {
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
