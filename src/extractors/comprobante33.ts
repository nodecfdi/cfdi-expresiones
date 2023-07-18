import { type ExpressionExtractorInterface } from '../expression-extractor-interface';
import { MatchDetector } from '../internal/match-detector';
import { Comprobante20170701 } from './standards/comprobante20170701';

/**
 * This class is using the CFDI Standard 2017-07-01. It´s the same for CFDI 3.3 & 4.0.
 */
export class Comprobante33 extends Comprobante20170701 implements ExpressionExtractorInterface {
    constructor() {
        super(
            new MatchDetector('http://www.sat.gob.mx/cfd/3', 'cfdi:Comprobante', 'Version', '3.3'),
            'The document is not a CFDI 3.3',
        );
    }

    public uniqueName(): string {
        return 'CFDI33';
    }
}
