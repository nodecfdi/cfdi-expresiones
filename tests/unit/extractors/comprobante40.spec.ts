import { type Document } from '@nodecfdi/cfdi-core';
import { UnmatchedDocumentError } from '#src/errors';
import Comprobante40 from '#src/extractors/comprobante40';
import { documentCfdi32, documentCfdi33, documentCfdi40 } from '../dom_documents_utils.js';

describe('extractors Comprobante40', () => {
  let extractor: Comprobante40;
  let document: Document;

  beforeEach(() => {
    extractor = new Comprobante40();
    document = documentCfdi40();
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
      'id=04BF2854-FE7D-4377-9196-71248F060ABB&re=CSM190311AH6&rr=MCI7306249Y1&tt=459.36&fe=5tSZhA==',
    ].join('');

    expect(extractor.extract(document)).toBe(expectedExpression);
  });

  test.each([
    ['cfdi33', documentCfdi33()],
    ['cfdi32', documentCfdi32()],
  ])('not matches cfdi with %s', (_name: string, doc: Document) => {
    expect(extractor.matches(doc)).toBeFalsy();
  });

  test.each([
    ['cfdi33', documentCfdi33()],
    ['cfdi32', documentCfdi32()],
  ])('extract not matches throw exception with %s', (_name: string, doc: Document) => {
    expect(() => extractor.extract(doc)).toThrow(UnmatchedDocumentError);
    expect(() => extractor.extract(doc)).toThrow('The document is not a CFDI 4.0');
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
