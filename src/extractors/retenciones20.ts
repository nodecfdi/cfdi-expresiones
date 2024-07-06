import { Mixin } from 'ts-mixer';
import { AttributeNotFoundError, UnmatchedDocumentError } from '../errors.js';
import { DomHelper } from '../internal/dom_helper.js';
import { MatchDetector } from '../internal/match_detector.js';
import { type ExpressionExtractorInterface } from '../types.js';
import { retencionesNodeName } from '../utils/constants.js';
import { FormatForeignTaxId20 } from './standards/format_foreign_tax_id20.js';
import { FormatRfcXml } from './standards/format_rfc_xml.js';
import { FormatSelloLast8 } from './standards/format_sello_last8.js';
import { FormatTotal18x6 } from './standards/format_total18x6.js';

export class Retenciones20
  extends Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal18x6, FormatSelloLast8)
  implements ExpressionExtractorInterface
{
  private readonly _matchDetector: MatchDetector;

  public constructor() {
    super();
    this._matchDetector = new MatchDetector(
      'http://www.sat.gob.mx/esquemas/retencionpago/2',
      retencionesNodeName,
      'Version',
      '2.0',
    );
  }

  public uniqueName(): string {
    return 'RET20';
  }

  public matches(document: Document): boolean {
    return this._matchDetector.matches(document);
  }

  public obtain(document: Document): Record<string, string> {
    if (!this.matches(document)) {
      throw new UnmatchedDocumentError('The document is not a RET 2.0');
    }

    const helper = new DomHelper(document);

    const uuid = helper.getAttribute(
      retencionesNodeName,
      'retenciones:Complemento',
      'tfd:TimbreFiscalDigital',
      'UUID',
    );
    const rfcEmisor = helper.getAttribute(retencionesNodeName, 'retenciones:Emisor', 'RfcE');
    const { rfcReceptorKey, rfcReceptor } = this.obtainReceptorValues(helper);

    const total = helper.getAttribute(
      retencionesNodeName,
      'retenciones:Totales',
      'MontoTotOperacion',
    );
    const sello = helper.getAttribute(retencionesNodeName, 'Sello');

    return {
      id: uuid,
      re: rfcEmisor,
      [rfcReceptorKey]: rfcReceptor,
      tt: total,
      fe: sello,
    };
  }

  public extract(document: Document): string {
    return this.format(this.obtain(document));
  }

  public format(values: Record<string, string>): string {
    let receptorKey = 'rr';

    if (values.rr) {
      values[receptorKey] = this.formatRfc(values[receptorKey]);
    }

    if (values.nr) {
      receptorKey = 'nr';
      values.nr = this.formatForeignTaxId(values.nr);
    }

    return `https://prodretencionverificacion.clouda.sat.gob.mx/?${[
      `id=${values.id || ''}`,
      `re=${this.formatRfc(values.re || '')}`,
      `${receptorKey}=${values[receptorKey] || ''}`,
      `tt=${this.formatTotal(values.tt || '')}`,
      `fe=${this.formatSello(values.fe || '')}`,
    ].join('&')}`;
  }

  private obtainReceptorValues(helper: DomHelper): { rfcReceptorKey: string; rfcReceptor: string } {
    let rfcReceptorKey = 'rr';
    let rfcReceptor = helper.findAttribute(
      retencionesNodeName,
      'retenciones:Receptor',
      'retenciones:Nacional',
      'RfcR',
    );

    if (rfcReceptor === null) {
      rfcReceptorKey = 'nr';
      rfcReceptor = helper.findAttribute(
        retencionesNodeName,
        'retenciones:Receptor',
        'retenciones:Extranjero',
        'NumRegIdTribR',
      );
    }

    if (rfcReceptor === null) {
      throw new AttributeNotFoundError('RET 2.0 receiver tax id cannot be found');
    }

    return {
      rfcReceptorKey,
      rfcReceptor,
    };
  }
}
