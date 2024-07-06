import { newDocument, newDocumentContent } from '@nodecfdi/cfdi-core';
import { UnmatchedDocumentError } from '#src/errors';
import { MatchDetector } from '#src/internal/match_detector';
import { fileContentPath } from '#tests/test_utils';

describe('match detector', () => {
  let detector: MatchDetector;
  let document: Document;

  beforeEach(() => {
    detector = new MatchDetector('http://example.com/books', 'b:books', 'version', 'v1');
    document = newDocumentContent(fileContentPath('books.xml'));
  });

  test('check positive match', () => {
    expect(detector.matches(document)).toBeTruthy();
  });

  test('check without document element', () => {
    document = newDocument();
    expect(detector.matches(document)).toBeFalsy();

    expect(() => {
      detector.check(document);
    }).toThrow(UnmatchedDocumentError);
    expect(() => {
      detector.check(document);
    }).toThrow('Document does not have root element');
  });

  test('check with bad namespace uri', () => {
    detector.namespaceUri = 'http://example.com/foo';
    expect(detector.matches(document)).toBeFalsy();

    expect(() => {
      detector.check(document);
    }).toThrow(UnmatchedDocumentError);
    expect(() => {
      detector.check(document);
    }).toThrow('Document root element namespace does not match');
  });

  test('check with bad root element name', () => {
    detector.elementName = 'b:foo';
    expect(detector.matches(document)).toBeFalsy();

    expect(() => {
      detector.check(document);
    }).toThrow(UnmatchedDocumentError);
    expect(() => {
      detector.check(document);
    }).toThrow('Document root element name does not match');
  });

  test('check with bad version attribute name', () => {
    detector.versionName = 'foo';
    expect(detector.matches(document)).toBeFalsy();

    expect(() => {
      detector.check(document);
    }).toThrow(UnmatchedDocumentError);
    expect(() => {
      detector.check(document);
    }).toThrow('Document root element version attribute does not match');
  });

  test('check with bad version attribute value', () => {
    detector.versionValue = 'foo';
    expect(detector.matches(document)).toBeFalsy();

    expect(() => {
      detector.check(document);
    }).toThrow(UnmatchedDocumentError);
    expect(() => {
      detector.check(document);
    }).toThrow('Document root element version attribute does not match');
  });
});
