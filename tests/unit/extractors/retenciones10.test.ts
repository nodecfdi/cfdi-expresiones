import { DOMParser, XMLSerializer, DOMImplementation } from '@xmldom/xmldom';
import { AttributeNotFoundException } from 'src/exceptions/attribute-not-found-exception';
import { UnmatchedDocumentException } from 'src/exceptions/unmatched-document-exception';
import { Retenciones10 } from 'src/extractors/retenciones10';
import { useDomDocuments } from '../dom-documents-test-case.js';

describe('Extractors/Retenciones10', () => {
  let extractor: Retenciones10;
  let document: Document;
  const { documentRet10Mexican, documentRet10Foreign, documentRet20Mexican, documentRet20Foreign, documentLoad } =
    useDomDocuments(new DOMParser(), new XMLSerializer(), new DOMImplementation());

  beforeEach(() => {
    extractor = new Retenciones10();
    document = documentRet10Foreign();
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
    document = documentRet10Mexican();
    const expectedExpression = [
      '?re=AAA010101AAA&rr=SUL010720JN8&tt=0002000000.000000',
      '&id=fc1b47b2-42f3-4ca2-8587-36e0a216c4d5',
    ].join('');
    expect(extractor.extract(document)).toBe(expectedExpression);
  });

  test.each([
    ['RET20Mexican', documentRet20Mexican()],
    ['RET20Foreign', documentRet20Foreign()],
  ])('not matches cfdi %s', (_name: string, document: Document) => {
    expect(extractor.matches(document)).toBeFalsy();
  });

  test.each([
    ['RET20Mexican', documentRet20Mexican()],
    ['RET20Foreign', documentRet20Foreign()],
  ])('extract not matches throw exception with %s', (_name: string, document: Document) => {
    expect(() => extractor.extract(document)).toThrow(UnmatchedDocumentException);
    expect(() => extractor.extract(document)).toThrow('The document is not a RET 1.0');
  });

  test('extract without receptor throws exception', () => {
    document = documentLoad('ret10-without-receptor-tax-id.xml');

    expect(() => extractor.extract(document)).toThrow(AttributeNotFoundException);
    expect(() => extractor.extract(document)).toThrow('RET 1.0 receiver tax id cannot be found');
  });

  test('format mexican', () => {
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

  test('format foreign', () => {
    const expectedRetenciones10 = [
      '?re=ÑA&amp;010101AA1',
      '&nr=0000000000000000000X',
      '&tt=0000012345.670000',
      '&id=AAAAAAAA-BBBB-CCCC-DDDD-000000000000',
    ].join('');
    const parameters = {
      re: 'ÑA&010101AA1',
      nr: 'X',
      id: 'AAAAAAAA-BBBB-CCCC-DDDD-000000000000',
      tt: '12345.67',
    };
    expect(extractor.format(parameters)).toBe(expectedRetenciones10);
  });

  test.each([
    ['X', '0000000000000000000X'],
    ['12345678901234567890', '12345678901234567890'],
    ['12345678901234567890_1234', '12345678901234567890'],
    ['ÑÑÑ', '00000000000000000ÑÑÑ'],
    ['A&Z', '0000000000000A&amp;Z'],
  ])('format foreign tax id input: %s - expected: %s', (input: string, expected: string) => {
    expect(extractor.formatForeignTaxId(input)).toBe(expected);
  });

  test('format with empty', () => {
    expect(extractor.format({})).not.toBe('');
  });
});
