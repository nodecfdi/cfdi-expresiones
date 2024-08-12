import { newDocument } from '@nodecfdi/cfdi-core';
import DiscoverExtractor from '#src/discover_extractor';
import { UnmatchedDocumentError } from '#src/errors';
import Comprobante32 from '#src/extractors/comprobante32';
import Comprobante33 from '#src/extractors/comprobante33';
import Comprobante40 from '#src/extractors/comprobante40';
import Retenciones10 from '#src/extractors/retenciones10';
import Retenciones20 from '#src/extractors/retenciones20';
import {
  documentCfdi32,
  documentCfdi33,
  documentCfdi40,
  documentRet10Foreign,
  documentRet10Mexican,
  documentRet20Foreign,
  documentRet20Mexican,
} from './dom_documents_utils.js';

describe('discover extractor', () => {
  let extractor: DiscoverExtractor;

  const providerExpressionOnValidDocuments: [string, Document, string][] = [
    ['cfdi40', documentCfdi40(), 'CFDI40'],
    ['cfdi33', documentCfdi33(), 'CFDI33'],
    ['cfdi32', documentCfdi32(), 'CFDI32'],
    ['ret10Mexican', documentRet10Mexican(), 'RET10'],
    ['ret10Foreign', documentRet10Foreign(), 'RET10'],
    ['ret20Foreign', documentRet20Foreign(), 'RET20'],
    ['ret20Mexican', documentRet20Mexican(), 'RET20'],
  ];

  beforeEach(() => {
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
      new Retenciones10(),
    ]);
  });

  test('generic extractor use specific extractors', () => {
    extractor = new DiscoverExtractor(
      new Comprobante40(),
      new Comprobante33(),
      new Comprobante32(),
    );
    const currentExpressionExtractors = extractor.currentExpressionExtractors();
    expect(currentExpressionExtractors).toHaveLength(3);
    expect(currentExpressionExtractors).toStrictEqual([
      new Comprobante40(),
      new Comprobante33(),
      new Comprobante32(),
    ]);
  });

  test('dont match using empty document', () => {
    const document = newDocument();
    expect(extractor.matches(document)).toBeFalsy();
  });

  test('throw exception on unmatched document', () => {
    const document = newDocument();
    expect(() => extractor.extract(document)).toThrow(UnmatchedDocumentError);
    expect(() => extractor.extract(document)).toThrow(
      'Cannot discover any DiscoverExtractor that matches with document',
    );
  });

  test.each(providerExpressionOnValidDocuments)(
    'expression on valid documents %s',
    (_name: string, document: Document) => {
      expect(extractor.matches(document)).toBeTruthy();
      expect(extractor.extract(document)).not.toBe('');
    },
  );

  test.each(providerExpressionOnValidDocuments)(
    'extract produces the same results as obtain and format with %s',
    (_name, document, type) => {
      const values = extractor.obtain(document);
      const expression = extractor.format(values, type);
      const expectedExpression = extractor.extract(document);
      expect(expression).toBe(expectedExpression);
    },
  );

  test('format using no type', () => {
    expect(() => extractor.format({})).toThrow(UnmatchedDocumentError);
    expect(() => extractor.format({})).toThrow(
      'DiscoverExtractor requires type key with an extractor identifier',
    );
  });

  test('format using cfdi33', () => {
    expect(extractor.format({}, 'CFDI33')).not.toBe('');
  });
});
