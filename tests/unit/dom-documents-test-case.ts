/* eslint-disable unicorn/prevent-abbreviations */
import { Xml, install } from '@nodecfdi/cfdiutils-common';
import { useTestCase } from '../test-case.js';

const useDomDocuments = (
  domParser: DOMParser,
  xmlSerializer: XMLSerializer,
  domImplementation: DOMImplementation,
): {
  documentCfdi40: () => Document;
  documentCfdi33: () => Document;
  documentCfdi32: () => Document;
  documentRet10Mexican: () => Document;
  documentRet20Mexican: () => Document;
  documentRet10Foreign: () => Document;
  documentRet20Foreign: () => Document;
  documentLoad: (path: string) => Document;
} => {
  const { fileContentPath } = useTestCase();

  const documentCfdi40 = (): Document => {
    install(domParser, xmlSerializer, domImplementation);

    return Xml.newDocumentContent(fileContentPath('cfdi40-real.xml'));
  };

  const documentCfdi33 = (): Document => {
    install(domParser, xmlSerializer, domImplementation);

    return Xml.newDocumentContent(fileContentPath('cfdi33-real.xml'));
  };

  const documentCfdi32 = (): Document => {
    install(domParser, xmlSerializer, domImplementation);

    return Xml.newDocumentContent(fileContentPath('cfdi32-real.xml'));
  };

  const documentRet10Mexican = (): Document => {
    install(domParser, xmlSerializer, domImplementation);

    return Xml.newDocumentContent(fileContentPath('ret10-mexican-fake.xml'));
  };

  const documentRet20Mexican = (): Document => {
    install(domParser, xmlSerializer, domImplementation);

    return Xml.newDocumentContent(fileContentPath('ret20-mexican-fake.xml'));
  };

  const documentRet10Foreign = (): Document => {
    install(domParser, xmlSerializer, domImplementation);

    return Xml.newDocumentContent(fileContentPath('ret10-foreign-fake.xml'));
  };

  const documentRet20Foreign = (): Document => {
    install(domParser, xmlSerializer, domImplementation);

    return Xml.newDocumentContent(fileContentPath('ret20-foreign-fake.xml'));
  };

  const documentLoad = (path: string): Document => {
    install(domParser, xmlSerializer, domImplementation);

    return Xml.newDocumentContent(fileContentPath(path));
  };

  return {
    documentCfdi40,
    documentCfdi33,
    documentCfdi32,
    documentRet10Mexican,
    documentRet20Mexican,
    documentRet10Foreign,
    documentRet20Foreign,
    documentLoad,
  };
};

export { useDomDocuments };
