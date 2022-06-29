import { UnmatchedDocumentException } from '~/exceptions/unmatched-document-exception';

export class MatchDetector {
    public namespaceUri: string;

    public elementName: string;

    public versionName: string;

    public versionValue: string;

    constructor(namespaceUri: string, elementName: string, versionName: string, versionValue: string) {
        this.namespaceUri = namespaceUri;
        this.elementName = elementName;
        this.versionName = versionName;
        this.versionValue = versionValue;
    }

    public check(document: Document): void {
        const documentElement = document.documentElement;
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
        } catch (e) {
            return false;
        }

        return true;
    }
}
