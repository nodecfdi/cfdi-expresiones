import { AttributeNotFoundError, UnmatchedDocumentError } from '#src/errors';
import { Retenciones20 } from '#src/extractors/retenciones20';
import {
  documentLoad,
  documentRet10Foreign,
  documentRet10Mexican,
  documentRet20Foreign,
  documentRet20Mexican,
} from '../dom_documents_utils.js';

describe('extractors Retenciones20', () => {
  let extractor: Retenciones20;
  let document: Document;

  beforeEach(() => {
    extractor = new Retenciones20();
    document = documentRet20Foreign();
  });

  test('unique name', () => {
    expect(extractor.uniqueName()).toBe('RET20');
  });

  test('matches retenciones20', () => {
    expect(extractor.matches(document)).toBeTruthy();
  });

  test('extract retenciones20 foreign', () => {
    const expectedExpression = [
      'https://prodretencionverificacion.clouda.sat.gob.mx/',
      '?id=4E3DD8EA-5220-8C42-85A8-E37F9D7502F8',
      '&re=AAA010101AAA',
      '&nr=00000000001234567890',
      '&tt=2000000.0',
      '&fe=qsIe6w==',
    ].join('');
    expect(extractor.extract(document)).toBe(expectedExpression);
  });

  test('extract retenciones20 mexican', () => {
    document = documentRet20Mexican();
    const expectedExpression = [
      'https://prodretencionverificacion.clouda.sat.gob.mx/',
      '?id=4E3DD8EA-5220-8C42-85A8-E37F9D7502F8',
      '&re=AAA010101AAA',
      '&rr=SUL010720JN8',
      '&tt=4076.73',
      '&fe=qsIe6w==',
    ].join('');
    expect(extractor.extract(document)).toBe(expectedExpression);
  });

  test.each([
    ['RET10Mexican', documentRet10Mexican()],
    ['RET10Foreign', documentRet10Foreign()],
  ])('not matches retenciones %s', (_name: string, doc: Document) => {
    expect(extractor.matches(doc)).toBeFalsy();
  });

  test.each([
    ['RET10Mexican', documentRet10Mexican()],
    ['RET10Foreign', documentRet10Foreign()],
  ])('extract not matches throws exception %s', (_name: string, doc: Document) => {
    expect(() => extractor.extract(doc)).toThrow(UnmatchedDocumentError);
    expect(() => extractor.extract(doc)).toThrow('The document is not a RET 2.0');
  });

  test('extract without receptor throws exception', () => {
    document = documentLoad('ret20-without-receptor-tax-id.xml');

    expect(() => extractor.extract(document)).toThrow(AttributeNotFoundError);
    expect(() => extractor.extract(document)).toThrow('RET 2.0 receiver tax id cannot be found');
  });

  test('format mexican', () => {
    const expectedRetenciones20 = [
      'https://prodretencionverificacion.clouda.sat.gob.mx/',
      '?id=AAAAAAAA-BBBB-CCCC-DDDD-000000000000',
      '&re=Ñ&amp;A010101AAA',
      '&rr=Ñ&amp;A991231AA0',
      '&tt=123456.78',
      '&fe=qsIe6w==',
    ].join('');
    const parameters = {
      id: 'AAAAAAAA-BBBB-CCCC-DDDD-000000000000',
      re: 'Ñ&A010101AAA',
      rr: 'Ñ&A991231AA0',
      tt: '123456.78',
      fe: '...qsIe6w==',
    };
    expect(extractor.format(parameters)).toBe(expectedRetenciones20);
  });

  test('format foreign', () => {
    const expectedRetenciones20 = [
      'https://prodretencionverificacion.clouda.sat.gob.mx/',
      '?id=AAAAAAAA-BBBB-CCCC-DDDD-000000000000',
      '&re=Ñ&amp;A010101AAA',
      '&nr=0000000000000000000X',
      '&tt=123456.78',
      '&fe=qsIe6w==',
    ].join('');
    const parameters = {
      id: 'AAAAAAAA-BBBB-CCCC-DDDD-000000000000',
      re: 'Ñ&A010101AAA',
      nr: 'X',
      tt: '123456.78',
      fe: '...qsIe6w==',
    };
    expect(extractor.format(parameters)).toBe(expectedRetenciones20);
  });

  test('format with empty', () => {
    expect(extractor.format({})).not.toBe('');
  });
});
