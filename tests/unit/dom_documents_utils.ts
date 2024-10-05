import { type Document, newDocumentContent } from '@nodecfdi/cfdi-core';
import { fileContentPath } from '../test_utils.js';

export const documentCfdi40 = (): Document =>
  newDocumentContent(fileContentPath('cfdi40-real.xml'));

export const documentCfdi33 = (): Document =>
  newDocumentContent(fileContentPath('cfdi33-real.xml'));

export const documentCfdi32 = (): Document =>
  newDocumentContent(fileContentPath('cfdi32-real.xml'));

export const documentRet10Mexican = (): Document =>
  newDocumentContent(fileContentPath('ret10-mexican-fake.xml'));

export const documentRet20Mexican = (): Document =>
  newDocumentContent(fileContentPath('ret20-mexican-fake.xml'));

export const documentRet10Foreign = (): Document =>
  newDocumentContent(fileContentPath('ret10-foreign-fake.xml'));

export const documentRet20Foreign = (): Document =>
  newDocumentContent(fileContentPath('ret20-foreign-fake.xml'));

export const documentLoad = (path: string): Document => newDocumentContent(fileContentPath(path));
