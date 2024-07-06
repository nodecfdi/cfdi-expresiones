import { MatchDetector } from '../internal/match_detector.js';
import { type ExpressionExtractorInterface } from '../types.js';
import { cfdiNodeName } from '../utils/constants.js';
import { Comprobante20170701 } from './standards/comprobante20170701.js';

/**
 * This class is using the CFDI Standard 2017-07-01. It's the same for CFDI 3.3 & 4.0.
 */
export class Comprobante40 extends Comprobante20170701 implements ExpressionExtractorInterface {
  public constructor() {
    super(
      new MatchDetector('http://www.sat.gob.mx/cfd/4', cfdiNodeName, 'Version', '4.0'),
      'The document is not a CFDI 4.0',
    );
  }

  public uniqueName(): string {
    return 'CFDI40';
  }
}
