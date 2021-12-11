import { TestCase } from '../test-case';
import { Xml } from '@nodecfdi/cfdiutils-common';

export class DomDocumentsTestCase extends TestCase {
    public static documentCfdi33(): Document {
        return Xml.newDocumentContent(this.fileContentPath('cfdi33-real.xml'));
    }

    public static documentCfdi32(): Document {
        return Xml.newDocumentContent(this.fileContentPath('cfdi32-real.xml'));
    }

    public static documentRet10Mexican(): Document {
        return Xml.newDocumentContent(this.fileContentPath('ret10-mexican-fake.xml'));
    }

    public static documentRet10Foreign(): Document {
        return Xml.newDocumentContent(this.fileContentPath('ret10-foreign-fake.xml'));
    }
}
