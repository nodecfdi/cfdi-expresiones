import { type Document } from '@nodecfdi/cfdi-core';
import { UnmatchedDocumentError } from '#src/errors';

export default class MatchDetector {
  public constructor(
    public namespaceUri: string,
    public elementName: string,
    public versionName: string,
    public versionValue: string,
  ) {}

  public check(document?: Document): void {
    const documentElement = document?.documentElement;
    if (!documentElement) {
      throw new UnmatchedDocumentError('Document does not have root element');
    }

    if (documentElement.namespaceURI !== this.namespaceUri) {
      throw new UnmatchedDocumentError('Document root element namespace does not match');
    }

    if (documentElement.nodeName !== this.elementName) {
      throw new UnmatchedDocumentError('Document root element name does not match');
    }

    if (documentElement.getAttribute(this.versionName) !== this.versionValue) {
      throw new UnmatchedDocumentError('Document root element version attribute does not match');
    }
  }

  public matches(document: Document): boolean {
    try {
      this.check(document);
    } catch {
      return false;
    }

    return true;
  }
}
