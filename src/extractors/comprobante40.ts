import Comprobante20170701 from '#src/extractors/standards/comprobante20170701';
import MatchDetector from '#src/internal/match_detector';
import { type ExpressionExtractorInterface } from '#src/types';
import { cfdiNodeName } from '#src/utils/constants';

/**
 * This class is using the CFDI Standard 2017-07-01. It's the same for CFDI 3.3 & 4.0.
 */
export default class Comprobante40
  extends Comprobante20170701
  implements ExpressionExtractorInterface
{
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
