import { ExpressionExtractorInterface } from '../expression-extractor-interface';
import { MatchDetector } from '../internal/match-detector';
import { UnmatchedDocumentException } from '../exceptions/unmatched-document-exception';
import { DomHelper } from '../internal/dom-helper';
import { html_entities, rtrim, toFixed } from '../utils';

export class Comprobante33 implements ExpressionExtractorInterface {
    private matchDetector: MatchDetector;

    constructor() {
        this.matchDetector = new MatchDetector('http://www.sat.gob.mx/cfd/3', 'cfdi:Comprobante', 'Version', '3.3');
    }

    public uniqueName(): string {
        return 'CFDI33';
    }

    public matches(document: Document): boolean {
        return this.matchDetector.matches(document);
    }

    public obtain(document: Document): Record<string, string> {
        if (!this.matches(document)) {
            throw new UnmatchedDocumentException('The document is not a CFDI 3.3');
        }
        const helper = new DomHelper(document);
        const uuid = helper.getAttribute('cfdi:Comprobante', 'cfdi:Complemento', 'tfd:TimbreFiscalDigital', 'UUID');
        const rfcEmisor = helper.getAttribute('cfdi:Comprobante', 'cfdi:Emisor', 'Rfc');
        const rfcReceptor = helper.getAttribute('cfdi:Comprobante', 'cfdi:Receptor', 'Rfc');
        const total = helper.getAttribute('cfdi:Comprobante', 'Total');
        const sello = helper.getAttribute('cfdi:Comprobante', 'Sello').slice(-8);

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
            `re=${html_entities(values.re || '')}`,
            `rr=${html_entities(values.rr || '')}`,
            `tt=${this.formatTotal(values.tt) || ''}`,
            `fe=${values.fe || ''}`,
        ].join('&')}`;
    }

    public formatTotal(input: string): string {
        let total = rtrim(toFixed(Number.parseFloat(input || '0'), 6), '0');
        if (total.slice(-1) === '.') {
            total = `${total}0`;
        }
        return total;
    }
}
