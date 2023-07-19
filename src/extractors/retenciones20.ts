import { Mixin } from 'ts-mixer';
import { type ExpressionExtractorInterface } from '../expression-extractor-interface';
import { MatchDetector } from '../internal/match-detector';
import { UnmatchedDocumentException } from '../exceptions/unmatched-document-exception';
import { DomHelper } from '../internal/dom-helper';
import { AttributeNotFoundException } from '../exceptions/attribute-not-found-exception';
import { FormatForeignTaxId20 } from './standards/format-foreign-tax-id20';
import { FormatRfcXml } from './standards/format-rfc-xml';
import { FormatTotal18x6 } from './standards/format-total18x6';
import { FormatSelloLast8 } from './standards/format-sello-last8';

export class Retenciones20
    extends Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal18x6, FormatSelloLast8)
    implements ExpressionExtractorInterface
{
    private readonly _matchDetector: MatchDetector;

    constructor() {
        super();
        this._matchDetector = new MatchDetector(
            'http://www.sat.gob.mx/esquemas/retencionpago/2',
            'retenciones:Retenciones',
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
            throw new UnmatchedDocumentException('The document is not a RET 2.0');
        }

        const helper = new DomHelper(document);

        const uuid = helper.getAttribute(
            'retenciones:Retenciones',
            'retenciones:Complemento',
            'tfd:TimbreFiscalDigital',
            'UUID',
        );
        const rfcEmisor = helper.getAttribute('retenciones:Retenciones', 'retenciones:Emisor', 'RfcE');
        const { rfcReceptorKey, rfcReceptor } = this.obtainReceptorValues(helper);

        const total = helper.getAttribute('retenciones:Retenciones', 'retenciones:Totales', 'MontoTotOperacion');
        const sello = helper.getAttribute('retenciones:Retenciones', 'Sello');

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
            'retenciones:Retenciones',
            'retenciones:Receptor',
            'retenciones:Nacional',
            'RfcR',
        );

        if (rfcReceptor === null) {
            rfcReceptorKey = 'nr';
            rfcReceptor = helper.findAttribute(
                'retenciones:Retenciones',
                'retenciones:Receptor',
                'retenciones:Extranjero',
                'NumRegIdTribR',
            );
        }

        if (rfcReceptor === null) {
            throw new AttributeNotFoundException('RET 2.0 receiver tax id cannot be found');
        }

        return {
            rfcReceptorKey,
            rfcReceptor,
        };
    }
}
