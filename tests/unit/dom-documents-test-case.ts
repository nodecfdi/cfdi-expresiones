import { TestCase } from '../test-case';
import { XMLSerializer, DOMImplementation, DOMParser } from '@xmldom/xmldom';
import { Xml, install } from '@nodecfdi/cfdiutils-common';

export class DomDocumentsTestCase extends TestCase {
    public static documentCfdi40(): Document {
        install(new DOMParser(), new XMLSerializer(), new DOMImplementation());

        return Xml.newDocumentContent(this.fileContentPath('cfdi40-real.xml'));
    }

    public static documentCfdi33(): Document {
        install(new DOMParser(), new XMLSerializer(), new DOMImplementation());

        return Xml.newDocumentContent(this.fileContentPath('cfdi33-real.xml'));
    }

    public static documentCfdi32(): Document {
        install(new DOMParser(), new XMLSerializer(), new DOMImplementation());

        return Xml.newDocumentContent(this.fileContentPath('cfdi32-real.xml'));
    }

    public static documentRet10Mexican(): Document {
        install(new DOMParser(), new XMLSerializer(), new DOMImplementation());

        return Xml.newDocumentContent(this.fileContentPath('ret10-mexican-fake.xml'));
    }

    public static documentRet20Mexican(): Document {
        install(new DOMParser(), new XMLSerializer(), new DOMImplementation());

        return Xml.newDocumentContent(this.fileContentPath('ret20-mexican-fake.xml'));
    }

    public static documentRet10Foreign(): Document {
        install(new DOMParser(), new XMLSerializer(), new DOMImplementation());

        return Xml.newDocumentContent(this.fileContentPath('ret10-foreign-fake.xml'));
    }

    public static documentRet20Foreign(): Document {
        install(new DOMParser(), new XMLSerializer(), new DOMImplementation());

        return Xml.newDocumentContent(this.fileContentPath('ret20-foreign-fake.xml'));
    }

    public static documentLoad(path: string): Document {
        install(new DOMParser(), new XMLSerializer(), new DOMImplementation());

        return Xml.newDocumentContent(this.fileContentPath(path));
    }
}
