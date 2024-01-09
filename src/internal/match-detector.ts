import { UnmatchedDocumentException } from '../exceptions/unmatched-document-exception.js';

export class MatchDetector {
  constructor(
    public namespaceUri: string,
    public elementName: string,
    public versionName: string,
    public versionValue: string,
  ) {}

  public check(document?: Document): void {
    const documentElement = document?.documentElement;
    if (!documentElement) {
      throw new UnmatchedDocumentException('Document does not have root element');
    }

    if (documentElement.namespaceURI !== this.namespaceUri) {
      throw new UnmatchedDocumentException('Document root element namespace does not match');
    }

    if (documentElement.nodeName !== this.elementName) {
      throw new UnmatchedDocumentException('Document root element name does not match');
    }

    if (documentElement.getAttribute(this.versionName) !== this.versionValue) {
      throw new UnmatchedDocumentException('Document root element version attribute does not match');
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
