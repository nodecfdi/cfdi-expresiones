import { MatchDetector } from '../internal/match-detector';
import { UnmatchedDocumentException } from '../exceptions/unmatched-document-exception';
import { DomHelper } from '../internal/dom-helper';
import { ExpressionExtractorInterface } from '../expression-extractor-interface';
import { html_entities, toFixed } from "../utils";

export class Comprobante32 implements ExpressionExtractorInterface {
    private matchDetector: MatchDetector;

    constructor() {
        this.matchDetector = new MatchDetector('http://www.sat.gob.mx/cfd/3', 'cfdi:Comprobante', 'version', '3.2');
    }

    public uniqueName(): string {
        return 'CFDI32';
    }

    public matches(document: Document): boolean {
        return this.matchDetector.matches(document);
    }

    public obtain(document: Document): Record<string, string> {
        if (!this.matches(document)) {
            throw new UnmatchedDocumentException('The document is not a CFDI 3.2');
        }
        const helper = new DomHelper(document);

        const uuid = helper.getAttribute('cfdi:Comprobante', 'cfdi:Complemento', 'tfd:TimbreFiscalDigital', 'UUID');
        const rfcEmisor = helper.getAttribute('cfdi:Comprobante', 'cfdi:Emisor', 'rfc');
        const rfcReceptor = helper.getAttribute('cfdi:Comprobante', 'cfdi:Receptor', 'rfc');
        const total = helper.getAttribute('cfdi:Comprobante', 'total');

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
            `re=${html_entities(values['re'] || '')}`,
            `rr=${html_entities(values['rr'] || '')}`,
            `tt=${this.formatTotal(values['tt'] || '')}`,
            `id=${values['id'] || ''}`,
        ].join('&')}`;
    }

    public formatTotal(input: string): string {
        return toFixed(Number.parseFloat(input || '0'), 6).padStart(17, '0');
    }
}
