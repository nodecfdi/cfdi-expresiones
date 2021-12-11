import { MatchDetector } from '../../../src/internal/match-detector';
import { Xml } from '@nodecfdi/cfdiutils-common';
import { TestCase } from '../../test-case';
import { UnmatchedDocumentException } from '../../../src/exceptions/unmatched-document-exception';

describe('Internal/MatchDetector', () => {
    let detector: MatchDetector;
    let document: Document;

    beforeEach(() => {
        detector = new MatchDetector('http://example.com/books', 'b:books', 'version', 'v1');
        document = Xml.newDocumentContent(TestCase.fileContentPath('books.xml'));
    });

    test('check positive match', () => {
        expect(detector.matches(document)).toBeTruthy();
    });

    test('check without document element', () => {
        document = Xml.newDocument();
        expect(detector.matches(document)).toBeFalsy();

        expect(() => detector.check(document)).toThrow(UnmatchedDocumentException);
        expect(() => detector.check(document)).toThrow('Document does not have root element');
    });

    test('check with bad namespace uri', () => {
        detector.namespaceUri = 'http://example.com/foo';
        expect(detector.matches(document)).toBeFalsy();

        expect(() => detector.check(document)).toThrow(UnmatchedDocumentException);
        expect(() => detector.check(document)).toThrow('Document root element namespace does not match');
    });

    test('check with bad root element name', () => {
        detector.elementName = 'b:foo';
        expect(detector.matches(document)).toBeFalsy();

        expect(() => detector.check(document)).toThrow(UnmatchedDocumentException);
        expect(() => detector.check(document)).toThrow('Document root element name does not match');
    });

    test('check with bad version attribute name', () => {
        detector.versionName = 'foo';
        expect(detector.matches(document)).toBeFalsy();

        expect(() => detector.check(document)).toThrow(UnmatchedDocumentException);
        expect(() => detector.check(document)).toThrow('Document root element version attribute does not match');
    });

    test('check with bad version attribute value', () => {
        detector.versionValue = 'foo';
        expect(detector.matches(document)).toBeFalsy();

        expect(() => detector.check(document)).toThrow(UnmatchedDocumentException);
        expect(() => detector.check(document)).toThrow('Document root element version attribute does not match');
    });
});
