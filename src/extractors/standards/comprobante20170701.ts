import { Mixin } from 'ts-mixer';
import { UnmatchedDocumentException } from '../../exceptions/unmatched-document-exception';
import { type ExpressionExtractorInterface } from '../../expression-extractor-interface';
import { DomHelper } from '../../internal/dom-helper';
import { type MatchDetector } from '../../internal/match-detector';
import { FormatRfcXml } from './format-rfc-xml';
import { FormatSelloLast8 } from './format-sello-last8';
import { FormatTotal18x6 } from './format-total18x6';

/**
 * Especificación técnica del código de barras bidimensional a incorporar en la representación impresa.
 * Esta versión se utiliza desde CFDI 3.3 vigente a partir de 2017-07-01.
 */
abstract class Comprobante20170701
    extends Mixin(FormatRfcXml, FormatTotal18x6, FormatSelloLast8)
    implements ExpressionExtractorInterface
{
    private readonly _matchDetector: MatchDetector;

    private readonly _unmatchedExceptionMessage: string;

    constructor(matchDetector: MatchDetector, unmatchedExceptionMessage: string) {
        super();
        this._matchDetector = matchDetector;
        this._unmatchedExceptionMessage = unmatchedExceptionMessage;
    }

    public matches(document: Document): boolean {
        return this._matchDetector.matches(document);
    }

    public obtain(document: Document): Record<string, string> {
        if (!this.matches(document)) {
            throw new UnmatchedDocumentException(this._unmatchedExceptionMessage);
        }

        const helper = new DomHelper(document);
        const uuid = helper.getAttribute('cfdi:Comprobante', 'cfdi:Complemento', 'tfd:TimbreFiscalDigital', 'UUID');
        const rfcEmisor = helper.getAttribute('cfdi:Comprobante', 'cfdi:Emisor', 'Rfc');
        const rfcReceptor = helper.getAttribute('cfdi:Comprobante', 'cfdi:Receptor', 'Rfc');
        const total = helper.getAttribute('cfdi:Comprobante', 'Total');
        const sello = helper.getAttribute('cfdi:Comprobante', 'Sello');

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

export { Comprobante20170701 };
