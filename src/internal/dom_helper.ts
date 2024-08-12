import { AttributeNotFoundError, ElementNotFoundError } from '#src/errors';

export default class DomHelper {
  private readonly _document?: Document;

  public constructor(document: Document) {
    this._document = document;
  }

  public rootElement(): Element {
    if (!this._document?.documentElement) {
      throw new SyntaxError('DOMDocument does not have root element');
    }

    return this._document.documentElement;
  }

  public getAttribute(...path: string[]): string {
    const value = this.findAttribute(...path);
    if (value === null) {
      const attribute = path.pop();
      throw new AttributeNotFoundError(`Attribute ${path.join('/')}@${attribute} not found`);
    }

    return value;
  }

  public findAttribute(...path: string[]): string | null {
    const attribute = `${path.pop()}`;
    const element = this.findElement(...path);
    if (element === null) {
      return null;
    }

    if (!element.hasAttribute(attribute)) {
      return null;
    }

    return element.getAttribute(attribute);
  }

  public getElement(...path: string[]): Element {
    const element = this.findElement(...path);
    if (!element) {
      throw new ElementNotFoundError(`Element ${path.join('/')} not found`);
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
      if (children.nodeType === 1 && name === children.nodeName) {
        return children as Element;
      }
    }

    return null;
  }
}
