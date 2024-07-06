import { Mixin } from 'ts-mixer';
import { UnmatchedDocumentError } from '../errors.js';
import { DomHelper } from '../internal/dom_helper.js';
import { MatchDetector } from '../internal/match_detector.js';
import { type ExpressionExtractorInterface } from '../types.js';
import { cfdiNodeName } from '../utils/constants.js';
import { FormatRfcXml } from './standards/format_rfc_xml.js';
import { FormatTotal10x6 } from './standards/format_total10x6.js';

export class Comprobante32
  extends Mixin(FormatRfcXml, FormatTotal10x6)
  implements ExpressionExtractorInterface
{
  private readonly _matchDetector: MatchDetector;

  public constructor() {
    super();
    this._matchDetector = new MatchDetector(
      'http://www.sat.gob.mx/cfd/3',
      cfdiNodeName,
      'version',
      '3.2',
    );
  }

  public uniqueName(): string {
    return 'CFDI32';
  }

  public matches(document: Document): boolean {
    return this._matchDetector.matches(document);
  }

  public obtain(document: Document): Record<string, string> {
    if (!this.matches(document)) {
      throw new UnmatchedDocumentError('The document is not a CFDI 3.2');
    }

    const helper = new DomHelper(document);

    const uuid = helper.getAttribute(
      cfdiNodeName,
      'cfdi:Complemento',
      'tfd:TimbreFiscalDigital',
      'UUID',
    );
    const rfcEmisor = helper.getAttribute(cfdiNodeName, 'cfdi:Emisor', 'rfc');
    const rfcReceptor = helper.getAttribute(cfdiNodeName, 'cfdi:Receptor', 'rfc');
    const total = helper.getAttribute(cfdiNodeName, 'total');

    return {
      re: rfcEmisor,
      rr: rfcReceptor,
      tt: total,
      id: uuid,
    };
  }

  public extract(document: Document): string {
    return this.format(this.obtain(document));
  }

  public format(values: Record<string, string>): string {
    return `?${[
      `re=${this.formatRfc(values.re || '')}`,
      `rr=${this.formatRfc(values.rr || '')}`,
      `tt=${this.formatTotal(values.tt || '')}`,
      `id=${values.id || ''}`,
    ].join('&')}`;
  }
}
