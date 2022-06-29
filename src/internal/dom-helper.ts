import { DomValidators } from '@nodecfdi/cfdiutils-common';
import { AttributeNotFoundException } from '~/exceptions/attribute-not-found-exception';
import { ElementNotFoundException } from '~/exceptions/element-not-found-exception';

export class DomHelper {
    private document: Document;

    constructor(document: Document) {
        this.document = document;
    }

    public rootElement(): Element {
        if (!this.document.documentElement) {
            throw new SyntaxError('DOMDocument does not have root element');
        }

        return this.document.documentElement;
    }

    public getAttribute(...path: string[]): string {
        const value = this.findAttribute(...path);
        if (!value) {
            const attribute = path.pop() || '';
            throw new AttributeNotFoundException(`Attribute ${path.join('/')}@${attribute} not found`);
        }

        return value;
    }

    public findAttribute(...path: string[]): string | null {
        const attribute = path.pop() || '';
        const element = this.findElement(...path);
        if (!element) {
            return null;
        }

        return element.getAttribute(attribute) || null;
    }

    public getElement(...path: string[]): Element {
        const element = this.findElement(...path);
        if (!element) {
            throw new ElementNotFoundException(`Element ${path.join('/')} not found`);
        }

        return element;
    }

    public findElement(...path: string[]): Element | null {
        const name = path.shift();
        const element = this.rootElement();
        if (name !== element.nodeName) {
            return null;
        }
        let childElement: Element | null = element;
        for (const childName of path) {
            childElement = this.findFirstChildByName(childElement, childName);
            if (!childElement) {
                return null;
            }
        }

        return childElement;
    }

    public findFirstChildByName(parent: Element, name: string): Element | null {
        for (let children = parent.firstChild; children; children = children.nextSibling) {
            if (DomValidators.isElement(children) && name == children.nodeName) {
                return children;
            }
        }

        return null;
    }
}
