import { encode, EncodingMode } from 'entities';

export default class FormatRfcXml {
  public formatRfc(rfc: string): string {
    return encode(rfc, { mode: EncodingMode.UTF8 });
  }
}
