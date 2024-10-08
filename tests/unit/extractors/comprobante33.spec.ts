import { type Document } from '@nodecfdi/cfdi-core';
import { UnmatchedDocumentError } from '#src/errors';
import Comprobante33 from '#src/extractors/comprobante33';
import { documentCfdi32, documentCfdi33, documentCfdi40 } from '../dom_documents_utils.js';

describe('extractors Comprobante33', () => {
  let extractor: Comprobante33;
  let document: Document;

  beforeEach(() => {
    extractor = new Comprobante33();
    document = documentCfdi33();
  });

  test('unique name', () => {
    expect(extractor.uniqueName()).toBe('CFDI33');
  });

  test('matches cfdi33', () => {
    expect(extractor.matches(document)).toBeTruthy();
  });

  test('extract cfdi33', () => {
    const expectedExpression = [
      'https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?',
      'id=CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC&re=POT9207213D6&rr=DIM8701081LA&tt=2010.01&fe=/OAgdg==',
    ].join('');

    expect(extractor.extract(document)).toBe(expectedExpression);
  });

  test.each([
    ['cfdi40', documentCfdi40()],
    ['cfdi32', documentCfdi32()],
  ])('not matches cfdi with %s', (_name: string, doc: Document) => {
    expect(extractor.matches(doc)).toBeFalsy();
  });

  test.each([
    ['cfdi40', documentCfdi40()],
    ['cfdi32', documentCfdi32()],
  ])('extract not matches throw exception with %', (_name: string, doc: Document) => {
    expect(() => extractor.extract(doc)).toThrow(UnmatchedDocumentError);
    expect(() => extractor.extract(doc)).toThrow('The document is not a CFDI 3.3');
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
