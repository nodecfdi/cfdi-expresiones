import { ExpressionExtractorInterface } from '../expression-extractor-interface';
import { MatchDetector } from '../internal/match-detector';
import { UnmatchedDocumentException } from '../exceptions/unmatched-document-exception';
import { DomHelper } from '../internal/dom-helper';
import { AttributeNotFoundException } from '../exceptions/attribute-not-found-exception';
import { toFixed } from '../utils';

export class Retenciones10 implements ExpressionExtractorInterface {
    private matchDetector: MatchDetector;

    constructor() {
        this.matchDetector = new MatchDetector(
            'http://www.sat.gob.mx/esquemas/retencionpago/1',
            'retenciones:Retenciones',
            'Version',
            '1.0'
        );
    }

    public uniqueName(): string {
        return 'RET10';
    }

    public matches(document: Document): boolean {
        return this.matchDetector.matches(document);
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
            'UUID'
        );
        const rfcEmisor = helper.getAttribute('retenciones:Retenciones', 'retenciones:Emisor', 'RFCEmisor');

        let rfcReceptorKey = 'rr';
        let rfcReceptor = helper.findAttribute(
            'retenciones:Retenciones',
            'retenciones:Receptor',
            'retenciones:Nacional',
            'RFCRecep'
        );

        if (!rfcReceptor) {
            rfcReceptorKey = 'nr';
            rfcReceptor = helper.findAttribute(
                'retenciones:Retenciones',
                'retenciones:Receptor',
                'retenciones:Extranjero',
                'NumRegIdTrib'
            );
        }

        if (!rfcReceptor) {
            throw new AttributeNotFoundException('RET 1.0 receiver tax id cannot be found');
        }

        if (rfcReceptorKey === 'nr') {
            rfcReceptor = rfcReceptor.padStart(20, '0');
        }

        const total = helper.getAttribute('retenciones:Retenciones', 'retenciones:Totales', 'montoTotOperacion');

        return {
            re: rfcEmisor,
            [rfcReceptorKey]: rfcReceptor,
            tt: total,
            id: uuid,
        };
    }

    public extract(document: Document): string {
        return this.format(this.obtain(document));
    }

    public format(values: Record<string, string>): string {
        let receptorKey = 'rr';
        if (values['nr']) {
            receptorKey = 'nr';
            values['nr'] = this.formatForeignTaxId(values['nr']);
        }
        return `?${[
            `re=${values['re'] || ''}`,
            `${receptorKey}=${values[receptorKey] || ''}`,
            `tt=${this.formatTotal(values['tt'] || '')}`,
            `id=${values['id'] || ''}`,
        ].join('&')}`;
    }

    public formatForeignTaxId(foreignTaxId: string) {
        return foreignTaxId.padStart(20, '0');
    }

    public formatTotal(input: string): string {
        return toFixed(Number.parseFloat(input || '0'), 6).padStart(17, '0');
    }
}
