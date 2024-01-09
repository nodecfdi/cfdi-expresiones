import { htmlEntities } from '../../utils/index.js';

export class FormatRfcXml {
  public formatRfc(rfc: string): string {
    return htmlEntities(rfc);
  }
}
