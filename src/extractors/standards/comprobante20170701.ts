import { Mixin } from 'ts-mixer';
import { UnmatchedDocumentError } from '../../errors.js';
import { DomHelper } from '../../internal/dom_helper.js';
import { type MatchDetector } from '../../internal/match_detector.js';
import { type ExpressionExtractorInterface } from '../../types.js';
import { cfdiNodeName } from '../../utils/constants.js';
import { FormatRfcXml } from './format_rfc_xml.js';
import { FormatSelloLast8 } from './format_sello_last8.js';
import { FormatTotal18x6 } from './format_total18x6.js';

/**
 * Especificación técnica del código de barras bidimensional a incorporar en la representación impresa.
 * Esta versión se utiliza desde CFDI 3.3 vigente a partir de 2017-07-01.
 */
export abstract class Comprobante20170701
  extends Mixin(FormatRfcXml, FormatTotal18x6, FormatSelloLast8)
  implements ExpressionExtractorInterface
{
  private readonly _matchDetector: MatchDetector;

  private readonly _unmatchedExceptionMessage: string;

  public constructor(matchDetector: MatchDetector, unmatchedExceptionMessage: string) {
    super();
    this._matchDetector = matchDetector;
    this._unmatchedExceptionMessage = unmatchedExceptionMessage;
  }

  public matches(document: Document): boolean {
    return this._matchDetector.matches(document);
  }

  public obtain(document: Document): Record<string, string> {
    if (!this.matches(document)) {
      throw new UnmatchedDocumentError(this._unmatchedExceptionMessage);
    }

    const helper = new DomHelper(document);
    const uuid = helper.getAttribute(
      cfdiNodeName,
      'cfdi:Complemento',
      'tfd:TimbreFiscalDigital',
      'UUID',
    );
    const rfcEmisor = helper.getAttribute(cfdiNodeName, 'cfdi:Emisor', 'Rfc');
    const rfcReceptor = helper.getAttribute(cfdiNodeName, 'cfdi:Receptor', 'Rfc');
    const total = helper.getAttribute(cfdiNodeName, 'Total');
    const sello = helper.getAttribute(cfdiNodeName, 'Sello');

    return {
      id: uuid,
      re: rfcEmisor,
      rr: rfcReceptor,
      tt: total,
      fe: sello,
    };
  }

  public extract(document: Document): string {
    return this.format(this.obtain(document));
  }

  public format(values: Record<string, string>): string {
    return `https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?${[
      `id=${values.id || ''}`,
      `re=${this.formatRfc(values.re || '')}`,
      `rr=${this.formatRfc(values.rr || '')}`,
      `tt=${this.formatTotal(values.tt || '')}`,
      `fe=${this.formatSello(values.fe || '')}`,
    ].join('&')}`;
  }

  public abstract uniqueName(): string;
}
