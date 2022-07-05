import { html_entities } from '../../utils';

export class FormatRfcXml {
    public formatRfc(rfc: string): string {
        return html_entities(rfc);
    }
}
