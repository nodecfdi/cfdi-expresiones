import { UnmatchedDocumentException } from 'src/exceptions/unmatched-document-exception';
import { Comprobante32 } from 'src/extractors/comprobante32';
import { useDomDocuments } from '../dom-documents-test-case.js';

describe('Extractors/Comprobante32_Browser', () => {
  let extractor: Comprobante32;
  let _document: Document;
  const { documentCfdi32, documentCfdi33, documentCfdi40 } = useDomDocuments(
    new DOMParser(),
    new XMLSerializer(),
    document.implementation,
  );

  beforeEach(() => {
    extractor = new Comprobante32();
    _document = documentCfdi32();
  });

  test('unique name', () => {
    expect(extractor.uniqueName()).toBe('CFDI32');
  });

  test('matches cfdi32', () => {
    expect(extractor.matches(_document)).toBeTruthy();
  });

  test('extract cfdi32', () => {
    const expectedExpression =
      '?re=CTO021007DZ8&rr=XAXX010101000&tt=0000004685.000000&id=80824F3B-323E-407B-8F8E-40D83FE2E69F';
    expect(extractor.extract(_document)).toBe(expectedExpression);
  });

  test.each([
    ['cfdi40', documentCfdi40()],
    ['cfdi33', documentCfdi33()],
  ])('not matches cfdi with %s', (_name: string, _document: Document) => {
    expect(extractor.matches(_document)).toBeFalsy();
  });

  test.each([
    ['cfdi40', documentCfdi40()],
    ['cfdi33', documentCfdi33()],
  ])('extract not matches throw exception with %s', (_name: string, _document: Document) => {
    expect(() => extractor.extract(_document)).toThrow(UnmatchedDocumentException);
    expect(() => extractor.extract(_document)).toThrow('The document is not a CFDI 3.2');
  });

  test('format uses formatting', () => {
    const expected32 = [
      '?re=Ñ&amp;A010101AAA',
      '&rr=Ñ&amp;A991231AA0',
      '&tt=0000001234.567800',
      '&id=CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC',
    ].join('');
    const parameters = {
      re: 'Ñ&A010101AAA',
      rr: 'Ñ&A991231AA0',
      tt: '1234.5678',
      id: 'CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC',
    };
    expect(extractor.format(parameters)).toBe(expected32);
  });

  test('format with empty', () => {
    expect(extractor.format({})).not.toBe('');
  });
});
