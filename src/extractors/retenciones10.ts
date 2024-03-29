import { Mixin } from 'ts-mixer';
import { type ExpressionExtractorInterface } from '../expression-extractor-interface';
import { MatchDetector } from '../internal/match-detector';
import { UnmatchedDocumentException } from '../exceptions/unmatched-document-exception';
import { DomHelper } from '../internal/dom-helper';
import { AttributeNotFoundException } from '../exceptions/attribute-not-found-exception';
import { FormatForeignTaxId20 } from './standards/format-foreign-tax-id20';
import { FormatRfcXml } from './standards/format-rfc-xml';
import { FormatTotal10x6 } from './standards/format-total10x6';

export class Retenciones10
    extends Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal10x6)
    implements ExpressionExtractorInterface
{
    private readonly _matchDetector: MatchDetector;

    constructor() {
        super();
        this._matchDetector = new MatchDetector(
            'http://www.sat.gob.mx/esquemas/retencionpago/1',
            'retenciones:Retenciones',
            'Version',
            '1.0',
        );
    }

    public uniqueName(): string {
        return 'RET10';
    }

    public matches(document: Document): boolean {
        return this._matchDetector.matches(document);
    }

    public obtain(document: Document): Record<string, string> {
        if (!this.matches(document)) {
            throw new UnmatchedDocumentException('The document is not a RET 1.0');
        }

        const helper = new DomHelper(document);

        const uuid = helper.getAttribute(
            'retenciones:Retenciones',
            'retenciones:Complemento',
            'tfd:TimbreFiscalDigital',
            'UUID',
        );
        const rfcEmisor = helper.getAttribute('retenciones:Retenciones', 'retenciones:Emisor', 'RFCEmisor');

        const { rfcReceptorKey, rfcReceptor } = this.obtainReceptorValues(helper);

        const total = helper.getAttribute('retenciones:Retenciones', 'retenciones:Totales', 'montoTotOperacion');

        return {
            re: rfcEmisor,
            [rfcReceptorKey]: rfcReceptor,
            tt: this.formatTotal(total),
            id: uuid,
        };
    }

    public extract(document: Document): string {
        return this.format(this.obtain(document));
    }

    public format(values: Record<string, string>): string {
        let receptorKey = 'rr';

        if (values.rr) {
            values.rr = this.formatRfc(values[receptorKey]);
        }

        if (values.nr) {
            receptorKey = 'nr';
            values.nr = this.formatForeignTaxId(values.nr);
        }

        return `?${[
            `re=${this.formatRfc(values.re || '')}`,
            `${receptorKey}=${values[receptorKey] || ''}`,
            `tt=${this.formatTotal(values.tt || '')}`,
            `id=${values.id || ''}`,
        ].join('&')}`;
    }

    private obtainReceptorValues(helper: DomHelper): { rfcReceptorKey: string; rfcReceptor: string } {
        let rfcReceptorKey = 'rr';
        let rfcReceptor = helper.findAttribute(
            'retenciones:Retenciones',
            'retenciones:Receptor',
            'retenciones:Nacional',
            'RFCRecep',
        );

        if (rfcReceptor === null) {
            rfcReceptorKey = 'nr';
            rfcReceptor = helper.findAttribute(
                'retenciones:Retenciones',
                'retenciones:Receptor',
                'retenciones:Extranjero',
                'NumRegIdTrib',
            );
        }

        if (rfcReceptor === null) {
            throw new AttributeNotFoundException('RET 1.0 receiver tax id cannot be found');
        }

        return { rfcReceptorKey, rfcReceptor };
    }
}
