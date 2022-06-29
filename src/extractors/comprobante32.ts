import { Mixin } from 'ts-mixer';
import { MatchDetector } from '~/internal/match-detector';
import { UnmatchedDocumentException } from '~/exceptions/unmatched-document-exception';
import { DomHelper } from '~/internal/dom-helper';
import { ExpressionExtractorInterface } from '~/expression-extractor-interface';
import { FormatRfcXml } from './standards/format-rfc-xml';
import { FormatTotal10x6 } from './standards/format-total10x6';

export class Comprobante32 extends Mixin(FormatRfcXml, FormatTotal10x6) implements ExpressionExtractorInterface {
    private _matchDetector: MatchDetector;

    constructor() {
        super();
        this._matchDetector = new MatchDetector('http://www.sat.gob.mx/cfd/3', 'cfdi:Comprobante', 'version', '3.2');
    }

    public uniqueName(): string {
        return 'CFDI32';
    }

    public matches(document: Document): boolean {
        return this._matchDetector.matches(document);
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
            id: uuid
        };
    }

    public extract(document: Document): string {
        return this.format(this.obtain(document));
    }

    public format(values: Record<string, string>): string {
        return `?${[
            `re=${this.formatRfc(values['re'] || '')}`,
            `rr=${this.formatRfc(values['rr'] || '')}`,
            `tt=${this.formatTotal(values['tt'] || '')}`,
            `id=${values['id'] || ''}`
        ].join('&')}`;
    }
}
