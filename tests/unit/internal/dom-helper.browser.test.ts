import { Xml, install } from '@nodecfdi/cfdiutils-common';
import { useTestCase } from '../../test-case';
import { DomHelper } from 'src/internal/dom-helper';
import { ElementNotFoundException } from 'src/exceptions/element-not-found-exception';
import { AttributeNotFoundException } from 'src/exceptions/attribute-not-found-exception';

describe('Internal/DomHelper_Browser', () => {
    let _document: Document;
    let helper: DomHelper;
    const { fileContentPath } = useTestCase();

    beforeEach(() => {
        install(new DOMParser(), new XMLSerializer(), document.implementation);
        _document = Xml.newDocumentContent(fileContentPath('books.xml'));
        helper = new DomHelper(_document);
    });

    test('fails using document without root element', () => {
        _document = Xml.newDocument();
        helper = new DomHelper(_document);
        expect(() => helper.rootElement()).toThrow(SyntaxError);
    });

    test('returns root element', () => {
        expect(helper.rootElement()).toStrictEqual(_document.documentElement);
    });

    test('returns find root element', () => {
        const element = helper.findElement('b:books');
        expect(element).toStrictEqual(_document.documentElement);
    });

    test('returns null finding invalid root element', () => {
        const element = helper.findElement('b:foo');
        expect(element).toBeNull();
    });

    test('throws exception getting invalid root element', () => {
        expect(() => helper.getElement('b:foo')).toThrow(ElementNotFoundException);
        expect(() => helper.getElement('b:foo')).toThrow('Element b:foo not found');
    });

    test('finding in depth', () => {
        const element = helper.findElement('b:books', 'b:library', 't:topic', 'b:book');
        if (!element) {
            throw new Error('Expected to exists element was not found');
        }

        expect(element.getAttribute('author')).toBe('Carlos C Soto');
    });

    test('getting in depth', () => {
        const element = helper.getElement('b:books', 'b:library', 't:topic', 'b:book');
        expect(element.getAttribute('author')).toBe('Carlos C Soto');
    });

    test('throws exception getting invalid element in depth', () => {
        expect(() => helper.getElement('b:books', 'b:library', 't:topic', 'b:book', 'b:foo')).toThrow(
            ElementNotFoundException,
        );
        expect(() => helper.getElement('b:books', 'b:library', 't:topic', 'b:book', 'b:foo')).toThrow(
            'Element b:books/b:library/t:topic/b:book/b:foo not found',
        );
    });

    test('throws exception getting invalid attribute in depth', () => {
        expect(() => helper.getAttribute('b:books', 'b:library', 't:topic', 'b:book', 'foo')).toThrow(
            AttributeNotFoundException,
        );
        expect(() => helper.getAttribute('b:books', 'b:library', 't:topic', 'b:book', 'foo')).toThrow(
            'Attribute b:books/b:library/t:topic/b:book@foo not found',
        );
    });

    test('returns null finding invalid attribute in depth', () => {
        expect(helper.findAttribute('b:books', 'b:library', 't:topic', 'b:book', 'foo')).toBeNull();
    });

    test('find attribute in depth', () => {
        const attribute = helper.findAttribute('b:books', 'b:library', 't:topic', 'b:book', 'author');
        expect(attribute).toBe('Carlos C Soto');
    });

    test('get attribute in depth', () => {
        const attribute = helper.getAttribute('b:books', 'b:library', 't:topic', 'b:book', 'author');
        expect(attribute).toBe('Carlos C Soto');
    });
});
