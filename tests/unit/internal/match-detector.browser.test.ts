import { Xml, install } from '@nodecfdi/cfdiutils-common';
import { MatchDetector } from 'src/internal/match-detector';
import { UnmatchedDocumentException } from 'src/exceptions/unmatched-document-exception';
import { useTestCase } from '../../test-case.js';

describe('Internal/MatchDetector_Browser', () => {
  let detector: MatchDetector;
  let _document: Document;
  const { fileContentPath } = useTestCase();

  beforeEach(() => {
    install(new DOMParser(), new XMLSerializer(), document.implementation);
    detector = new MatchDetector('http://example.com/books', 'b:books', 'version', 'v1');
    _document = Xml.newDocumentContent(fileContentPath('books.xml'));
  });

  test('check positive match', () => {
    expect(detector.matches(_document)).toBeTruthy();
  });

  test('check without document element', () => {
    _document = Xml.newDocument();
    expect(detector.matches(_document)).toBeFalsy();

    expect(() => {
      detector.check(_document);
    }).toThrow(UnmatchedDocumentException);
    expect(() => {
      detector.check(_document);
    }).toThrow('Document does not have root element');
  });

  test('check with bad namespace uri', () => {
    detector.namespaceUri = 'http://example.com/foo';
    expect(detector.matches(_document)).toBeFalsy();

    expect(() => {
      detector.check(_document);
    }).toThrow(UnmatchedDocumentException);
    expect(() => {
      detector.check(_document);
    }).toThrow('Document root element namespace does not match');
  });

  test('check with bad root element name', () => {
    detector.elementName = 'b:foo';
    expect(detector.matches(_document)).toBeFalsy();

    expect(() => {
      detector.check(_document);
    }).toThrow(UnmatchedDocumentException);
    expect(() => {
      detector.check(_document);
    }).toThrow('Document root element name does not match');
  });

  test('check with bad version attribute name', () => {
    detector.versionName = 'foo';
    expect(detector.matches(_document)).toBeFalsy();

    expect(() => {
      detector.check(_document);
    }).toThrow(UnmatchedDocumentException);
    expect(() => {
      detector.check(_document);
    }).toThrow('Document root element version attribute does not match');
  });

  test('check with bad version attribute value', () => {
    detector.versionValue = 'foo';
    expect(detector.matches(_document)).toBeFalsy();

    expect(() => {
      detector.check(_document);
    }).toThrow(UnmatchedDocumentException);
    expect(() => {
      detector.check(_document);
    }).toThrow('Document root element version attribute does not match');
  });
});
